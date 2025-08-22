import { useEffect, useState } from "react";
import * as d3 from "d3";
import "../style.css";

// COMPONENTS
import Flower, { type TData } from "./charts/Flower";

export default function Flowers() {
  const [data, setData] = useState<TData[]>([]);

  useEffect(() => {
    d3.csv("src/assets/data/thyroid-tests.csv").then((data) => {
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
  console.log({ data });
  return (
    <div className='p-10 md:p-16 container mx-auto'>
      <div className='flex flex-col gap-1.5'>
        <h3 className='font-semibold text-2xl text-secondary-400 font-lora'>
          Using flowers to show the progress of my thyroid hormones progress
          (T3, T4, TSH):{" "}
        </h3>
        <p className='font-lora text-lg w-3/4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod veniam
          esse eius id deleniti. Expedita maxime laborum et assumenda quis
          officia optio dolorum beatae laboriosam, unde autem facilis obcaecati
          quam atque mollitia.
        </p>
      </div>

      <div className='grid  gap-4 py-10'>
        <Flower />
      </div>
    </div>
  );
}
