"use client";

import ActivitiesCloud from "./ActivitiesCloud";

export default function ActivitiesBackground() {
  const clouds = [
    {
      variant: "wisp" as const,
      className: "cloud-drift-a",
      style: {
        top: "15%",
        left: "4%",
        transform: "scale(0.6)",
      },
    },
    {
      variant: "cirrus" as const,
      className: "cloud-drift-d",
      style: {
        top: "12%",
        left: "30%",
        transform: "scale(0.7)",
      },
    },
    {
      variant: "cumulus" as const,
      className: "cloud-drift-b",
      style: {
        top: "10%",
        right: "8%",
        transform: "scale(0.65)",
      },
    },
    {
      variant: "cirrus" as const,
      className: "cloud-drift-c",
      style: {
        top: "20%",
        left: "55%",
        transform: "scale(0.85)",
      },
    },
    {
      variant: "wisp" as const,
      className: "cloud-drift-e",
      style: {
        top: "22%",
        right: "22%",
        transform: "scale(0.75)",
      },
    },
    {
      variant: "cumulus" as const,
      className: "cloud-drift-a",
      style: {
        top: "26%",
        left: "14%",
        transform: "scale(0.9)",
      },
    },
    {
      variant: "cirrus" as const,
      className: "cloud-drift-b",
      style: {
        top: "28%",
        right: "4%",
        transform: "scale(1.0)",
      },
    },
    {
      variant: "wisp" as const,
      className: "cloud-drift-c",
      style: {
        top: "18%",
        left: "78%",
        transform: "scale(0.55)",
      },
    },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#FEF5EB" }}
    >
      <div
        className="absolute inset-0"
        style={{ clipPath: "inset(clamp(100px, 12%, 160px) 0 0 0)" }}
      >
        {clouds.map((cloud, idx) => (
          <div key={idx} className={`absolute ${cloud.className}`} style={cloud.style}>
            <ActivitiesCloud variant={cloud.variant} />
          </div>
        ))}
      </div>
    </div>
  );
}
