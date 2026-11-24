
import { useEffect, useRef, useState } from "react";
import { scaleOrdinal, schemeTableau10 } from "d3";

import { data } from "../data/data";
import { createScales } from "../utils/scales";

import XAxis from "./axes/XAxis";
import YAxis from "./axes/YAxis";

export default function BubbleChart({
  title = "The Wealth and Health of Nations",
  subtitle = "Exploring the relationship between GDP per capita and life expectancy across countries.",
  height = 550,
}) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [tooltip, setTooltip] = useState(null);

  // Observe container width
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Responsive settings
  const isMobile = width < 600;

  const chartHeight = isMobile ? 420 : height;

  const margin = {
    top: 20,
    right: isMobile ? 15 : 35,
    bottom: 65,
    left: isMobile ? 65 : 85,
  };

  const innerWidth = Math.max(
    0,
    width - margin.left - margin.right
  );

  const innerHeight = chartHeight - margin.top - margin.bottom;

  // D3 scales
  const scales = innerWidth > 0
    ? createScales(data, innerWidth, innerHeight)
    : null;

  // Continent colors
  const continents = [...new Set(data.map(d => d.continent))];

  const colorScale = scaleOrdinal()
    .domain(continents)
    .range(schemeTableau10);

  // Draw larger bubbles first
  const sortedData = [...data].sort((a, b) => b.pop - a.pop);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        background: "#ffffff",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#545d74",
      }}
    >
      {/* Chart header */}
      <header style={{ marginBottom: 20, textAlign:"left" }}>
        <h2
          style={{
            fontSize: isMobile ? 23 : 30,
            fontWeight: 650,
            letterSpacing: "-0.8px",
            lineHeight: 1.2,
            margin: "0 0 10px 0",
            color: "#545d74",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            fontSize: isMobile ? 13 : 15,
            lineHeight: 1.6,
            fontWeight: 400,
            color: "#64748b",
            margin: 0,
            maxWidth: 650,
          }}
        >
          {subtitle}
        </p>
      </header>

      {/* Chart */}
      {scales && (
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${width} ${chartHeight}`}
          style={{
            display: "block",
            background: "#ffffff",
            fontFamily: "inherit",
          }}
        >
          <rect
            width={width}
            height={chartHeight}
            fill="#ffffff"
          />

          <g transform={`translate(${margin.left}, ${margin.top})`}>

            {/* Grid and axes */}
            <XAxis
              scale={scales.xScale}
              position={innerHeight}
              width={innerWidth}
              height={innerHeight}
              pixelsPerTick={isMobile ? 65 : 90}
            />

            <YAxis
              scale={scales.yScale}
              position={0}
              height={innerHeight}
              width={innerWidth}
              pixelsPerTick={isMobile ? 45 : 55}
            />

            {/* Bubbles */}

{/* Bubbles */}
{sortedData.map(d => (
  
<circle
  key={d.country}
  cx={scales.xScale(d.gdpPercap)}
  cy={scales.yScale(d.lifeExp)}
  r={
    scales.sizeScale(d.pop) *
    (tooltip?.country === d.country ? 1.12 : 1)
  }
  fill={colorScale(d.continent)}
  fillOpacity={tooltip?.country === d.country ? 0.75 : 0.5}
  stroke={colorScale(d.continent)}
  strokeWidth={1}
  onMouseEnter={(event) => {
    setTooltip({
      country: d.country,
      continent: d.continent,
      gdpPercap: d.gdpPercap,
      lifeExp: d.lifeExp,
      pop: d.pop,
      color: colorScale(d.continent),
      x: event.clientX,
      y: event.clientY,
    });
  }}
  onMouseMove={(event) => {
    setTooltip(prev => ({
      ...prev,
      x: event.clientX,
      y: event.clientY,
    }));
  }}
  onMouseLeave={() => setTooltip(null)}
  style={{
    cursor: "pointer",
    transition: "r 150ms ease, fill-opacity 150ms ease",
  }}
/>

))}


            {/* X-axis label */}
            <text
              x={innerWidth / 2}
              y={innerHeight + 52}
              textAnchor="middle"
              fontSize={isMobile ? 11 : 15}
              fill="#475569"
            >
              GDP per capita
            </text>

            {/* Y-axis label */}
            <text
              transform={`translate(-48, ${innerHeight / 2}) rotate(-90)`}
              textAnchor="middle"
              fontSize={isMobile ? 11 : 15}
              fill="#475569"
            >
              Life expectancy
            </text>

          </g>
        </svg>     

      )}

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px 22px",
    marginTop: 16,
    padding: "0 8px",
  }}
>
  {continents.map((continent) => (
    <div
      key={continent}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        fontSize: 12,
        color: "#475569",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          backgroundColor: colorScale(continent),
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {continent}
    </div>
  ))}
</div>


{/* Tooltip */}
{tooltip && (
  <div
    style={{
      position: "fixed",
      left: tooltip.x + 15,
      top: tooltip.y + 15,
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "16px 18px",
      boxShadow: "0 8px 24px rgba(15, 23, 42, 0.10)",
      pointerEvents: "none",
      zIndex: 10,
      minWidth: "210px",
      fontFamily: "inherit",
      fontSize: "13px",
      lineHeight: 1.8,
      color: "#475569",
    }}
  >
    {/* Country */}
    <div
      style={{
        fontSize: "17px",
        fontWeight: 700,
        color: tooltip.color,
        marginBottom: "2px",
      }}
    >
      {tooltip.country}
    </div>

    {/* Continent */}
    <div
      style={{
        fontSize: "13px",
        fontWeight: 700,
        color: tooltip.color,
        marginBottom: "10px",
      }}
    >
      {tooltip.continent}
    </div>

    {/* Statistics */}
    <div>
      GDP per capita:{" "}
      <strong>
        ${tooltip.gdpPercap.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })}
      </strong>
    </div>

    <div>
      Life expectancy:{" "}
      <strong>{tooltip.lifeExp.toFixed(1)} years</strong>
    </div>

    <div>
      Population:{" "}
      <strong>{tooltip.pop.toLocaleString("en-US")}</strong>
    </div>
  </div>
)}


    </div>
  );
}
