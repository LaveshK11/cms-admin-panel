"use client";
import React from "react";
import {
  AddPermissionForm,
  permissionFromSchemaObj,
} from "@/zodSchema/addPermission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SwitcherThree from "../Switchers/SwitcherThree";
import { toast } from "react-toastify";
import ServerApi from "@/lib/instance/serverApiInstance";

export default function AddPermissionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    control,
  } = useForm<AddPermissionForm>({
    resolver: zodResolver(permissionFromSchemaObj),
  });

  async function onSubmit(data: AddPermissionForm): Promise<void> {
    try {
      const result: any = await ServerApi.post(
        `permission/createPermission`,
        data
      );

      if (result.data.status) {
        toast.success(result.data.message);
        reset();
      } else {
        toast.error(result.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.description);
    }
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Role</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="p-6.5">
            <div className="w-full ">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter permission set name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("permission_setName", { required: true })}
                type="text"
                placeholder="Enter permission set name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.permission_setName && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.permission_setName?.message}
                </p>
              )}

              <div className="flex justify-between pt-3 pb-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Can view all permission
                </label>
                <SwitcherThree name={"getAllPermission"} control={control} />
              </div>

              <div className="flex justify-between pt-3 pb-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Can delete roles
                </label>
                <SwitcherThree name={"delete_user"} control={control} />
              </div>
              <div className="flex justify-between pt-3 pb-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Can create user
                </label>
                <SwitcherThree name={"create_user"} control={control} />
              </div>
              <div className="flex justify-between pt-3 pb-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Can create roles
                </label>
                <SwitcherThree name={"createRoles"} control={control} />
              </div>
              <div className="flex justify-between pt-3 pb-3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Can create permission
                </label>
                <SwitcherThree name={"createPermissions"} control={control} />
              </div>
            </div>
            <button
              disabled={isSubmitting && isValid}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              ADD Member
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
