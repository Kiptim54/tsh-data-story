import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import type { colorStatus } from "./Flower";
// import { type TData } from "./Flower";

export type TData = {
  date: Date;
  t3: number;
  t4: number;
  tsh: number;
  status: "N" | "H" | "L";
  colorStatus: colorStatus;
  description: string;
};

const tshLevel = (level: number): colorStatus => {
  switch (true) {
    case level <= 0.03:
      return "hyper";
    case level >= 0.04 && level <= 0.34:
      return "midhyper";
    case level >= 0.35 && level <= 4.94:
      return "euthyroid";
    case level >= 4.95 && level <= 6:
      return "midhypo";
    case level > 6:
      return "hypo";

    default:
      return "none";
  }
};

export default function LineChart() {
  const [data, setData] = useState<TData[]>([]);
  const dimensions = React.useMemo(
    () => ({
      width: 800,
      height: 500,
      margin: { top: 20, right: 30, bottom: 30, left: 40 },
    }),
    []
  );

  useEffect(() => {
    const parseDate = d3.timeParse("%d/%m/%Y");
    d3.csv("/data/thyroid-tests.csv").then((data) => {
      const parsedData = data
        .map((d) => {
          const date = parseDate(d.date);
          if (!date) {
            console.error(`Invalid date format: ${d.date}`);
            return null;
          }
          return {
            date,
            t3: d.t3 ? +d.t3 : 0,
            t4: d.t4 ? +d.t4 : 0,
            tsh: d.tsh ? +d.tsh : 0,
            status: (d.status as "N" | "H" | "L") || "N",
            colorStatus: tshLevel(Number(d.tsh)) || "hypo",
          };
        })
        .filter((d): d is TData => d !== null);

      setData(parsedData);
    });
  }, []);

  useEffect(() => {
    d3.select("#wrapper").selectAll("*").remove(); // clear the svg before drawing

    // x and y axis accessors
    const xAccessor = (d: TData) => d.date;
    const yAccessor = (d: TData) => d.tsh;

    const minMaxTSH = d3.extent(data, (d) => d.tsh) || [0, 40];
    const minMaxDate = d3.extent(data, (d) => d.date) || [
      new Date("2020-01-01"),
      new Date("2023-01-01"),
    ];

    // d3 scales
    // x scales
    const xScale = d3
      .scaleTime()
      .domain(minMaxDate as [Date, Date])
      .range([
        dimensions.margin.left,
        dimensions.width - dimensions.margin.right,
      ])
      .nice();

    // y scale
    const yScale = d3
      .scaleLinear()
      .domain(minMaxTSH as [number, number])
      .range([
        dimensions.height - dimensions.margin.bottom,
        dimensions.margin.top,
      ])
      .nice();

    const lineGenerator = d3
      .line<TData>()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)))
      .curve(d3.curveCardinal.tension(0.5)); // Smooth curve

    const wrapper = d3
      .select("#wrapper")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height + 100)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr("style", "max-width: 100%; height: 100%; height: intrinsic; ")
      .append("g");
    // .attr(
    //   "transform",
    //   `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    // );

    // draw the x axis (quarterly ticks + compact labels, rotated to avoid crowding)
    const xAxis = wrapper
      .append("g")
      .attr(
        "transform",
        `translate(0, ${dimensions.height - dimensions.margin.bottom})`
      )
      .call(
        d3
          .axisBottom(xScale)
          // show a tick every 3 months (use .every(1) for monthly, .every(12) for yearly)
          .ticks(d3.timeMonth.every(3))
          // compact month + year like "Jan '25"
          .tickFormat((d: Date | d3.NumberValue) => {
            const date = d instanceof Date ? d : new Date(d as number);
            return isNaN(date.getTime()) ? "" : d3.timeFormat("%b '%y")(date);
          })
      );

    // style and rotate labels to prevent overlap
    xAxis
      .selectAll("text")
      .attr("fill", "black")
      .style("font-size", "12px")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-0.6em")
      .attr("dy", "0.25em");

    // axis line and ticks styling
    xAxis.selectAll("path, .domain").attr("stroke", "black");
    xAxis.selectAll("line").attr("stroke", "black");

    //   // draw the y axis
    const yAxis = wrapper
      .append("g")
      .attr("transform", `translate(${dimensions.margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));

    yAxis.selectAll("path").attr("stroke", "black"); // For the axis line
    yAxis
      .selectAll("text") // Select all tick labels
      .attr("fill", "black") // Set the text color
      .style("font-size", "12px"); // Optional: Set font size

    // draw the line
    wrapper
      .append("path")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("class", "animated-line");

    //   // Tiny dots for each tsh
    wrapper
      .selectAll(".dot-tsh")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-tsh")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.tsh))
      .attr("r", 3)
      .attr("fill", "black");

    // Draw the y axis label
    wrapper
      .append("text")
      .attr("x", dimensions.margin.left + 10)
      .attr("y", dimensions.margin.top - 20)
      .attr("text-anchor", "middle")
      // .attr("transform", `translate(${0}, ${dimensions.height / 2}) rotate(0)`)
      .text("TSH Levels")
      .style("font-size", "16px")
      .style("font-weight", "bold");

    // Draw the x axis label
    wrapper
      .append("text")
      .attr("x", dimensions.width / 2 - dimensions.margin.right)
      .attr("y", dimensions.height - dimensions.margin.bottom + 50)
      .attr("text-anchor", "middle")
      .text("Date")
      .style("font-size", "16px")
      .style("font-weight", "bold");

    // Tooltip creation
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "white")
      .style("padding", "6px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("font-size", "14px")
      .style("display", "none")
      .style("z-index", "9999");

    // 2) Overlay rect to capture mouse events
    wrapper
      .append("rect")
      .attr(
        "width",
        dimensions.width - dimensions.margin.left - dimensions.margin.right
      )
      .attr(
        "height",
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom
      )
      .attr(
        "transform",
        `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
      )
      .style("fill", "transparent")
      .style("pointer-events", "all")
      .on("pointermove", (event) => {
        // 1) pointer relative to <g>
        const [mx] = d3.pointer(event, wrapper.node());

        // 2) bisect and pick the nearest data point
        const x0 = xScale.invert(mx);
        const bisect = d3.bisector((d: TData) => d.date).left;
        const i = bisect(data, x0);
        const d = data[i - 1] ?? data[0];

        const html = `<strong>Date:</strong>  ${new Date(
          d.date
        ).toLocaleDateString("en-UK")}<br/>
            <strong>TSH:</strong>${d.tsh}<br/>
            `;

        // 3) position the tooltip
        tooltip
          .style("display", "block")
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 30 + "px")
          .html(html);
      })
      .on("pointerout", () => tooltip.style("display", "none"));

    const path = d3.select(".animated-line").node() as SVGPathElement;
    const pathRatings = d3
      .select(".animated-line-ratings")
      .node() as SVGPathElement;
    if (!path) return;
    if (!pathRatings) return;

    const pathLength = path.getTotalLength();
    const pathLengthRatings = pathRatings.getTotalLength();

    // Initial state: hidden
    d3.select(path)
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength);

    d3.select(pathRatings)
      .attr("stroke-dasharray", pathLengthRatings)
      .attr("stroke-dashoffset", pathLengthRatings);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const wrapper = document.getElementById("wrapper");
      if (!wrapper) return;

      const { top, height } = wrapper.getBoundingClientRect();
      const start = top + scrollTop - windowHeight * 0.8; // start animating when half the wrapper is in view
      const end = start + height;

      const scrollPercent = Math.min(
        1,
        Math.max(0, (scrollTop - start) / (end - start))
      );

      const drawLength = pathLength * scrollPercent;
      const drawLengthRatings = pathLengthRatings * scrollPercent;
      d3.select(pathRatings).attr(
        "stroke-dashoffset",
        pathLengthRatings - drawLengthRatings
      );
      d3.select(path).attr("stroke-dashoffset", pathLength - drawLength);
      // d3.select(pathRatings).attr(
      //   ".dashoffset",
      //   pathLengthRatings - drawLengthRatings
      // );
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, dimensions]);

  return <div id='wrapper' className='relative  mx-auto'></div>;
}
