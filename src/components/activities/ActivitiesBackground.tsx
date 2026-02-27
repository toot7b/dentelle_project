"use client";

import ActivitiesCloud from "./ActivitiesCloud";

/**
 * Ciel naturaliste de la section Activités.
 *
 * Principes de composition :
 * – Asymétrie : jamais deux nuages au même niveau des deux côtés
 * – Groupements : 2-3 nuages proches créent du volume
 * – Débordements : certains nuages sont partiellement hors-cadre (left/right négatifs)
 * – Variété : mélange de tailles pour le réalisme
 * – Zone texte (0-18% centre) : dégagée
 */

interface CloudDef {
  variant: "cirrus" | "cumulus" | "wisp";
  anim: string;
  top: string;
  left?: string;
  right?: string;
  scale: number;
}

const clouds: CloudDef[] = [
  // Groupe haut-gauche : un gros + un petit à côté → volume
  { variant: "wisp", anim: "cloud-drift-c", top: "6%", left: "10%", scale: 0.50 },

  // Isolé haut-droite : un seul cirrus allongé, décalé
  { variant: "cirrus", anim: "cloud-drift-b", top: "3%", right: "2%", scale: 0.60 },

  // Près du titre — sur les côtés, à hauteur du texte
  { variant: "wisp", anim: "cloud-drift-d", top: "20%", right: "5%", scale: 0.50 },
  { variant: "cirrus", anim: "cloud-drift-e", top: "16%", left: "15%", scale: 0.55 },

  // Bord gauche sous le texte : un cumulus qui dépasse
  { variant: "cumulus", anim: "cloud-drift-d", top: "24%", left: "-2%", scale: 0.85 },

  // Groupe centre-droit : entre le fil et le médaillon droit
  { variant: "wisp", anim: "cloud-drift-e", top: "30%", right: "10%", scale: 0.55 },

  // Isolé centre-gauche bas : un wisp discret
  { variant: "wisp", anim: "cloud-drift-b", top: "48%", left: "8%", scale: 0.55 },

  // Groupe bas : 2 nuages proches, juste au-dessus de la colline
  { variant: "cirrus", anim: "cloud-drift-c", top: "55%", left: "25%", scale: 0.65 },
  { variant: "cumulus", anim: "cloud-drift-d", top: "54%", right: "8%", scale: 0.70 },

  // Petit wisp en bas à droite, presque contre la colline
  { variant: "wisp", anim: "cloud-drift-e", top: "62%", right: "32%", scale: 0.40 },
];

export default function ActivitiesBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "#FEF5EB" }}
    >
      {clouds.map((cloud, idx) => (
        <div
          key={idx}
          data-cloud
          className={`absolute ${cloud.anim}`}
          style={{
            top: cloud.top,
            ...(cloud.left != null ? { left: cloud.left } : {}),
            ...(cloud.right != null ? { right: cloud.right } : {}),
            transform: `scale(${cloud.scale})`,
            transformOrigin: cloud.right != null && cloud.left == null
              ? "top right"
              : "top left",
          }}
        >
          <ActivitiesCloud variant={cloud.variant} />
        </div>
      ))}
    </div>
  );
}
