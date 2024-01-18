"use client";
import React, { ReactNode } from "react";
import ChartThree from "../Charts/PieChart";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

interface OutpuDataStructure {
  title: string;
  total: string;
}

const data: OutpuDataStructure[] = [
  {
    title: "string",
    total: "88238",
  },
  {
    title: "string",
    total: "88238",
  },
  {
    title: "string",
    total: "88238",
  },
  {
    title: "string",
    total: "88238",
  },
  {
    title: "string",
    total: "88238",
  },
  {
    title: "string",
    total: "88238",
  },
  {
    title: "string",
    total: "88238",
  },
];

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
        {data.map((e, index) => (
          <CardDataStats key={index} title={e.title} total={e.total} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
        <ChartThree />
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
