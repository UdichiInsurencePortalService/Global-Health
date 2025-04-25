import React from "react";

export default function DepreciationCalculated({
  heading,
  para,
  tablehead,
  tablehead1,
  tableData,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-5">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <h1 className="fst-italic text-2xl font-bold text-center mb-4 text-gray-800">
          {heading}
        </h1>
        {Array.isArray(para)
          ? para.map(
              (text, index) =>
                text && (
                  <p
                    key={index}
                    className="text-gray-600 text-center mb-4 px-5"
                  >
                    {text}
                  </p>
                )
            )
          : para && (
              <p className="text-gray-600 text-center mb-4 px-5">{para}</p>
            )}

        <div className="overflow-x-auto">
          <table className="border-collapse mx-auto w-full md:w-auto">
            <thead>
              <tr className="bg-warning text-black text-left">
                <th className="border border-gray-300 px-5 py-4 text-center font-semibold text-gray-700">
                  {tablehead}
                </th>
                <th className="border border-gray-300 px-5 py-4 text-center font-semibold text-gray-700">
                  {tablehead1}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-5 py-4 text-start ">
                    {row.duration}
                  </td>
                  <td className="border border-gray-300 text-center">
                    {row.discount}
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
