"use client";
import * as z from "zod";
// import { addMmemberSchema } from "@/zodSchema/addMember"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addMemberSchema } from "@/zodSchema/addMember";
import ServerApi from "@/lib/instance/serverApiInstance";

type FormData = z.infer<typeof addMemberSchema>;

export default function AddMemberForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({ resolver: zodResolver(addMemberSchema) });

  async function onSubmit(data: FormData): Promise<void> {
    try {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const file = data.image[0];
      const fileName = file.name;

      const imageUrl = `http://localhost:3000/${fileName}`;

      data.image = imageUrl;

      const result = await ServerApi.post(`/team/addMember`, data, { headers });

      console.log(result);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Team Member
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <div className="w-full ">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter Name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter Member name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.name && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.name?.message}
                </p>
              )}
            </div>
            <div className="w-full ">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter Positon <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("position", { required: true })}
                type="text"
                placeholder="Enter Member Position"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.position && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.position?.message}
                </p>
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter Department <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("department", { required: true })}
                type="text"
                placeholder="Enter Member Department"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.department && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.department?.message}
                </p>
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter Specialisation <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("specialisation")}
                type="text"
                placeholder="Enter Member Specialisation"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.specialisation && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.specialisation?.message}
                </p>
              )}
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter Email <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter Member Email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.email && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.email?.message}
                </p>
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter Languages <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("language")}
                type="text"
                placeholder="Enter Member Email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.language && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.language?.message}
                </p>
              )}
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Enter Linkedin <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("social_media", { required: true })}
                type="text"
                placeholder="Enter Member Linkedin"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />

              {errors?.social_media && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.social_media?.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Message
                <span className="text-meta-1">*</span>
              </label>
              <textarea
                {...register("about", { required: true })}
                rows={6}
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
              {errors?.about && (
                <p
                  style={{ color: "red" }}
                  className="text-red-600 text-sm mb-4"
                >
                  {errors?.about?.message}
                </p>
              )}
            </div>
            <div className="mb-6 ">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                  <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register("image", {
                    required: "Image is required", // Add a custom error message
                  })}
                  type="file"
                  name="image"
                  required 
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
                
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
