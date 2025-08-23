import { useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

import { thyroidPath } from "./constants";

export type TData = {
  date: string;
  t3: number;
  t4: number;
  tsh: number;
  status: "N" | "H" | "L";
};

export default function Flower() {
  const [data, setData] = useState<TData[]>([]);

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
        };
      });
      setData(parsedData);
    });
  }, []);

  const dimensions = useMemo(
    () => ({
      width: 180,
      height: 160,
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
      .attr("y", -10)
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

    // Append body of buttefly
    g.append("path")
      .attr("id", "body")
      .attr(
        "d",
        "M173.996 2.12397H173.94C166.291 -2.11224 154.606 1.36145 145.856 4.86338L145.828 4.89134C145.743 4.91958 145.659 4.94782 145.574 4.97607C145.151 5.39969 102.834 18.9612 92.6072 66.5468C92.0727 63.174 91.4046 61.1462 90.6769 61.1462C89.9493 61.1462 89.2812 63.174 88.7464 66.5474C78.5197 18.9615 36.2033 5.40025 35.7793 4.97663C35.6947 4.94839 35.6103 4.92015 35.5253 4.89191L35.4971 4.86395C26.7474 1.36173 15.0623 -2.11168 7.44131 2.12453H7.3572C6.84887 2.49167 3.96994 3.90374 2.05093 7.23622C-0.0941546 10.9076 -0.0659297 15.3415 1.37354 19.38C6.79242 32.2581 18.6754 34.6021 26.9455 58.5508C32.2758 73.8438 33.8321 77.6883 52.8557 77.3879C20.3971 95.3494 25.7877 142.484 49.3275 150.251C73.2791 157.133 77.0796 118.566 87.29 90.859C87.3769 90.5989 87.4545 90.3704 87.5381 90.1233C87.7269 102.929 89.0588 112.859 90.6772 112.859C92.2956 112.859 93.6276 102.929 93.8164 90.1233C93.8997 90.3704 93.9775 90.5986 94.0642 90.8587C95.7295 95.3773 98.0439 101.816 100.415 109.526C102.391 116.163 103.689 122.659 106.173 129.295C111.592 143.077 118.168 154.232 132.027 150.25C155.566 142.484 160.957 95.3491 128.499 77.3876C133.889 77.4723 139.449 77.6982 144.191 75.2977C145.659 74.5069 147.098 73.462 148.284 72.1344C151.728 68.2088 152.715 63.4078 154.437 58.5503C162.706 34.6016 174.561 32.2575 179.98 19.3795C181.42 15.3409 181.448 10.907 179.303 7.23566C177.384 3.90346 174.505 2.49139 173.996 2.12397Z"
      )
      .attr("fill", (d) => (d.status == "L" ? "#C2DBE1" : "#F25445"));
    //   if low hide
    // .attr("fill-opacity", (d) =>
    //   d.status == "L" ? 1 : d.status == "N" ? 1 : 0.5
    // );

    //   append the left antenae
    g.append("path")
      .attr("id", "left-antenae")
      .attr(
        "d",
        "M72.5822 21.4746C76.5534 24.1985 79.7902 27.486 82.2113 31.1992C86.501 37.8633 88.4205 44.9841 88.5329 50.6536C88.6122 51.7064 88.5772 52.5353 88.5701 53.1024C88.5611 53.6711 88.5566 53.9742 88.5566 53.9742C88.5566 53.9742 88.6108 53.6762 88.7121 53.117C88.8123 52.5567 88.9842 51.7341 89.079 50.6688C89.7575 42.9739 87.8137 35.6831 84.2729 29.8849C81.8512 25.8918 78.2475 22.0832 74.2728 19.2172C70.7047 16.6108 66.9965 13.5585 67.7069 9.02663C68.3894 4.96524 73.2655 4.54387 75.3934 6.95795C77.1272 8.83035 76.4524 12.0146 74.3028 13.7545C72.7157 15.0313 71.3493 14.7972 71.3948 14.8582C71.3569 14.7771 72.6496 15.2883 74.6155 14.2061C77.8427 12.1253 78.5052 8.31607 76.6147 5.94126C73.5444 2.06428 66.4867 2.6517 65.2965 8.59679C64.2908 14.4046 68.3846 18.2181 72.5822 21.4746Z"
      )
      .attr("fill", (d) => (d.status == "L" ? "#C2DBE1" : "#F25445"));
    //   if low hide
    // .attr("fill-opacity", (d) =>
    //   d.status == "L" ? 1 : d.status == "N" ? 1 : 0.5
    // );

    //   append the right antenae
    g.append("path")
      .attr("id", "right-bud")
      .attr(
        "d",
        "M92.3843 53.1527C92.4822 53.7166 92.5344 54.0177 92.5344 54.0177C92.5344 54.0177 92.5316 53.7118 92.5263 53.1385C92.5226 52.5664 92.4924 51.731 92.5793 50.6705C92.723 45.1598 94.5968 37.9851 99.0583 31.1586C101.512 27.4513 104.78 24.1818 108.768 21.4859C113.049 18.2099 117.133 14.4834 116.152 8.59255C115.554 5.51255 113.314 3.63845 110.739 3.39896C105.981 2.93919 102.022 6.99663 103.949 11.2953C104.584 12.8217 105.661 13.7972 106.599 14.4134C108.633 15.5628 110.021 15.0497 109.977 15.1307C110.028 15.07 108.568 15.3061 106.913 13.9627C106.118 13.3142 105.3 12.2865 104.949 10.9442C103.954 7.40331 107.053 4.79352 110.445 5.44957C112.189 5.74554 113.448 7.15337 113.74 9.01787C114.416 13.5817 110.674 16.6388 107.082 19.2254C103.089 22.0637 99.4538 25.854 96.9996 29.8411C94.5093 33.8584 93.1483 38.0949 92.447 41.7494C91.7173 45.4199 91.8602 48.551 92.0332 50.6846C92.1207 51.7575 92.2869 52.5873 92.3843 53.1527"
      )
      .attr("fill", (d) => (d.status == "L" ? "#C2DBE1" : "#F25445"));
    //   if low hide
    //   .attr("fill-opacity", (d) =>
    //     d.status == "L" ? 0 : d.status == "N" ? 1 : 0.5
    //   );

    //   append the thyroid
    g.append("path")
      .attr("id", "thyroid")
      .attr("d", `${thyroidPath}`)
      .attr("fill", (d) => (d.status == "L" ? "#F5F5F5" : "#F5F5F5"))
      .attr("opacity", 0.5);
    //   if low hide
    //   .attr("fill-opacity", (d) =>
    //     d.status == "L" ? 0 : d.status == "N" ? 1 : 0.5
    //   );

    // add the flowerSVg inside the g
  }, [dimensions, data]);

  return (
    <div
      id='flower-chart'
      className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'
    ></div>
  );
}
