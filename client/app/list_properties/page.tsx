import api from "@/lib/instance/axiosInstance";
import { PropertyData } from "@/interfaces/listProperty";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

const headFields: string[] = [
  "Sr.No",
  "Property Ref. Number",
  "Property Type",
  "Action",
];

async function getData(): Promise<PropertyData[]> {
  try {
    const result = await api.get("/properties");
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function List_Property() {
  const tableData: PropertyData[] = await getData();
  
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr
                className="bg-gray-2 text-left dark:bg-meta-4"
                style={{ textAlign: "center" }}
              >
                {headFields.map((e, index) => (
                  <th
                    className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 text-center"
                    key={index}
                  >
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                    <p className="text-black dark:text-white">
                      {item.id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                    <p className="text-black dark:text-white">
                      {item.Property_Ref_No}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                    <p className="text-black dark:text-white">
                      {item.Property_Ref_No}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                    <div className="flex items-center justify-center space-x-3.5">
                      <button className="text-blue-500 hover:underline">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-blue-500 hover:underline">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                        style={{ color: "red" }}
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
