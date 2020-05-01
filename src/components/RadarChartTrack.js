import React from 'react';
import styled from '@emotion/styled';

const RadarChartTrack = styled(({ track, ...props }) => {
  const marginTriangle = 30;
  const width = 40;
  const height = (width * Math.sqrt(3)) / 2;
  const border = 1;

  const pointValue = (value = 0, x, y) => {
    // value comes in percentage [0, 1]

    const tmpValueWidth = ((value + 0.5) * width) / 1.5 / 2;
    const tmpValueHeight = (tmpValueWidth * Math.sqrt(3)) / 2;

    const middleHeightTriangle =
      height + 2 * border - ((width / 2) * Math.sqrt(3)) / 2;

    return `${width / 2 + tmpValueWidth * x + border},${
      middleHeightTriangle + tmpValueHeight * y + border
    }`;
  };

  const accPoint = pointValue(track?.acc, -1, 1);
  const tspPoint = pointValue(track?.tsp, 0, -1);
  const hanPoint = pointValue(track?.hnd, 1, 1);

  return (
    <div {...props}>
      <svg
        width={width + 2 * border + marginTriangle}
        height={height + 2 * border + marginTriangle}
      >
        <svg
          width={width + 2 * border}
          height={height + 2 * border}
          x={marginTriangle / 2}
          y={marginTriangle / 2 + 2}
        >
          <polygon
            className="outer-triangle"
            points={`
          ${width / 2 + border},${0 + border} 
          ${0 + border},${height + border} 
          ${width + border},${height + border}
          `}
          />
          <polygon
            className="inner-triangle"
            points={`
          ${tspPoint} 
          ${accPoint} 
          ${hanPoint}
          `}
          />
        </svg>
        <text x="0" y="100%" fontSize="12px">
          Acc
        </text>
        <text x="50%" y="12" fontSize="12px" textAnchor="middle">
          Tsp
        </text>
        <text x="100%" y="100%" fontSize="12px" textAnchor="end">
          Hnd
        </text>
        Sorry, your browser does not support inline SVG.
      </svg>
    </div>
  );
})`
  margin: 4px;

  .outer-triangle {
    fill: transparent;
    stroke: black;
    stroke-width: 1;
  }

  .inner-triangle {
    fill: #2f80ed80;
    stroke-width: 1;
  }
`;

export default RadarChartTrack;
