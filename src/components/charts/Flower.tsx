import { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

export type TData = {
  date: string;
  t3: number;
  t4: number;
  tsh: number;
  status: "N" | "H" | "L";
};

const stalkPaths = [
  {
    id: "choking",
    d: "M120.202 209.829L105.42 217.914L103.416 211.282L120.202 209.829Z",
    fill: "#D1C6C6",
  },
  {
    id: "weightloss",
    d: "M73.8299 228.737L87.9607 237.912L83.0735 242.823L73.8299 228.737Z",
    fill: "#D1C6C6",
  },
  {
    id: "weightloss_2",
    d: "M80.7875 208.578L97.086 212.848L93.99 219.046L80.7875 208.578Z",
    fill: "#D1C6C6",
  },
  {
    id: "nosebleed",
    d: "M105.215 248.835L90.3904 256.842L88.4217 250.199L105.215 248.835Z",
    fill: "#D1C6C6",
  },
  {
    id: "panic",
    d: "M114.27 228.863L99.242 236.481L97.4472 229.789L114.27 228.863Z",
    fill: "#D1C6C6",
  },
  {
    id: "mood",
    d: "M97.373 194.048C90.0903 246.126 61.521 280.055 61.2577 280.456C59.8188 282.152 61.7491 284.132 65.5221 284.779C66.382 284.897 67.2769 285 68.2597 285C71.1728 285 74.0154 284.172 75.174 282.862C75.5776 282.421 106.358 245.788 112.781 190.127L106.499 181L97.373 194.048Z",
    fill: "#D1C6C6",
  },
];

// const budPaths = [
//   {
//     id: "top-bud",
//     d: "M60.4569 95.1909C71.8078 117.878 88.148 163.467 101.426 190.234C103.327 194.066 108.7 193.567 110.083 189.519L142.352 95.0705C142.53 94.5501 142.621 93.9942 142.617 93.4442C142.317 57.675 122.864 37.4555 103.608 18.651C99.7938 14.9264 93.6842 14.8178 89.9175 18.5901C65.9184 42.6246 58.2605 62.9664 59.9387 93.2427C59.9765 93.9247 60.1512 94.58 60.4569 95.1909Z",
//     fill: "#F25445",
//   },
//   {
//     id: "right-bud",
//     d: "M82.6647 116.418C102.588 135.285 102.059 150.914 98.9876 181.258C98.1941 189.098 106.389 194.767 113.402 191.175C139.44 177.837 160.044 163.957 173.5 119.5C182.366 82.146 170.888 57.6246 154.245 15.6362C151.455 8.5978 142.152 6.98016 137.486 12.9428C110.167 47.8555 105.261 70.3213 82.4534 115.21C82.2513 115.608 82.3408 116.112 82.6647 116.418Z",
//     fill: "#EB8E44",
//   },
//   {
//     id: "left-bud",
//     d: "M105.256 192.871C25.8957 187.811 -4.85358 153.299 31.0466 29.3377C33.1681 22.0121 42.4781 19.8575 47.6671 25.4468C115.212 98.2036 129.97 128.119 115.16 185.69C114.013 190.147 109.849 193.164 105.256 192.871Z",
//     fill: "#EB7044",
//   },
// ];

export default function Flower() {
  const [data, setData] = useState<TData[]>([]);

  useEffect(() => {
    d3.csv("/assets/data/thyroid-tests.csv").then((data) => {
      const parsedData = data.map((d) => {
        const parseDate = d3.timeParse("%d/%m/%Y");
        return {
          date: String(parseDate(d.date)) || "",
          t3: d.t3 ? +d.t3 : 0,
          t4: d.t4 ? +d.t4 : 0,
          tsh: d.tsh ? +d.tsh : 0,
          status: (d.status as "N" | "H" | "L") || "N",
        };
      });
      setData(parsedData);
    });
  }, []);

  const dimensions = useMemo(
    () => ({
      width: 180,
      height: 328,
      margin: { top: 20, right: 30, bottom: 30, left: 40 },
    }),
    []
  );

  useEffect(() => {
    console.log({ data });

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
      .attr("style", "height: intrinsic; padding:12, max-width:50%")
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

    //   add the stalk
    const gStalk = wrapper.append("g").attr("id", "stalk");

    gStalk
      .selectAll("path")
      .data(stalkPaths)
      .enter()
      .append("path")
      .attr("id", (d) => d.id)
      .attr("d", (d) => d.d)
      .attr("fill", (d) => d.fill);

    const g = wrapper.append("g");
    // Let's create a tooltip SVG text element
    d3.select("#flower-chart")
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
      .attr("y", dimensions.height - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("fill", "#333")
      .text((d: TData) =>
        new Date(d.date).toLocaleDateString("en-GB", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );

    // add the stalks
    gStalk
      .selectAll(".stalk")
      .data(stalkPaths)
      .enter()
      .append("path")
      .attr("class", "stalk")
      .attr("id", (d) => d.id)
      .attr("d", (d) => d.d)
      .attr("fill", (d) => d.fill);

    // add the buds
    // g.selectAll(".bud")
    //   .data(budPaths)
    //   .enter()
    //   .append("path")
    //   .attr("class", "bud")
    //   .attr("id", (d) => d.id)
    //   .attr("d", (d) => d.d)
    //   .attr("fill", (d) => d.fill);
    // Append first path
    g.append("path")
      .attr("id", "top-bud")
      .attr(
        "d",
        "M60.4569 95.1909C71.8078 117.878 88.148 163.467 101.426 190.234C103.327 194.066 108.7 193.567 110.083 189.519L142.352 95.0705C142.53 94.5501 142.621 93.9942 142.617 93.4442C142.317 57.675 122.864 37.4555 103.608 18.651C99.7938 14.9264 93.6842 14.8178 89.9175 18.5901C65.9184 42.6246 58.2605 62.9664 59.9387 93.2427C59.9765 93.9247 60.1512 94.58 60.4569 95.1909Z"
      )
      .attr("fill", "#F25445")
      //   if low hide
      .attr("fill-opacity", (d) =>
        d.status == "L" ? 0 : d.status == "N" ? 1 : 0.5
      );

    //   append the left bud
    g.append("path")
      .attr("id", "left-bud")
      .attr(
        "d",
        "M105.256 192.871C25.8957 187.811 -4.85358 153.299 31.0466 29.3377C33.1681 22.0121 42.4781 19.8575 47.6671 25.4468C115.212 98.2036 129.97 128.119 115.16 185.69C114.013 190.147 109.849 193.164 105.256 192.871Z"
      )
      .attr("fill", "#EB7044")
      //   if low hide
      .attr("fill-opacity", (d) =>
        d.status == "L" ? 0 : d.status == "N" ? 1 : 0.5
      );

    //   append the right bud
    g.append("path")
      .attr("id", "right-bud")
      .attr(
        "d",
        "M82.6647 116.418C102.588 135.285 102.059 150.914 98.9876 181.258C98.1941 189.098 106.389 194.767 113.402 191.175C139.44 177.837 160.044 163.957 173.5 119.5C182.366 82.146 170.888 57.6246 154.245 15.6362C151.455 8.5978 142.152 6.98016 137.486 12.9428C110.167 47.8555 105.261 70.3213 82.4534 115.21C82.2513 115.608 82.3408 116.112 82.6647 116.418Z"
      )
      .attr("fill", (d) => (d.status == "L" ? "#EB8E44" : "#EB8E44"));
    //   if low hide
    //   .attr("fill-opacity", (d) =>
    //     d.status == "L" ? 0 : d.status == "N" ? 1 : 0.5
    //   );

    // Append left bud as a sibling
    g.append("path")
      .attr("id", "left-bud")
      .attr(
        "d",
        "M105.256 192.871C25.8957 187.811 -4.85358 153.299 31.0466 29.3377C33.1681 22.0121 42.4781 19.8575 47.6671 25.4468C115.212 98.2036 129.97 128.119 115.16 185.69C114.013 190.147 109.849 193.164 105.256 192.871Z"
      )
      .attr("fill", "#EB7044");

    // add the flowerSVg inside the g
  }, [dimensions, data]);

  return (
    <div
      id='flower-chart'
      className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'
    >
      {/* <FlowerSVG /> */}
    </div>
  );
}
