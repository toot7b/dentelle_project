"use client";

import ActivitiesCloud from "./ActivitiesCloud";

export default function ActivitiesBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#FEF5EB" }}
    >
      <div
        className="absolute cloud-drift-a"
        style={{ top: "8%", left: "10%", opacity: 0.8 }}
      >
        <ActivitiesCloud variant="cirrus" />
      </div>
      <div
        className="absolute cloud-drift-b"
        style={{ top: "5%", right: "10%", opacity: 0.6 }}
      >
        <ActivitiesCloud variant="cumulus" />
      </div>
      <div
        className="absolute cloud-drift-c"
        // Move from 75% to 35% so it's in the sky, not on the ground
        style={{ top: "35%", left: "40%", opacity: 0.7 }}
      >
        <ActivitiesCloud variant="wisp" />
      </div>
    </div>
  );
}
