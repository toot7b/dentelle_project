"use client";

interface ActivitiesCloudProps {
  variant: "cirrus" | "cumulus" | "wisp";
  className?: string;
}

export default function ActivitiesCloud({ variant, className }: ActivitiesCloudProps) {
  const stroke = "#C2AE4C";
  const strokeOpacity = 1;

  if (variant === "cirrus") {
    return (
      <svg
        viewBox="0 0 280 80"
        width={280}
        height={80}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "block", filter: "drop-shadow(0px 4px 10px rgba(44, 26, 14, 0.15))" }}
      >
        <path
          d="M 20,65 C 10,65 5,58 8,52 C 3,50 0,44 5,40 C 2,36 6,30 14,32 C 14,22 24,18 32,24 C 36,16 48,14 56,20 C 62,12 76,11 84,18 C 90,10 106,9 114,17 C 122,8 140,9 146,19 C 155,12 172,14 177,24 C 186,18 200,22 200,32 C 210,30 218,38 214,44 C 220,46 222,54 216,58 C 222,62 220,70 212,70 L 24,70 C 22,70 20,68 20,65 Z"
          fill="#FFFFFF"
          stroke={stroke}
          strokeOpacity={strokeOpacity}
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  if (variant === "cumulus") {
    return (
      <svg
        viewBox="0 0 200 120"
        width={200}
        height={120}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "block", filter: "drop-shadow(0px 4px 10px rgba(44, 26, 14, 0.15))" }}
      >
        <path
          d="M 24,105 C 12,105 6,96 10,88 C 4,84 2,74 8,68 C 4,60 10,50 20,52 C 18,38 30,28 44,34 C 48,20 64,14 76,22 C 82,10 100,6 112,16 C 120,6 138,8 144,20 C 156,14 172,22 170,36 C 182,36 190,48 184,58 C 192,64 192,78 184,84 C 190,90 188,102 178,104 L 28,106 Z"
          fill="#FFFFFF"
          stroke={stroke}
          strokeOpacity={strokeOpacity}
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 160 60"
      width={160}
      height={60}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", filter: "drop-shadow(0px 4px 10px rgba(44, 26, 14, 0.15))" }}
    >
      <path
        d="M 12,52 C 4,52 0,46 4,40 C 0,36 2,28 10,28 C 10,20 20,14 30,20 C 34,12 48,10 56,18 C 64,10 80,10 86,20 C 96,12 112,16 112,28 C 122,26 130,34 126,42 C 132,46 130,54 122,56 L 16,54 Z"
        fill="#FFFFFF"
        opacity="1"
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth="1.1"
      />
    </svg>
  );
}
