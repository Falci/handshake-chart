import React from "react";
import { Bar } from "@nivo/bar";

const intl = new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 });

const BarComponent = (props) => {
  const height = Math.min(props.height, 100);
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <rect
        x={-3}
        y={7}
        width={props.width}
        height={height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={props.width} height={height} fill={props.color} />
      <rect
        x={props.width - 5}
        width={5}
        height={height}
        fill={props.borderColor}
        fillOpacity={0.2}
      />
      <text
        x={props.width - 16}
        y={height / 2 - 8}
        textAnchor="end"
        dominantBaseline="central"
        fill="black"
        style={{
          fontWeight: 900,
          fontSize: 15,
          textTransform: "capitalize"
        }}
      >
        {props.data.indexValue}
      </text>
      <text
        x={props.width - 16}
        y={height / 2 + 10}
        textAnchor="end"
        dominantBaseline="central"
        fill={props.borderColor}
        style={{
          fontWeight: 400,
          fontSize: 13
        }}
      >
        {intl.format(props.data.value)}
      </text>
    </g>
  );
};

export default ({ data }) => (
  <Bar
    width={800}
    height={800}
    layout="horizontal"
    margin={{ top: 26, right: 20, bottom: 26, left: 120 }}
    data={data}
    indexBy="type"
    keys={["value"]}
    colorBy="indexValue"
    borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
    enableGridX
    enableGridY={false}
    axisTop={{
      format: "~s"
    }}
    axisBottom={{
      format: "~s"
    }}
    axisLeft={null}
    padding={0.3}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
    isInteractive={false}
    barComponent={BarComponent}
    motionStiffness={250}
    motionDamping={26}
  />
);
