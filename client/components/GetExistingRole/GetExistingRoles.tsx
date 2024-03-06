"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ServerApi from "@/lib/instance/serverApiInstance";
import { RoleResponseObject } from "@/types/roles";
import { toast } from "react-toastify";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";

export default function GetExistingRoles() {
  const [tableData, setTableData] = useState<RoleResponseObject>({ data: [] });

  const fetchData = async (): Promise<void> => {
    try {
      const result: any = await ServerApi.get("/role/getAllRoles");
      if (result.data.status) {
        setTableData(result.data);

        // toast.success("Data fetched successfully!");
      } else {
        toast.error("error while fetching the data!");
      }
    } catch (error: any) {
      if (error.response.data.description)
        toast.error(error.response.data.description);
      else toast.error("Error while fetching data");
    }
  };

  const deleteRole = async (roleName: string): Promise<void> => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response: any = await ServerApi.delete(
            `role/deleteRoles/?roleName=${roleName}`
          );
          if (response.data.status) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            fetchData();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the file.",
              icon: "error",
            });
          }
        } catch (error: any) {
          Swal.fire({
            title: "Error!",
            text: `${error.response.data.description}`,
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-16">
        <div className="add-btn flex float-right">
          <Link href={"roles/add-roles"}>
            <button className="bg-transparent text-blue-700 font-semibold py-2 px-4 border bg-[#1C2434] hover:text-black">
              Add Roles
            </button>
          </Link>
          <div style={{ marginLeft: "10px" }}>
            <Link href={"roles/add-permission"}>
              <button className="bg-transparent text-blue-700 font-semibold py-2 px-4 border bg-[#1C2434] hover:text-black">
                Add Permissions
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-7">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex justify-between">
            <div>
              <h4 className="text-title-sm2 font-bold text-black dark:text-white">
                Top Channels
              </h4>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
              <div className="p-2.5 text-center xl:p-4">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Role Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-4">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Permission set
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-4">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Time of creation
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-4">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Time of creation
                </h5>
              </div>
            </div>

            {tableData.data.map((item, key) => (
              <div
                className={`grid grid-cols-4 sm:grid-cols-4 ${
                  key === tableData.data.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="font-medium text-black dark:text-white">
                    {item.role_name}
                  </p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="font-medium text-meta-5">
                    {item.permission_set}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="font-medium text-meta-3">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <div className="flex items-center space-x-2">
                      <TrashIcon
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          deleteRole(item.role_name);
                        }}
                      />
                      <Link href={`roles/${item.permission_set}/edit`}>
                        <PencilAltIcon className="w-6 h-6 cursor-pointer" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
