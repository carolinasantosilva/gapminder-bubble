
export default function YAxis({
  scale,
  position,
  height,
  width,
  pixelsPerTick = 50,
}) {
  const tickCount = Math.max(2, Math.floor(height / pixelsPerTick));
  const ticks = scale.ticks(tickCount);

  return (
    <g transform={`translate(${position}, 0)`}>
      {ticks.map((tick) => (
        <g key={tick} transform={`translate(0, ${scale(tick)})`}>

          {/* Horizontal gridline */}
          <line
            x1={0}
            x2={width}
            y1={0}
            y2={0}
            stroke="#e5e7eb"
            strokeWidth={1}
          />

          {/* Tick label */}
          <text
            x={-10}
            dy="0.32em"
            textAnchor="end"
            fontSize={11}
            fill="#64748b"
          >
            {tick}
          </text>

        </g>
      ))}
    </g>
  );
}
