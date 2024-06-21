"use client";
import React from 'react'
import 'react-medium-image-zoom/dist/styles.css'
import Image from 'next/image'
import { getStrapiMedia } from "../../../utils/api-helpers";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface TopicImageProps {
  imgUrl: string;
  imgDesc: string;
}

export const TopicImage: React.FC<TopicImageProps> = ({ imgUrl, imgDesc }) => {
  const [zoom, setZoom] = React.useState<boolean>(false);

  const handleZoomChange = React.useCallback((shouldZoom: boolean) => {
    setZoom(shouldZoom);
  }, []);

  return (
    <div className="w-full lg:w-2/3 m-auto flex gap-2 flex-col items-center">
      <div className="w-full flex items-center justify-center border border-[#747474]">
        <ControlledZoom isZoomed={zoom} onZoomChange={handleZoomChange} wrapElement='div' classDialog='bg-black'>
          <Image src={`${getStrapiMedia(imgUrl)}`} alt={imgDesc} width={600} height={700} className='w-auto' />
        </ControlledZoom>
      </div>

      <div className="w-full flex md:gap-6 gap-1 flex-col md:flex-row items-start justify-between">
        <div></div>
        <p className="text-center md:max-w-[43.3%] max-w-full text-[#747474] text-[10px] lg:text-xs">
          {imgDesc}
        </p>
        <button
          className="md:block hidden"
          onClick={() => handleZoomChange(!zoom)}
        >
          <svg
            className="w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M9.00002 3.99998H4.00004L4 9M20 8.99999V4L15 3.99997M15 20H20L20 15M4 15L4 20L9.00002 20"
                stroke="#89898c"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};