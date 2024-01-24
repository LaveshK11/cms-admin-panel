"use client";
import { useEffect, useState } from "react";
import api from "@/lib/instance/axiosInstance";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TeamAttributes, TeamModel } from "@/models/teams/TeamsModel";

interface GetParams {
  params: {
    memberId: string;
  };
}

export default function EditTeamPage(params: GetParams) {
  const [tableData, setTableData] = useState<TeamAttributes>({
    name: "",
    position: "",
    department: "",
    specialisation: "",
    image: "",
    social_media: "",
    about: "",
    language: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(`/team/${params.params.memberId}`);
        setTableData(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.params.memberId]);

  return (
    <>
      <Breadcrumb pageName="Profile" />
      {tableData ? (
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            {tableData.image ? (
              <Image
                src={tableData.image}
                alt="profile cover"
                className="object-cover object-center h-full w-full"
                width={160}
                height={160}
                priority
              />
            ) : (
              <span>No image available</span>
            )}
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full overflow-hidden">
              <div className="relative z-20 h-full w-full rounded-full">
                {tableData.image ? (
                  <Image
                    src={tableData.image}
                    alt="profile cover"
                    className="object-cover object-center h-full w-full"
                    width={160}
                    height={160}
                    priority
                  />
                ) : (
                  <span>No image available</span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {tableData.name}
              </h3>
              <p className="font-medium">
                <span className="font-bold">Position:</span> {tableData.position}
              </p>
              <p className="font-medium">
                <span className="font-bold">Department:</span> {tableData.department}
              </p>
              <div className="mt-6.5">
                <div className="mx-auto mt-4.5 mb-5.5 max-w-94 h-[min-content] rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F] flex justify-center items-center">
                  <div className="flex flex-col justify-center gap-1 xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">Languages:</span>
                  </div>
                  <div className="flex xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white flex flex-row ml-1">
                      {tableData.language}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6.5">
                <div className="mx-auto mt-4.5 mb-5.5 max-w-94 h-[min-content] rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F] flex justify-center items-center">
                  <div className="flex flex-col justify-center gap-1 xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">Email:</span>
                  </div>
                  <div className="flex xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white flex flex-row ml-1">
                      {tableData.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6.5">
                <div className="mx-auto mt-4.5 mb-5.5 max-w-94 h-[min-content] rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F] flex justify-center items-center">
                  <div className="flex flex-col justify-center gap-1 xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">Linkedin: </span>
                  </div>
                  <div className="flex xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white flex flex-row ml-1">
                      {tableData.social_media}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  About Me
                </h4>
                <p className="mt-4.5">{tableData.about}</p>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <p>No data Found</p>
      )}
    </>
  );
}
