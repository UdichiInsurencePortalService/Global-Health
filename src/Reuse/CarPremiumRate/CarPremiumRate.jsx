
import React from "react";

export default function CarPremiumRate({
  heading,
  para,
  tablehead,
  tablehead1,
  tablehead2,
  tableData,
}) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-5 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <h1 className="italic text-2xl font-bold text-center mb-4 text-gray-800">
          {heading}
        </h1>
        <p className="text-center text-gray-600 mb-6 px-4">{para}</p>
        <div className="overflow-x-auto">
          <table className="border-collapse w-full md:w-auto mx-auto">
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
                  <tr key={index}>
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
