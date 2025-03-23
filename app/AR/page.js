"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Home() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const loadOpenCV = async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://docs.opencv.org/4.10.0/opencv.js";
        script.async = true;
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = () => {
            console.log("OpenCV.js loaded");
            resolve();
          };
          script.onerror = () => {
            console.error("Failed to load OpenCV.js");
            reject(new Error("OpenCV.js script failed"));
          };
        });
        await cv.onRuntimeInitialized;
        console.log("OpenCV runtime initialized");
        initAR();
      } catch (error) {
        console.error("loadOpenCV failed:", error);
      }
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
      console.log("Attempting to load video from:", videoUrl);
      const videoElement = document.createElement("video");
      videoElement.src = videoUrl;
      videoElement.crossOrigin = "anonymous";
      videoElement.loop = true;
      videoElement.muted = false;
      videoElement.playsInline = true;
      videoElement.onerror = (e) => console.error("Video element failed to load:", e.target.error);
      videoElement.onloadeddata = () => console.log("Video loaded successfully:", videoUrl);
      const texture = new THREE.VideoTexture(videoElement);
      const geometry = new THREE.PlaneGeometry(1, 1); // Base size
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const videoPlane = new THREE.Mesh(geometry, material);
      videoPlane.position.z = -2;
      videoPlane.visible = false;
      scene.add(videoPlane);

      // Canvas for OpenCV processing
      const canvas = document.createElement("canvas");
      canvasRef.current = canvas;
      const ctx = canvas.getContext("2d");

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

        // Convert refImage to canvas and resize
        const refCanvas = document.createElement("canvas");
        const maxTemplateSize = 50; // Smaller for distance
        refCanvas.width = Math.min(refImage.width, maxTemplateSize);
        refCanvas.height = Math.min(refImage.height, maxTemplateSize * (refImage.height / refImage.width));
        const refCtx = refCanvas.getContext("2d");
        refCtx.drawImage(refImage, 0, 0, refCanvas.width, refCanvas.height);
        console.log("Yoda.png converted to canvas, size:", refCanvas.width, refCanvas.height);

        // Tracking loop
        const trackImage = () => {
          if (!video.videoWidth || !video.videoHeight) {
            requestAnimationFrame(trackImage);
            return;
          }

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          const srcMat = cv.imread(canvas);
          const templMat = cv.imread(refCanvas);

          try {
            const resultMat = new cv.Mat();
            cv.matchTemplate(srcMat, templMat, resultMat, cv.TM_CCOEFF_NORMED);
            const { maxLoc, maxVal } = cv.minMaxLoc(resultMat);

            console.log("Match confidence:", maxVal, "Position:", maxLoc.x, maxLoc.y);

            const threshold = 0.3; // Lowered for distance and robustness
            if (maxVal > threshold) {
              console.log("Target found, playing video");
              // Center video on Yoda.png
              const x = (maxLoc.x + templMat.cols / 2 - video.videoWidth / 2) / 40; // Adjusted scaling
              const y = -(maxLoc.y + templMat.rows / 2 - video.videoHeight / 2) / 40;
              videoPlane.position.set(x, y, -2);

              // Autosize video to match target
              const scaleFactor = 0.05 * (maxVal / 0.3); // Dynamic scaling
              const width = templMat.cols * scaleFactor;
              const height = templMat.rows * scaleFactor;
              videoPlane.scale.set(width, height, 1);
              console.log("Video scale:", width, height);

              videoPlane.visible = true;
              videoElement.play().catch((e) => console.error("Video play failed:", e));
            } else {
              console.log("Target lost, hiding video");
              videoPlane.visible = false;
              videoElement.pause();
            }

            resultMat.delete();
          } catch (error) {
            console.error("matchTemplate failed:", error);
          }

          srcMat.delete();
          templMat.delete();
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
        stream.getTracks().forEach((track) => track.stop());
      };
    };

    loadOpenCV();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative w-screen h-screen">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <h1
        className="text-3xl font-bold text-gray-800 mb-4 z-10"
        style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)", textAlign: "center" }}
      >
        Web AR with Custom Tracking
      </h1>
      <div
        ref={containerRef}
        id="container"
        className="w-full h-full relative overflow-hidden"
      />
    </main>
  );
}