"use client";

import ActivitiesCloud from "./ActivitiesCloud";

export default function ActivitiesBackground() {
  const clouds = [
    {
      variant: "wisp" as const,
      className: "cloud-drift-a",
      style: {
        top: "6%",
        left: "6%",
        transform: "scale(0.55)",
      },
    },
    {
      variant: "cumulus" as const,
      className: "cloud-drift-b",
      style: {
        top: "8%",
        right: "6%",
        transform: "scale(0.6)",
      },
    },
    {
      variant: "cirrus" as const,
      className: "cloud-drift-c",
      style: {
        top: "14%",
        left: "2%",
        transform: "scale(0.72)",
      },
    },
    {
      variant: "cirrus" as const,
      className: "cloud-drift-d",
      style: {
        top: "14%",
        right: "2%",
        transform: "scale(0.72)",
      },
    },
    {
      variant: "wisp" as const,
      className: "cloud-drift-e",
      style: {
        top: "18%",
        left: "10%",
        transform: "scale(0.45)",
      },
    },
    {
      variant: "wisp" as const,
      className: "cloud-drift-c",
      style: {
        top: "18%",
        right: "10%",
        transform: "scale(0.45)",
      },
    },
    {
      variant: "cumulus" as const,
      className: "cloud-drift-a",
      style: {
        top: "34%",
        left: "6%",
        transform: "scale(0.9)",
      },
    },
    {
      variant: "cirrus" as const,
      className: "cloud-drift-b",
      style: {
        top: "36%",
        right: "6%",
        transform: "scale(0.92)",
      },
    },
    {
      variant: "wisp" as const,
      className: "cloud-drift-d",
      style: {
        top: "46%",
        left: "50%",
        transform: "scale(0.6)",
      },
    },
    {
      variant: "cirrus" as const,
      className: "cloud-drift-e",
      style: {
        top: "54%",
        left: "10%",
        transform: "scale(0.95)",
      },
    },
    {
      variant: "cumulus" as const,
      className: "cloud-drift-a",
      style: {
        top: "56%",
        right: "10%",
        transform: "scale(1.05)",
      },
    },
    {
      variant: "wisp" as const,
      className: "cloud-drift-b",
      style: {
        top: "64%",
        left: "34%",
        transform: "scale(0.7)",
      },
    },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "#FEF5EB" }}
    >
      {clouds.map((cloud, idx) => (
        <div key={idx} className={`absolute ${cloud.className}`} style={cloud.style}>
          <ActivitiesCloud variant={cloud.variant} />
        </div>
      ))}
    </div>
  );
}
