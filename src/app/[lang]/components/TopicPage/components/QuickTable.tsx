"use client";
import React from "react";

interface QuickTableProps {
  data: [{
    title: string;
    content: { label: string; value: string }[];
  }];
  isCollectionItem?: boolean
}

const QuickTable: React.FC<QuickTableProps> = ({ data, isCollectionItem }) => {
  const [openTab, setOpenTab] = React.useState<number>(0);

  return (
    <div className="lg:w-1/2 m-auto my-8 flex flex-col gap-6 mb-12">
      {isCollectionItem && <h1 className="text-2xl font-bold">Ayrıntılar</h1>}
      <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 w-full border-b md:border-b-0 md:border-r flex md:flex-row lg:flex-col overflow-x-auto text-md lg:text-base">
        {data?.map((item, index) => (
          <button
            key={index}
            className={`p-2 block text-left  cursor-pointer ${
              openTab === index ? "underline" : ""
            }`}
            onClick={() => setOpenTab(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
        <div className="w-3/4 p-2 md:pl-6 flex flex-col gap-3 text-md lg:text-base">
          {data[openTab]?.content.map((detail, idx) => (
            <div key={idx} className="text-sm">
              <span className="">{detail.label}:</span>
              <span> {detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickTable;
