
export default function XAxis({
  scale,
  position,
  width,
  height,
  pixelsPerTick = 80,
}) {
  const tickCount = Math.max(2, Math.floor(width / pixelsPerTick));
  const ticks = scale.ticks(tickCount);

  return (
    <g transform={`translate(0, ${position})`}>
      {ticks.map((tick) => (
        <g key={tick} transform={`translate(${scale(tick)}, 0)`}>

          {/* Vertical gridline */}
          <line
            y1={-height}
            y2={0}
            stroke="#e5e7eb"
            strokeWidth={1}
          />

          {/* Tick label */}
          <text
            y={20}
            textAnchor="middle"
            fontSize={11}
            fill="#64748b"
          >
            {tick.toLocaleString()}
          </text>

        </g>
      ))}
    </g>
  );
}
