"use client";

import React, { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface IJumbotronProps {
  data: {
    id?: string;
    Title: string;
    image: Picture;
    searchFormVisibilty: boolean;
    desc: string;
  };
}

const Jumbotron: React.FC<IJumbotronProps> = ({ data: { Title, image, searchFormVisibilty, desc } }) => {
  const imgUrl = getStrapiMedia(image.data.attributes.url);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setPlaceholderVisible(!placeholderVisible);
  };

  return (
    <section
      className="w-full m-auto h-96 lg:h-[750px] text-center flex flex-col justify-between items-center gap-8 mt-[55px] shadow-custom relative text-shadow-5xl"
    >
      <Image
        src={`${imgUrl}`}
        alt={Title}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-10 blur-[1.2px] lg:blur-0"
        quality={100}
      />
      <div className="z-20 mt-24 lg:mt-64 p-4">
        <h1 className="text-[38px] lg:text-6xl font-light text-white">{Title}</h1>
        {desc && <p className="text-white m-auto text-md lg:mt-10 lg:text-xl w-2/3 text-shadow">{desc}</p>}
        <div className="relative lg:w-3/12">
            {searchFormVisibilty && (
             <>
                <button type="submit" className="absolute left-4 top-3 lg:top-4 mr-4">
                  <MagnifyingGlassIcon className="h-5 w-5 lg:h-7 lg:w-7 text-gray-100" aria-hidden="true" />
                </button>
                <input
                  onFocus={handleFocus}
                  onBlur={handleFocus}
                  type="search"
                  name="search"
                  placeholder={placeholderVisible ? "Koleksiyon Ara" : ""}
                  className="bg-transparent border border-gray-100 text-center h-10 lg:h-16 px-5 pr-10 rounded-full text-sm lg:text-xl focus:outline-none w-full text-gray-100 placeholder-gray-100"
                />
             </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
