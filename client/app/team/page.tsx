"use client";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Image from "next/image";
import api from "@/config/instance/axiosInstance";
import { TeamModel } from "@/models/teams/TeamsModel";
import { useEffect, useState } from "react";
import DelModelBox from "@/components/ModelBox/DelModelBox";

const Card = ({ item }: { item: TeamModel }) => (
  <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-90 my-4">
    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 shadow-lg bg-clip-border rounded-xl h-80">
      <Image
        src={item.image}
        alt="profile-picture"
        layout="fill"
        style={{objectFit:"cover"}}
        className="rounded-xl"
        fill
      />
    </div>
    <div className="p-6 text-center">
      <h4 className="mb-2 text-2xl font-semibold leading-snug text-blue-gray-900">
        {item.name}
      </h4>
      <p className="text-base font-medium leading-relaxed text-blue-gray-700">
        {item.position}
      </p>
    </div>
    <div className="flex justify-center my-4  gap-4">
      <button className="text-blue-500 ">
        <EyeIcon className="h-6 w-6 hover:text-black	" />
      </button>
      <button className="text-blue-500 hover:underline">
        <PencilIcon className="h-6 w-6 hover:text-black	" />
      </button>
      <button className="h-6 w-6 " style={{ color: "red" }}>
        <TrashIcon className="h-5 w-5 text-red-500" />
      </button>
    </div>
  </div>
);

export default function ListProperty() {
  const [tableData, setTableData] = useState<TeamModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get("/team");
        setTableData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-center">
        {tableData.length ? (
          tableData.map((item, key) => <Card key={key} item={item} />)
        ) : (
          <p>No data found</p>
        )}
      </div>
      {/* <DelModelBox></DelModelBox> */}
    </>
  );
}
