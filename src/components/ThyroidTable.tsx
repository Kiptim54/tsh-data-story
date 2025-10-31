import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import type { TData } from "./charts/LineChart";

export default function ThyroidTable() {
  const parseDate = d3.timeParse("%d/%m/%Y");
  const [data, setData] = useState<TData[]>([]);

  useEffect(() => {
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
            // colorStatus: tshLevel(Number(d.tsh)) || "hypo",
          };
        })
        .filter((d): d is TData => d !== null);

      setData(parsedData);
    });
  }, [parseDate]);
  return (
    <Table>
      {/* <TableCaption>Thyroid Lab Test Results.</TableCaption> */}
      <TableHeader className='bg-slate-200 rounded-md p-2 '>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>TSH</TableHead>
          <TableHead>FT3</TableHead>
          <TableHead>T4</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.date.toISOString()}>
            <TableCell className='font-medium'>
              {entry.date.toLocaleDateString()}
            </TableCell>
            <TableCell>{entry.tsh}</TableCell>
            <TableCell>{entry.t3}</TableCell>
            <TableCell>{entry.t4}</TableCell>
          </TableRow>
        ))}
        {/* <TableRow>
          <TableCell className='font-medium'>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className='text-right'>$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
}
