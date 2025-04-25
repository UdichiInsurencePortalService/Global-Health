import React from "react";

export default function ElectricCarRate({
  heading,
  para,
  tablehead,
  tablehead1,
  tablehead2,
  tableData,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-5">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <h1 className="italic text-2xl font-bold text-center mb-4 text-gray-800">
          {heading}
        </h1>

        {Array.isArray(para) &&
          para.map((text, index) => (
            <p key={index} className="text-gray-600 text-center mb-4 px-5">
              {text}
            </p>
          ))}

        <div className="overflow-x-auto">
          <table className="border-collapse w-full mx-auto">
            <thead>
              <tr className="bg-warning text-black">
                <th className="border border-gray-300 px-5 py-4 text-center font-semibold text-gray-700">
                  {tablehead}
                </th>
                <th className="border border-gray-300 px-5 py-4 text-center font-semibold text-gray-700">
                  {tablehead1}
                </th>
                <th className="border border-gray-300 px-5 py-4 text-center font-semibold text-gray-700">
                  {tablehead2}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableData) &&
                tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "hover:bg-gray-50"
                        : "bg-gray-50 hover:bg-gray-100"
                    }
                  >
                    <td className="border border-gray-300 px-6 py-4 text-start">
                      {row.capacity}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-center">
                      {row.oldPremium}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-center font-medium text-blue-700">
                      {row.newPremium}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
