import Image from "next/image";

type FrameVariant = "baroque" | "classic" | "ornate";

interface PhotoFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  rotation?: number;
  frameColor?: string;
  variant?: FrameVariant;
}

function HangingWire({ frameWidth }: { frameWidth: number }) {
  const cx = frameWidth / 2;
  const wireHeight = 20;
  return (
    <svg
      className="absolute pointer-events-none left-0"
      style={{ top: -wireHeight }}
      width={frameWidth}
      height={wireHeight}
      viewBox={`0 0 ${frameWidth} ${wireHeight}`}
      fill="none"
    >
      {/* Nail */}
      <circle cx={cx} cy="3" r="3" fill="#9A7558" />
      <circle cx={cx} cy="3" r="1.5" fill="#7A5C3E" />
      {/* Wire from nail down to frame top edge */}
      <path
        d={`M ${cx},6 L ${cx - 25},${wireHeight}`}
        stroke="#9A7558"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d={`M ${cx},6 L ${cx + 25},${wireHeight}`}
        stroke="#9A7558"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

function BaroqueFrame({ width, height, color }: { width: number; height: number; color: string }) {
  const pad = 28;
  const w = width + pad * 2;
  const h = height + pad * 2;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
    >
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="3" stroke={color} strokeWidth="3" />
      <rect x="10" y="10" width={w - 20} height={h - 20} rx="2" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Corner ornaments */}
      <path d={`M 4,4 Q 4,20 20,20`} stroke={color} strokeWidth="2" fill="none" />
      <path d={`M 4,4 Q 20,4 20,20`} stroke={color} strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="3" fill={color} opacity="0.5" />
      <path d={`M ${w - 4},4 Q ${w - 4},20 ${w - 20},20`} stroke={color} strokeWidth="2" fill="none" />
      <path d={`M ${w - 4},4 Q ${w - 20},4 ${w - 20},20`} stroke={color} strokeWidth="2" fill="none" />
      <circle cx={w - 12} cy="12" r="3" fill={color} opacity="0.5" />
      <path d={`M 4,${h - 4} Q 4,${h - 20} 20,${h - 20}`} stroke={color} strokeWidth="2" fill="none" />
      <path d={`M 4,${h - 4} Q 20,${h - 4} 20,${h - 20}`} stroke={color} strokeWidth="2" fill="none" />
      <circle cx="12" cy={h - 12} r="3" fill={color} opacity="0.5" />
      <path d={`M ${w - 4},${h - 4} Q ${w - 4},${h - 20} ${w - 20},${h - 20}`} stroke={color} strokeWidth="2" fill="none" />
      <path d={`M ${w - 4},${h - 4} Q ${w - 20},${h - 4} ${w - 20},${h - 20}`} stroke={color} strokeWidth="2" fill="none" />
      <circle cx={w - 12} cy={h - 12} r="3" fill={color} opacity="0.5" />
      {/* Mid-edge scrolls */}
      <path d={`M ${w / 2 - 20},6 Q ${w / 2 - 10},14 ${w / 2},6 Q ${w / 2 + 10},14 ${w / 2 + 20},6`} stroke={color} strokeWidth="1.5" fill="none" />
      <path d={`M ${w / 2 - 20},${h - 6} Q ${w / 2 - 10},${h - 14} ${w / 2},${h - 6} Q ${w / 2 + 10},${h - 14} ${w / 2 + 20},${h - 6}`} stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ClassicFrame({ width, height, color }: { width: number; height: number; color: string }) {
  const pad = 24;
  const w = width + pad * 2;
  const h = height + pad * 2;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
    >
      <rect x="1" y="1" width={w - 2} height={h - 2} stroke={color} strokeWidth="4" />
      <rect x="8" y="8" width={w - 16} height={h - 16} stroke={color} strokeWidth="1" opacity="0.4" />
      <rect x="5" y="5" width={w - 10} height={h - 10} stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="8 4" />
      {/* Corner diagonals + diamonds */}
      <path d={`M 1,1 L 16,16`} stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d={`M ${w - 1},1 L ${w - 16},16`} stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d={`M 1,${h - 1} L 16,${h - 16}`} stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d={`M ${w - 1},${h - 1} L ${w - 16},${h - 16}`} stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="12" y="12" width="6" height="6" transform="rotate(45 15 15)" fill={color} opacity="0.3" />
      <rect x={w - 18} y="12" width="6" height="6" transform={`rotate(45 ${w - 15} 15)`} fill={color} opacity="0.3" />
      <rect x="12" y={h - 18} width="6" height="6" transform={`rotate(45 15 ${h - 15})`} fill={color} opacity="0.3" />
      <rect x={w - 18} y={h - 18} width="6" height="6" transform={`rotate(45 ${w - 15} ${h - 15})`} fill={color} opacity="0.3" />
    </svg>
  );
}

function OrnateFrame({ width, height, color }: { width: number; height: number; color: string }) {
  const pad = 30;
  const w = width + pad * 2;
  const h = height + pad * 2;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
    >
      <rect x="3" y="3" width={w - 6} height={h - 6} rx="4" stroke={color} strokeWidth="3" />
      <rect x="12" y="12" width={w - 24} height={h - 24} rx="2" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Corner rosettes */}
      <circle cx="14" cy="14" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="14" cy="14" r="2" fill={color} opacity="0.4" />
      <circle cx={w - 14} cy="14" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx={w - 14} cy="14" r="2" fill={color} opacity="0.4" />
      <circle cx="14" cy={h - 14} r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="14" cy={h - 14} r="2" fill={color} opacity="0.4" />
      <circle cx={w - 14} cy={h - 14} r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx={w - 14} cy={h - 14} r="2" fill={color} opacity="0.4" />
      {/* Top/bottom arches */}
      <path d={`M ${w / 2 - 30},4 Q ${w / 2 - 15},16 ${w / 2},4 Q ${w / 2 + 15},16 ${w / 2 + 30},4`} stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
      <circle cx={w / 2} cy="4" r="2.5" fill={color} opacity="0.5" />
      <path d={`M ${w / 2 - 30},${h - 4} Q ${w / 2 - 15},${h - 16} ${w / 2},${h - 4} Q ${w / 2 + 15},${h - 16} ${w / 2 + 30},${h - 4}`} stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
      <circle cx={w / 2} cy={h - 4} r="2.5" fill={color} opacity="0.5" />
      {/* Side vines */}
      <path d={`M 4,${h / 2 - 25} Q 14,${h / 2 - 15} 4,${h / 2 - 5} Q 14,${h / 2 + 5} 4,${h / 2 + 15} Q 14,${h / 2 + 25} 4,${h / 2 + 25}`} stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d={`M ${w - 4},${h / 2 - 25} Q ${w - 14},${h / 2 - 15} ${w - 4},${h / 2 - 5} Q ${w - 14},${h / 2 + 5} ${w - 4},${h / 2 + 15} Q ${w - 14},${h / 2 + 25} ${w - 4},${h / 2 + 25}`} stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
    </svg>
  );
}

const frameComponents = {
  baroque: BaroqueFrame,
  classic: ClassicFrame,
  ornate: OrnateFrame,
};

const paddings: Record<FrameVariant, number> = {
  baroque: 28,
  classic: 24,
  ornate: 30,
};

export default function PhotoFrame({
  src,
  alt,
  width,
  height,
  rotation = 0,
  frameColor = "#C2AE4C",
  variant = "baroque",
}: PhotoFrameProps) {
  const FrameComponent = frameComponents[variant];
  const pad = paddings[variant];
  const totalWidth = width + pad * 2;
  const totalHeight = height + pad * 2;

  return (
    <div
      className="inline-block relative"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Hanging wire + nail — flush with frame top */}
      <HangingWire frameWidth={totalWidth} />

      <div
        className="relative shadow-xl"
        style={{
          width: totalWidth,
          height: totalHeight,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#FEF5EB" }}
        />
        <FrameComponent width={width} height={height} color={frameColor} />
        <div
          className="absolute"
          style={{
            top: pad,
            left: pad,
            width,
            height,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
