import React from "react";
import Link from "next/link";

type SourceProps = {
  quotes: {
    id: number;
    text: string;
    reference: string;
  }[];
};

const Source: React.FC<SourceProps> = ({ quotes }) => {

  return (
    <div className="md:p-24 p-4 flex flex-col gap-6">
      <h1 className="text-5xl font-bold text-red-500">Kaynakça</h1>
      <p className="font-bold text-lg">Dipnotlar</p>
      <ul className="list-decimal px-5">
        {quotes.map((quote) => (
          <li key={quote.id}>
            {quote.text}
            <Link className="text-[#64d0bc]" href="/">
              {quote.reference}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Source;
