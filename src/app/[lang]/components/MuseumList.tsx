"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "../utils/useIsMobile";
import { getCollectionData } from "../utils/get-collection";

interface HightlightedTopicsProps {
    data: {
        title: string;
        desc?: string;
        showAllUrl?: string;
        cardType?: string;
        showAllButton?: boolean;
        isBlog: boolean;
        museums: {
        data: any[];
        };
    };
    isTopicPage?: boolean;
}

interface HightlightedTopicCardProps {
    title: string;
    slug: string;
    imgUrl: string | null;
    shortDesc: string;
    alignment?: "l" | "r";
    createdBy?: string;
}

export const HightlightedBlogCard: React.FC<HightlightedTopicCardProps> = ({
    title,
    slug,
    imgUrl,
    shortDesc,
}) => {

    return (
        <Link href={`/muzes/${slug}`} className="block relative mb-6 lg:mb-0 lg:w-1/4 h-[260px] text-shadow-2xl overflow-hidden rounded-md">
            <Image
                src={`${imgUrl}`}
                alt={title}
                width={346}
                height={460}
                quality={100}
                className="w-full h-full object-cover relative transition transform hover:scale-105"
            />
            <div className="font-[500] text-sm text-sanaat-black absolute top-4 left-4 flex items-center gap-3 bg-white pt-1 pl-1 pr-[6px] pb-[0.5px] text-center rounded-xl shadow-xl">
               12 Başlık
            </div>
            <div className="absolute bottom-0 pl-4 pb-3">
                {title && <div className="font-normal text-sanaat-text mb-2 top-4 left-4">{title}</div>}
                {shortDesc && <p className="text-sm">{shortDesc.length > 199 ? `${shortDesc.slice(0, 199)}...` : shortDesc}</p>}
            </div>
        </Link>
    )
};

export default function MuseumList({ data, isTopicPage }: HightlightedTopicsProps) {
    const [btnHover, setBtnHover] = useState<boolean>(false);
    const [museumsData, setMuseumsData] = useState<any>([]);
    const isMobile = useIsMobile();

    const getMuseum = async (slug: string) => {
        const result = await getCollectionData(slug, "tr", "/muzes");
        
        return await result?.matchingTopic;
    };

    useEffect(() => {
        const fetchMuseumsData = async () => {
          const promises = data?.museums?.data?.map(t => getMuseum(t?.attributes?.slug));
          const results = await Promise.all(promises);
          setMuseumsData(results);
        };
      
        fetchMuseumsData();
    }, [data?.museums?.data]);

    return (
        <section className={`my-12 ${!isTopicPage && 'px-8'} lg:pr-24`}>
            <div className="flex justify-between items-start">
                {data.title && (
                    <HighlightedText
                        text={data.title}
                        tag="h2"
                        className="text-3xl lg:text-4xl font-light leading-none mb-8"
                    />
                )}
                {(!isMobile && data.showAllButton) && (
                    <Link
                        href={`${data.showAllUrl}`}
                        onMouseOver={() => setBtnHover(true)}
                        onMouseOut={() => setBtnHover(false)}
                        className="text-semibold text-sm flex justify-between items-center gap-2 hover:text-sanaat-red hover:text-underline"
                    >
                        <span>Daha Fazla Gör</span>
                        <span className="mt-[-1.5px]">
                        <svg
                            width="9"
                            height="10"
                            viewBox="0 0 9 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M1 1L8 7.5L1 14"
                            stroke={btnHover ? "#DC3939" : "#2A2A2D"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </svg>
                        </span>
                    </Link>
                )}
            </div>
            {data.desc && <p className="text-md">{data.desc}</p>}
            <div className="flex flex-col lg:flex-row flex-wrap justify-start lg:gap-12 items-stretch">
                {museumsData?.map((museum: any, index: number) => {
                    return <HightlightedBlogCard key={index} title={museum?.attributes?.name} slug={museum?.attributes?.slug} imgUrl={getStrapiMedia(museum?.attributes?.coverImage?.data?.attributes?.url)} shortDesc={museum?.attributes?.shortDesc}  />
                })}            
            </div>
        </section>
    );
};
