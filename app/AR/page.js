"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Home() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const isPlaying = useRef(false);
  const lastPosition = useRef(null);
  const lastDetectionState = useRef(false);
  const detectionCount = useRef(0);
  const lastTrackTime = useRef(0);
  const playPromise = useRef(null);
  const lastDetectedSize = useRef(null);
  const debug = useRef(false);

  useEffect(() => {
    const waitForOpenCV = async () => {
      if (window.cv && window.cv.onRuntimeInitialized) {
        await new Promise((resolve) => {
          window.cv.onRuntimeInitialized = () => {
            console.log("OpenCV runtime initialized");
            resolve();
          };
        });
      } else if (window.cv) {
        console.log("OpenCV already initialized");
      } else {
        console.error("OpenCV.js not loaded yet");
        return;
      }
      initAR();
    };

    const initAR = async () => {
      // Video stream (camera feed)
      const video = document.createElement("video");
      videoRef.current = video;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
        await video.play();
        console.log("Camera started");
        console.log("Video dimensions:", video.videoWidth, video.videoHeight);
      } catch (error) {
        console.error("Camera failed:", error);
        return;
      }

      // Three.js setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Camera feed as background
      const cameraTexture = new THREE.VideoTexture(video);
      console.log("Camera texture:", cameraTexture);
      const aspectRatio = video.videoWidth / video.videoHeight || 4 / 3;
      const cameraGeometry = new THREE.PlaneGeometry(4 * aspectRatio, 4);
      const cameraMaterial = new THREE.MeshBasicMaterial({ map: cameraTexture });
      const cameraPlane = new THREE.Mesh(cameraGeometry, cameraMaterial);
      cameraPlane.position.z = -5;
      scene.add(cameraPlane);

      // Video overlay (via Pinata)
      const cid = "bafybeihc4upuu25hpcwdqcfr6lbbu5enkhc6qgm2pp3mmvn4kmpdwl2m2m";
      const videoUrl = `https://peach-informal-llama-875.mypinata.cloud/ipfs/${cid}`;
      console.log("Video URL prepared:", videoUrl);
      const videoElement = document.createElement("video");
      videoElement.crossOrigin = "anonymous";
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.preload = "none";
      videoElement.pause();
      videoElement.onerror = (e) => console.error("Video element failed to load:", e.target.error);
      videoElement.onloadedmetadata = () => console.log("Video metadata loaded:", videoUrl);
      videoElement.onplay = () => console.log("Video playback started");
      videoElement.onpause = () => console.log("Video playback paused");

      // Placeholder material
      const geometry = new THREE.PlaneGeometry(1, 1);
      const placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
      const videoPlane = new THREE.Mesh(geometry, placeholderMaterial);
      videoPlane.position.z = -2;
      videoPlane.visible = false;
      scene.add(videoPlane);

      let texture = null;
      let videoMaterial = null;

      // Canvas for OpenCV processing
      const canvas = document.createElement("canvas");
      canvasRef.current = canvas;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      // Load reference image (Yoda.png) into a canvas
      try {
        const refImage = new Image();
        refImage.src = "/assets/Yoda.png";
        await new Promise((resolve, reject) => {
          refImage.onload = () => {
            console.log("Yoda.png loaded");
            resolve();
          };
          refImage.onerror = () => {
            console.error("Failed to load Yoda.png");
            reject(new Error("Yoda.png failed"));
          };
        });

        // High-resolution template
        const refCanvas = document.createElement("canvas");
        const maxTemplateSize = 200;
        refCanvas.width = Math.min(refImage.width, maxTemplateSize);
        refCanvas.height = Math.min(refImage.height, maxTemplateSize * (refImage.height / refImage.width));
        const refCtx = refCanvas.getContext("2d");
        refCtx.drawImage(refImage, 0, 0, refCanvas.width, refCanvas.height);
        console.log("Yoda.png template size:", refCanvas.width, refCanvas.height);

        // Tracking loop
        const trackImage = async () => {
          const now = performance.now();
          if (now - lastTrackTime.current < 200) {
            requestAnimationFrame(trackImage);
            return;
          }
          lastTrackTime.current = now;

          if (!video.videoWidth || !video.videoHeight || !window.cv) {
            console.log("Waiting for video or OpenCV...");
            requestAnimationFrame(trackImage);
            return;
          }

          // Downscale source image
          canvas.width = video.videoWidth / 2;
          canvas.height = video.videoHeight / 2;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          let srcMat, templMat, bestMatch = { maxVal: 0, maxLoc: null, scale: 1 };
          try {
            srcMat = cv.imread(canvas);
            templMat = cv.imread(refCanvas);

            // Validate matrices
            if (!srcMat || srcMat.empty() || !templMat || templMat.empty()) {
              throw new Error("Invalid source or template matrix");
            }

            // Reduced scales
            const scales = [2.0, 1.5, 1.0, 0.5];
            for (const scale of scales) {
              const scaledMat = new cv.Mat();
              const size = new cv.Size(Math.floor(srcMat.cols * scale), Math.floor(srcMat.rows * scale));

              if (size.width < templMat.cols || size.height < templMat.rows) {
                scaledMat.delete();
                continue;
              }

              cv.resize(srcMat, scaledMat, size, 0, 0, cv.INTER_AREA);

              const resultMat = new cv.Mat();
              cv.matchTemplate(scaledMat, templMat, resultMat, cv.TM_CCOEFF_NORMED);
              const { maxLoc, maxVal } = cv.minMaxLoc(resultMat);

              if (debug.current) {
                console.log(`Scale ${scale} - Match confidence: ${maxVal}, Position: ${maxLoc.x},${maxLoc.y}`);
              }

              if (maxVal > bestMatch.maxVal) {
                bestMatch = { maxVal, maxLoc, scale };
              }

              scaledMat.delete();
              resultMat.delete();
            }

            const threshold = 0.75;
            const isValidMatch = bestMatch.maxVal > threshold && (
              !lastPosition.current || 
              Math.abs(bestMatch.maxLoc.x / bestMatch.scale - lastPosition.current.x) < 15 &&
              Math.abs(bestMatch.maxLoc.y / bestMatch.scale - lastPosition.current.y) < 15
            );

            if (isValidMatch) {
              detectionCount.current += 1;
              if (detectionCount.current >= 5) {
                if (!lastDetectionState.current) {
                  console.log("Target found, playing video");
                  lastDetectionState.current = true;
                }

                const { maxLoc, scale } = bestMatch;
                const templateWidth = templMat.cols;
                const templateHeight = templMat.rows;
                const detectedWidth = templateWidth / scale;
                const detectedHeight = templateHeight / scale;
                const frameWidth = canvas.width;
                const frameHeight = canvas.height;

                // Center video on target
                const x = ((maxLoc.x / scale + templateWidth / 2) / frameWidth - 0.5) * 4 * aspectRatio;
                const y = -((maxLoc.y / scale + templateHeight / 2) / frameHeight - 0.5) * 4;
                videoPlane.position.set(x, y, -2);

                // Dynamic scaling
                const scaleFactor = 0.5 * (detectedWidth / frameWidth) * 12;
                const width = detectedWidth * scaleFactor;
                const height = detectedHeight * scaleFactor;
                videoPlane.scale.set(width, height, 1);

                // Log only if size changes significantly
                if (!lastDetectedSize.current || Math.abs(detectedWidth - lastDetectedSize.current) > 0.1 * detectedWidth) {
                  console.log("Video scale:", width, height, "Detected size:", detectedWidth, detectedHeight, "Scale factor:", scaleFactor);
                  lastDetectedSize.current = detectedWidth;
                }

                lastPosition.current = { x: maxLoc.x / scale, y: maxLoc.y / scale };

                if (!videoElement.src) {
                  videoElement.src = videoUrl;
                  console.log("Video src set:", videoUrl);
                }
                if (!texture) {
                  texture = new THREE.VideoTexture(videoElement);
                  videoMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
                  videoPlane.material = videoMaterial;
                }

                videoPlane.visible = true;
                videoElement.muted = false;
                if (!isPlaying.current) {
                  try {
                    playPromise.current = videoElement.play();
                    await playPromise.current;
                    console.log("Video playback started");
                    isPlaying.current = true;
                  } catch (e) {
                    console.error("Video play failed:", e);
                  }
                }
              }
            } else {
              detectionCount.current -= 1;
              if (detectionCount.current <= 0) {
                detectionCount.current = 0;
                if (lastDetectionState.current) {
                  console.log("Target lost or not detected, stopping video");
                  lastDetectionState.current = false;
                  if (isPlaying.current) {
                    if (playPromise.current) {
                      await playPromise.current.catch(() => {});
                    }
                    videoElement.pause();
                    videoElement.currentTime = 0;
                    console.log("Video playback paused");
                    isPlaying.current = false;
                  }
                  videoPlane.visible = false;
                  videoElement.muted = true;
                  lastPosition.current = null;
                  lastDetectedSize.current = null;
                }
              }
            }
          } catch (error) {
            console.error("Tracking error:", error.message || error);
          } finally {
            if (srcMat && !srcMat.isDeleted()) srcMat.delete();
            if (templMat && !templMat.isDeleted()) templMat.delete();
          }

          requestAnimationFrame(trackImage);
        };
        trackImage();
      } catch (error) {
        console.error("Tracking setup failed:", error);
      }

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Resize
      const onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const fovY = THREE.MathUtils.degToRad(camera.fov);
        const heightAtZ = 2 * Math.abs(cameraPlane.position.z) * Math.tan(fovY / 2);
        const widthAtZ = heightAtZ * (width / height);
        cameraPlane.scale.set(widthAtZ / 4, heightAtZ / 4, 1);
      };
      window.addEventListener("resize", onResize);
      onResize();

      // Cleanup
      return () => {
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (video.srcObject) {
          video.srcObject.getTracks().forEach((track) => track.stop());
        }
        videoElement.muted = true;
        videoElement.pause();
        if (texture) texture.dispose();
      };
    };

    waitForOpenCV();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative w-screen h-screen">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <h1
        className="text-3xl font-bold text-white mb-4 z-10"
        style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)", textAlign: "center" }}
      >
        ARt emerged
      </h1>
      <div
        ref={containerRef}
        id="container"
        className="w-full h-full relative overflow-hidden"
      />
    </main>
  );
}