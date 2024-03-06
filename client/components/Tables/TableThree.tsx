import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

interface Actionable {
  id: number;
}

interface TableData<T extends Actionable> {
  fields?: string[];
  data?: T[];
  action: boolean;
}

const TableThree = <T extends Actionable>(data: TableData<T>) => {
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
                {data.fields?.map((e, index) => (
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
              {data.data &&
                data.data.map((item, key) => (
                  <tr key={key}>
                    {Object.keys(item).map((property, index) => (
                      <td
                        key={index}
                        className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center"
                      >
                        <p className="text-black dark:text-white">
                          {/* {item[property as keyof T]} */}
                        </p>
                      </td>
                    ))}
                    {data.action ? (
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
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableThree;
