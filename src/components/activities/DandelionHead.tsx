interface DandelionHeadProps {
  size: number;
  rotate?: number;
}

export default function DandelionHead({ size, rotate = 0 }: DandelionHeadProps) {
  const N = 8;
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <g transform="translate(15,15)">
        {Array.from({ length: N }, (_, i) => (
          <ellipse
            key={i}
            cx="0" cy="-5"
            rx="4" ry="6"
            fill="#FFFFFF"
            opacity="0.92"
            transform={`rotate(${(i / N) * 360 + rotate})`}
          />
        ))}
        <circle r="4" fill="#C2AE4C" />
      </g>
    </svg>
  );
}
