"use client";

import React, { useState } from "react";
import Link from "next/link";

const Price = () => {
  const [isAnnual, setIsAnnual] = useState(true); // Default to monthly pricing

  // Pricing data for monthly and annual (10% discount for annual)
  const plans = [
    {
      name: "Free",
      monthlyPrice: "Free",
      annualPrice: "Free",
      description: "Forever free",
      users: "1 user",
      features: {
        financial: ["Open/High/Low/Close"],
        onChain: ["Average token age consumed", "Transaction volume", "Velocity of tokens (beta)"],
        social: ["Topic search"],
      },
    },
    {
      name: "Startup",
      monthlyPrice: 39,
      annualPrice: Math.round(39 * 12 * 0.9), // $421/year
      description: "All the basics for starting a new business",
      users: "2 users",
      features: {
        financial: ["Open/High/Low/Close", "Price-volume difference indicator"],
        onChain: ["Transaction volume", "Total circulation (beta)", "Velocity of tokens (beta)", "ETH gas used"],
        social: ["Topic search", "Total social volume", "Dev activity"],
      },
    },
    {
      name: "Team",
      monthlyPrice: 89,
      annualPrice: Math.round(89 * 12 * 0.9), // $961/year
      description: "Everything you need for a growing business",
      users: "5 users",
      features: {
        financial: ["Open/High/Low/Close", "Price-volume difference indicator"],
        onChain: ["Network growth", "Average token age consumed", "Exchange flow", "Total ERC20 exchange funds flow", "Transaction volume", "Total circulation (beta)", "ETH gas used"],
        social: ["Topic search", "Relative social dominance"],
      },
    },
    {
      name: "Enterprise",
      monthlyPrice: 149,
      annualPrice: Math.round(149 * 12 * 0.9), // $1609/year
      description: "Advanced features for scaling your business",
      users: "10 users",
      features: {
        financial: ["Open/High/Low/Close", "Price-volume difference indicator"],
        onChain: ["Network growth", "Average token age consumed", "Exchange flow", "Total ERC20 exchange funds flow", "Transaction volume", "Total circulation (beta)", "Velocity of tokens (beta)", "ETH gas used"],
        social: ["Dev activity", "Topic search", "Relative social dominance", "Total social volume"],
      },
    },
  ];

  const allFeatures = {
    financial: ["Open/High/Low/Close", "Price-volume difference indicator"],
    onChain: [
      "Network growth",
      "Average token age consumed",
      "Exchange flow",
      "Total ERC20 exchange funds flow",
      "Transaction volume",
      "Total circulation (beta)",
      "Velocity of tokens (beta)",
      "ETH gas used",
    ],
    social: ["Dev activity", "Topic search", "Relative social dominance", "Total social volume"],
  };

  const handleToggle = () => {
    setIsAnnual((prev) => !prev);
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl text-white font-bold md:text-4xl md:leading-tight dark:text-white">
          Pricing
        </h2>
        <p className="mt-1 text-gray-200 dark:text-gray-200">
          Whatever your status, our offers evolve according to your needs.
        </p>
      </div>
      {/* End Title */}

      {/* Switch */}
      <div className="flex justify-center items-center gap-x-3">
        <span
          className={`text-sm font-medium ${!isAnnual ? "text-white dark:text-white" : "text-gray-500 dark:text-white"}`}
        >
          Monthly
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isAnnual}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-yellow-400 dark:bg-neutral-700 dark:peer-checked:bg-yellow-500 transition-colors duration-200 ease-in-out"></div>
          <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 peer-checked:translate-x-full transform transition-transform duration-200 ease-in-out dark:bg-neutral-400 dark:peer-checked:bg-white"></div>
        </label>
        <span
          className={`text-sm font-medium relative ${isAnnual ? "text-white dark:text-white" : "text-gray-500 dark:text-white"}`}
        >
          Annually
          {isAnnual && (
            <span className="absolute -top-10 -right-28 flex items-center">
              <svg
                className="w-14 h-8 -me-6"
                width="45"
                height="25"
                viewBox="0 0 45 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                  fill="currentColor"
                  className="fill-gray-300 dark:fill-neutral-700"
                />
              </svg>
              <span className="mt-3 inline-block whitespace-nowrap text-[11px] leading-5 font-semibold uppercase bg-yellow-400 text-white rounded-full py-1 px-2.5">
                Save up to 10%
              </span>
            </span>
          )}
        </span>
      </div>
      {/* End Switch */}

      {/* Grid */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col border text-center rounded-xl p-8 ${
              plan.name === "Startup"
                ? "border-2 border-yellow-400 shadow-xl dark:border-yellow-600"
                : "border-gray-200 dark:border-neutral-800"
            }`}
          >
            {plan.name === "Startup" && (
              <p className="mb-3">
                <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-blue-100 text-yellow-400 dark:bg-blue-600 dark:text-white">
                  Most popular
                </span>
              </p>
            )}
            <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">
              {plan.name}
            </h4>
            <span className="mt-5 font-bold text-5xl text-white dark:text-white">
              {plan.name === "Free" ? (
                "Free"
              ) : (
                <>
                  <span className="font-bold text-2xl -me-2">$ &nbsp;</span>
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  <span className="text-sm font-normal">
                    {isAnnual ? "/year" : "/month"}
                  </span>
                </>
              )}
            </span>
            <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
              {plan.description}
            </p>
            <ul className="mt-7 space-y-2.5 text-sm">
              <li className="flex gap-x-2">
                <svg
                  className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-white dark:text-white">
                  {plan.users}
                </span>
              </li>
              <li className="flex gap-x-2">
                <svg
                  className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-white dark:text-neutral-400">
                  Plan features
                </span>
              </li>
              <li className="flex gap-x-2">
                <svg
                  className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-white dark:text-white">
                  Product support
                </span>
              </li>
            </ul>
            <Link
              href="#"
              className={`mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border shadow-2xs ${
                plan.name === "Startup"
                  ? "bg-yellow-400 text-white hover:bg-yellow-600 focus:bg-yellow-600 dark:border-transparent"
                  : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              } disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden`}
            >
              Sign up
            </Link>
          </div>
        ))}
      </div>
      {/* End Grid */}

      {/* Comparison Table */}
      <div className="mt-20 lg:mt-32">
        <div className="lg:text-center mb-10 lg:mb-20">
          <h3 className="text-2xl font-semibold dark:text-white">
            Compare plans
          </h3>
        </div>

        {/* xs to lg */}
        <div className="space-y-24 lg:hidden">
          {plans.map((plan) => (
            <section key={plan.name}>
              <div className="px-4 mb-4">
                <h2 className="text-lg leading-6 font-medium text-gray-800 dark:text-neutral-200">
                  {plan.name}
                </h2>
              </div>
              {Object.entries(plan.features).map(([category, features]) => (
                <table key={category} className="w-full">
                  <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-bold text-gray-800 text-start dark:bg-neutral-700 dark:border-neutral-700 dark:text-white">
                    {category === "financial"
                      ? "Financial data"
                      : category === "onChain"
                      ? "On-chain data"
                      : "Social data"}
                  </caption>
                  <thead>
                    <tr>
                      <th className="sr-only" scope="col">
                        Feature
                      </th>
                      <th className="sr-only" scope="col">
                        Included
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {allFeatures[category].map((feature) => (
                      <tr
                        key={feature}
                        className="border-t border-gray-200 dark:border-neutral-700"
                      >
                        <th
                          className="py-5 px-4 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-neutral-400"
                          scope="row"
                        >
                          {feature}
                        </th>
                        <td className="py-5 pe-4">
                          {features.includes(feature) ? (
                            <svg
                              className="shrink-0 ms-auto size-5 text-blue-600 dark:text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg
                              className="shrink-0 ms-auto size-5 text-gray-400 dark:text-neutral-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                            </svg>
                          )}
                          <span className="sr-only">
                            {features.includes(feature) ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </section>
          ))}
        </div>
        {/* End xs to lg */}

        {/* lg+ */}
        <div className="hidden lg:block">
          <table className="w-full h-px">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead className="sticky top-0 inset-x-0 bg-white dark:bg-neutral-900">
              <tr>
                <th
                  className="py-4 ps-6 pe-6 text-sm font-medium text-gray-800 text-start dark:text-white"
                  scope="col"
                >
                  Plans
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white"
                    scope="col"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-t border-gray-200 divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              {Object.entries(allFeatures).map(([category, features]) => (
                <React.Fragment key={category}>
                  <tr>
                    <th
                      className="py-3 ps-6 bg-gray-50 font-bold text-gray-800 text-start dark:bg-neutral-800 dark:text-white"
                      colSpan="5"
                      scope="colgroup"
                    >
                      {category === "financial"
                        ? "Financial data"
                        : category === "onChain"
                        ? "On-chain data"
                        : "Social data"}
                    </th>
                  </tr>
                  {features.map((feature) => (
                    <tr key={feature}>
                      <th
                        className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-neutral-400"
                        scope="row"
                      >
                        {feature}
                      </th>
                      {plans.map((plan) => (
                        <td key={plan.name} className="py-5 px-6">
                          {plan.features[category].includes(feature) ? (
                            <svg
                              className="mx-auto shrink-0 size-5 text-blue-600 dark:text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg
                              className="mx-auto shrink-0 size-5 text-gray-400 dark:text-neutral-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                            </svg>
                          )}
                          <span className="sr-only">
                            {plan.features[category].includes(feature)
                              ? `Included in ${plan.name}`
                              : `Not included in ${plan.name}`}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {/* End lg+ */}
      </div>
      {/* End Comparison Table */}
    </div>
  );
};

export default Price;