import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { thyroidPath, butterflyPath } from "./constants";

type colorStatus =
  | "hypo"
  | "midhypo"
  | "euthyroid"
  | "midhyper"
  | "hyper"
  | "none";
export type TData = {
  date: string;
  t3: number;
  t4: number;
  tsh: number;
  status: "N" | "H" | "L";
  colorStatus: colorStatus;
};
interface IFlowerProps {
  currentIndex: number | null;
}
export default function Flower(props: IFlowerProps) {
  const [data, setData] = useState<TData[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // const [dimensionsState, setDimensionsState] = useState({
  //   width: 180,
  //   height: 160,
  // });
  const { currentIndex = 0 } = props;

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

  const opacitySwitch = useCallback(
    (d: TData) => {
      switch (true) {
        // default
        case currentIndex == null:
          return 1;
        // hyperthyroid
        case d.colorStatus === "hyper" && currentIndex === 0:
          return 1;
        // midhyperthyroid
        case d.colorStatus === "midhyper" && currentIndex === 1:
          return 1;
        // hypo
        case d.colorStatus === "hypo" && currentIndex === 2:
          return 1;
        // euthyroid
        case d.colorStatus === "euthyroid" && currentIndex === 3:
          return 1;
        default:
          return 0.1;
      }
    },
    [currentIndex]
  );

  useEffect(() => {
    if (data.length === 0) return; // wait until data is loaded

    const legendItems = [
      { label: "Hyperthyroid", color: "#DE2929" },
      { label: "Subclinical Hyper", color: "#EB8E44" },
      { label: "Euthyroid", color: "#EB7044" },
      { label: "Subclinical Hypo", color: "#B4E1EC" },
      { label: "Hypothyroid", color: "#7BC4D6" },
    ];

    // Remove old SVG
    d3.select("#legend-container").selectAll("svg").remove();

    const svgWidth = 800;
    const svgHeight = 100;
    const rectSize = 15;
    const spacing = 10;
    const startX = 10;
    const startY = 50;

    const svg = d3
      .select("#legend-container")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Gradient rectangle (assuming you have #colorGradient defined elsewhere)
    svg
      .append("rect")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", svgWidth - 20)
      .attr("height", 20)
      .style("fill", "url(#colorGradient)");

    // Create the categorical legend group
    const legend = svg
      .selectAll("g.legend-item")
      .data(legendItems)
      .enter()
      .append("g")
      .attr("class", "legend-item");

    // Append rectangles
    legend
      .append("rect")
      .attr("width", rectSize)
      .attr("height", rectSize)
      .attr("fill", (d) => d.color);

    // Append text with word-wrapping
    legend
      .append("text")
      .attr("x", rectSize + 5)
      .attr("y", rectSize / 2)
      .attr("font-size", "12px")
      .each(function (d) {
        const words = d.label.split(" ");
        const lineHeight = 12;
        const text = d3.select(this);
        words.forEach((word, i) => {
          text
            .append("tspan")
            .attr("x", rectSize + 5)
            .attr("dy", i === 0 ? 0 : lineHeight)
            .text(word);
        });
      });

    // Position each legend group dynamically to avoid overlap
    let cumulativeX = startX;
    legend.attr("transform", function () {
      const bbox = this.getBBox();
      const x = cumulativeX;
      cumulativeX += bbox.width + spacing;
      return `translate(${x}, ${startY})`;
    });
  }, [data]);

  useEffect(() => {
    d3.csv("/data/thyroid-tests.csv").then((data) => {
      const parsedData = data.map((d) => {
        const parseDate = d3.timeParse("%d/%m/%Y");
        return {
          date: String(parseDate(d.date)) || "",
          t3: d.t3 ? +d.t3 : 0,
          t4: d.t4 ? +d.t4 : 0,
          tsh: d.tsh ? +d.tsh : 0,
          status: (d.status as "N" | "H" | "L") || "N",
          colorStatus: tshLevel(Number(d.tsh)) || "hypo",
        };
      });
      setData(parsedData);
    });
  }, []);

  // //   Update dimensions on resize
  // useEffect(() => {
  //   const updateDimensions = () => {
  //     if (wrapperRef.current) {
  //       const { width, height } = wrapperRef.current.getBoundingClientRect();

  //       setDimensionsState({ width, height });
  //     }
  //   };

  //   updateDimensions();
  //   window.addEventListener("resize", updateDimensions);
  //   return () => window.removeEventListener("resize", updateDimensions);
  // }, []);

  const dimensions = useMemo(
    () => ({
      width: 180,
      height: 160,
      margin: { top: 20, right: 30, bottom: 30, left: 40 },
    }),
    []
  );

  useEffect(() => {
    d3.select("#flower-chart").selectAll("*").remove();
    const wrapper = d3
      .select("#flower-chart")
      .selectAll("svg")
      .data(data)
      .enter()
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height + 50)
      .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr(
        "style",
        "height: intrinsic; padding:12, max-width:50%, position:relative"
      )
      .on("mouseenter", function (event, d) {
        const date = new Date(d.date).toLocaleDateString("en-GB", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        d3.select("#tooltip")
          .style("display", "block")
          .html(
            `Date: <b>${date}</b>, <br/> TSH: <b>${d.tsh}</b>,<br/> T3:<b> ${d.t3}</b>,<br/> T4:<b> ${d.t4}</b>`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mousemove", function (event) {
        d3.select("#tooltip")
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseleave", function () {
        d3.select("#tooltip").style("display", "none");
      });

    const g = wrapper.append("g");
    g.attr("opacity", (d) => opacitySwitch(d));

    // When you want to update opacity with a smooth transition:
    g.transition()
      .duration(600) // duration in ms
      .attr("opacity", (d) => opacitySwitch(d));
    // Let's create a tooltip SVG text element
    d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "4px 8px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("display", "none");

    // add text with the date
    g.append("text")
      .attr("x", dimensions.width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("fill", "#333")

      .text(
        (d: TData) =>
          `${new Date(d.date).toLocaleDateString("en-GB", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`
      );

    // Append body of buttefly
    g.append("path")
      .attr("id", "body")
      .attr("d", `${butterflyPath.body}`)
      .attr("fill", (d) => `url(#${d.colorStatus}0)`);

    //   append the left antenae
    g.append("path")
      .attr("id", "left-antenae")
      .attr("d", `${butterflyPath.leftantenae}`)
      .attr("fill", (d) => `url(#${d.colorStatus}1)`);

    //   append the right antenae
    g.append("path")
      .attr("id", "right-bud")
      .attr("d", `${butterflyPath.rightantenae}`)
      .attr("fill", (d) => `url(#${d.colorStatus}2)`);

    //   append the thyroid
    g.append("path")
      .attr("id", "thyroid")
      .attr("d", `${thyroidPath}`)
      .attr("fill", (d) => (d.status == "L" ? "#F5F5F5" : "#F5F5F5"))
      .attr("opacity", 0.5);

    // add defs to gradients to the buttefly
    // Append defs with gradients
    // inside your useEffect, after creating `wrapper`
    wrapper.each(function () {
      const svg = d3.select(this);

      const defs = svg.append("defs");

      // --- Euthyroid ---
      const e0 = defs
        .append("linearGradient")
        .attr("id", "euthyroid0")
        .attr("x1", "90.32")
        .attr("y1", "0")
        .attr("x2", "90.32")
        .attr("y2", "150.894")
        .attr("gradientUnits", "userSpaceOnUse");
      e0.append("stop")
        .attr("offset", "0.701923")
        .attr("stop-color", "#EB8E44");
      e0.append("stop").attr("offset", "1").attr("stop-color", "#EB7044");

      const e1 = defs
        .append("linearGradient")
        .attr("id", "euthyroid1")
        .attr("x1", "103.742")
        .attr("y1", "3.18799")
        .attr("x2", "103.742")
        .attr("y2", "53.8424")
        .attr("gradientUnits", "userSpaceOnUse");
      e1.append("stop")
        .attr("offset", "0.414161")
        .attr("stop-color", "#EB8E44");
      e1.append("stop").attr("offset", "1").attr("stop-color", "#E55D5D");

      const e2 = defs
        .append("linearGradient")
        .attr("id", "euthyroid2")
        .attr("x1", "78.2236")
        .attr("y1", "3.18799")
        .attr("x2", "78.2236")
        .attr("y2", "53.8424")
        .attr("gradientUnits", "userSpaceOnUse");
      e2.append("stop")
        .attr("offset", "0.414161")
        .attr("stop-color", "#EB8E44");
      e2.append("stop").attr("offset", "1").attr("stop-color", "#E55D5D");

      // --- Hyper ---
      const h0 = defs
        .append("linearGradient")
        .attr("id", "hyper0")
        .attr("x1", "0")
        .attr("y1", "75.4471")
        .attr("x2", "180.64")
        .attr("y2", "75.4471")
        .attr("gradientUnits", "userSpaceOnUse");

      h0.append("stop")
        .attr("offset", "0.716346")
        .attr("stop-color", "#DE2929");

      h0.append("stop").attr("offset", "1").attr("stop-color", "#EB7044");

      const h1 = defs
        .append("linearGradient")
        .attr("id", "hyper1")
        .attr("x1", "91.5391")
        .attr("y1", "28.5152")
        .attr("x2", "115.944")
        .attr("y2", "28.5152")
        .attr("gradientUnits", "userSpaceOnUse");

      h1.append("stop")
        .attr("offset", "0.716346")
        .attr("stop-color", "#DE2929");

      h1.append("stop").attr("offset", "1").attr("stop-color", "#EB7044");

      const h2 = defs
        .append("linearGradient")
        .attr("id", "hyper2")
        .attr("x1", "64.7842")
        .attr("y1", "28.564")
        .attr("x2", "88.8546")
        .attr("y2", "28.564")
        .attr("gradientUnits", "userSpaceOnUse");

      h2.append("stop")
        .attr("offset", "0.716346")
        .attr("stop-color", "#DE2929");

      h2.append("stop").attr("offset", "1").attr("stop-color", "#EB7044");

      // --- Mid-Hyper ---
      const mh0 = defs
        .append("linearGradient")
        .attr("id", "midhyper0")
        .attr("x1", "180.64")
        .attr("y1", "75.4471")
        .attr("x2", "0")
        .attr("y2", "75.4471")
        .attr("gradientUnits", "userSpaceOnUse");
      mh0
        .append("stop")
        .attr("offset", "0.414161")
        .attr("stop-color", "#EB8E44");
      mh0
        .append("stop")
        .attr("offset", "0.514283")
        .attr("stop-color", "#DE2929");

      const mh1 = defs
        .append("linearGradient")
        .attr("id", "midhyper1")
        .attr("x1", "103.742")
        .attr("y1", "3.18799")
        .attr("x2", "103.742")
        .attr("y2", "53.8424")
        .attr("gradientUnits", "userSpaceOnUse");
      mh1
        .append("stop")
        .attr("offset", "0.414161")
        .attr("stop-color", "#EB8E44");
      mh1.append("stop").attr("offset", "1").attr("stop-color", "#E55D5D");

      const mh2 = defs
        .append("linearGradient")
        .attr("id", "midhyper2")
        .attr("x1", "76.8194")
        .attr("y1", "3.31934")
        .attr("x2", "76.8194")
        .attr("y2", "53.8087")
        .attr("gradientUnits", "userSpaceOnUse");
      mh2
        .append("stop")
        .attr("offset", "0.414161")
        .attr("stop-color", "#EB8E44");
      mh2.append("stop").attr("offset", "1").attr("stop-color", "#E55D5D");

      // --- Mid-Hypo ---
      const mhyp0 = defs
        .append("linearGradient")
        .attr("id", "midhypo0")
        .attr("x1", "0")
        .attr("y1", "75.4471")
        .attr("x2", "180.64")
        .attr("y2", "75.4471")
        .attr("gradientUnits", "userSpaceOnUse");
      mhyp0
        .append("stop")
        .attr("offset", "0.485577")
        .attr("stop-color", "#B4E1EC");
      mhyp0
        .append("stop")
        .attr("offset", "0.807692")
        .attr("stop-color", "#EB8E44");

      const mhyp1 = defs
        .append("linearGradient")
        .attr("id", "midhypo1")
        .attr("x1", "103.742")
        .attr("y1", "3.18799")
        .attr("x2", "103.742")
        .attr("y2", "53.8424")
        .attr("gradientUnits", "userSpaceOnUse");
      mhyp1
        .append("stop")
        .attr("offset", "0.60563")
        .attr("stop-color", "#B4E1EC");
      mhyp1.append("stop").attr("offset", "1").attr("stop-color", "#EB8E44");

      const mhyp2 = defs
        .append("linearGradient")
        .attr("id", "midhypo2")
        .attr("x1", "76.8189")
        .attr("y1", "3.31934")
        .attr("x2", "76.8189")
        .attr("y2", "53.8087")
        .attr("gradientUnits", "userSpaceOnUse");
      mhyp2
        .append("stop")
        .attr("offset", "0.60563")
        .attr("stop-color", "#B4E1EC");
      mhyp2.append("stop").attr("offset", "1").attr("stop-color", "#EB8E44");

      // --- Hypo ---
      const hh0 = defs
        .append("linearGradient")
        .attr("id", "hypo0")
        .attr("x1", "180.997")
        .attr("y1", "75.62")
        .attr("x2", "0.356934")
        .attr("y2", "75.62")
        .attr("gradientUnits", "userSpaceOnUse");
      hh0.append("stop").attr("offset", "0").attr("stop-color", "#7BC4D6");
      hh0.append("stop").attr("offset", "1").attr("stop-color", "#C2DBE1");

      const hh1 = defs
        .append("linearGradient")
        .attr("id", "hypo1")
        .attr("x1", "116.299")
        .attr("y1", "28.6905")
        .attr("x2", "91.8936")
        .attr("y2", "28.6905")
        .attr("gradientUnits", "userSpaceOnUse");
      hh1.append("stop").attr("offset", "0").attr("stop-color", "#7BC4D6");
      hh1.append("stop").attr("offset", "1").attr("stop-color", "#C2DBE1");

      const hh2 = defs
        .append("linearGradient")
        .attr("id", "hypo2")
        .attr("x1", "89.213")
        .attr("y1", "28.7295")
        .attr("x2", "65.1426")
        .attr("y2", "28.7295")
        .attr("gradientUnits", "userSpaceOnUse");
      hh2.append("stop").attr("offset", "0").attr("stop-color", "#7BC4D6");
      hh2.append("stop").attr("offset", "1").attr("stop-color", "#C2DBE1");
    });

    // add the flowerSVg inside the g
  }, [dimensions, data, currentIndex, opacitySwitch]);

  return (
    <>
      <div id='legend-container' className='my-8 flex justify-center'></div>

      <motion.div
        ref={wrapperRef}
        layout
        layoutId='flower-chart'
        id='flower-chart'
        transition={{ layout: { duration: 0.5, type: "spring" } }} // Optional: customize animation
        className={` grid grid-cols-2 gap-4 ${
          currentIndex === null
            ? "md:grid-cols-4 lg:grid-cols-5"
            : "md:grid-cols-3 lg:grid-cols-3"
        }   `}
      ></motion.div>
    </>
  );
}
