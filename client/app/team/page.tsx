"use client";
import Image from "next/legacy/image";
import { TeamModel } from "@/models/teams/TeamsModel";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "@/components/ModelBox/DelModelBox";
import Link from "next/link";
import ServerApi from "@/lib/instance/serverApiInstance";
import ErrorModal from "@/components/ModelBox/ErrorModelBox";
import api from "@/lib/instance/axiosInstance";

export default function ListProperty() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [tableData, setTableData] = useState<TeamModel[]>([]);

  const [idToDel, setidToDel] = useState<number>();

  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const result = await api.get("/team");
      setTableData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  async function handleDelete(): Promise<boolean> {
    try {
      setError(false);

      interface ResultObj {
        data: {
          status: boolean;
          message: string;
        };
      }
      let data: ResultObj = await ServerApi.delete(`/team/delete/${idToDel}`);

      if (data.data.status) {
        fetchData();
        return true;
      } else {
        setError(false);
        return false;
      }
    } catch (error) {
      setError(true);
      return false;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="add-btn">
        <Link href={"team/addMember"}>
          <button className="bg-transparent text-blue-700 font-semibold  py-2 px-4 border bg-[#1C2434] hover:text-black float-right">
            ADD TEAM MEMBER
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-center mt-10 w-full max-w-screen-xl mx-auto">
        {tableData.length ? (
          tableData.map((item, key) => (
            <div
              className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-90 my-4"
              key={key}
            >
              <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 shadow-lg bg-clip-border rounded-xl h-80">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt="profile-picture"
                    layout="fill"
                    className="rounded-xl"
                    priority
                  />
                ) : (
                  <span>No image available</span>
                )}
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
                <Link href={`team/${item.id}`}>
                  <button className="text-blue-500">
                    <EyeIcon className="h-6 w-6 hover:text-black" />
                  </button>
                </Link>
                <Link href={`team/${item.id}/edit`}>
                  <button className="text-blue-500 hover:underline">
                    <PencilIcon className="h-6 w-6 hover:text-black	" />
                  </button>
                </Link>
                <button
                  className="h-6 w-6 "
                  style={{ color: "red" }}
                  onClick={(e) => {
                    setidToDel(item.id);
                    setModalOpen(true);
                  }}
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
      <ErrorModal
        isOpen={error}
        errorMessage={"Error While Deleting TEAM Member"}
      ></ErrorModal>
    </>
  );
}
