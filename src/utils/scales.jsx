
import { scaleLinear, scaleSqrt, extent } from "d3";

export function createScales(data, width, height) {
  if (!data.length) return null;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.gdpPercap))
    .range([0, width])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, d => d.lifeExp))
    .range([height, 0])
    .nice();

  const sizeScale = scaleSqrt()
    .domain(extent(data, d => d.pop))
    .range([3, 35]);

  return {
    xScale,
    yScale,
    sizeScale,
  };
}
