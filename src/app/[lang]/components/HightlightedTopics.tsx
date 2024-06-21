"use client";
import React, { useState } from "react";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { EmblaOptionsType } from "embla-carousel";
import Carousel, { CarouselItem } from "./Carousel";

interface HightlightedTopicsProps {
    data: {
        title: string;
        desc?: string;
        showAllUrl?: string;
        cardType?: string;
        showAllButton?: boolean;
        isBlog: boolean;
        topics: {
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
    author?: {
        data: {
            attributes: {
                name: string;
                image: {
                    data: {
                        attributes: {
                            url: string;
                        }
                    }
                }
            }
        }
    };
    isBlogText?: boolean;
}

export const HightlightedTopicCard: React.FC<HightlightedTopicCardProps> = ({
    title,
    slug,
    imgUrl,
    shortDesc,
    isBlogText,
    author: sanaatAuthor
}) => {
    const author = sanaatAuthor?.data?.attributes;
    return (
        <Link href={`/topics/${slug}`} className="block relative w-full h-full text-shadow-2xl">
            <Image
                src={`${imgUrl}`}
                alt={title}
                width={346}
                height={460}
                quality={100}
                className="w-full h-full object-cover relative transition transform hover:scale-105"
            />
            <div className="font-light text-sanaat-text absolute top-4 left-4 flex items-center gap-3">
                {isBlogText && author && (
                    <Image src={`${getStrapiMedia(`${author?.image?.data?.attributes?.url}`)}`} alt={`${author?.name} | Sanaat Blog`} width={44} height={44} quality={50} className="w-10 h-10 rounded-full drop-shadow-xl" />
                )}
                {author && isBlogText ? author?.name : title}
            </div>
            <div className="absolute bottom-0 pl-4 pb-3">
                {isBlogText && <div className="font-normal text-sanaat-text mb-2 top-4 left-4">{title}</div>}
                {shortDesc && <p className="text-sm">{shortDesc.length > 199 ? `${shortDesc.slice(0, 199)}...` : shortDesc}</p>}
            </div>
        </Link>
    );
};

export default function HightlightedTopics({ data, isTopicPage }: HightlightedTopicsProps) {
    const topics = data.topics?.data;

    // const settings = {
    //     dots: true,
    //     infinite: false,
    //     lazyLoad: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     focusOnSelect: false,
    //     centerMode: false,
    //     responsive: [
    //         {
    //             breakpoint: 900,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 initialSlide: 1,
    //             }
    //         },
    //     ]
    // };

    const OPTIONS: EmblaOptionsType = { align: 'start' }

    return (
        <section className={`my-12 ${!isTopicPage && 'px-8'} lg:pr-24`}>
            <Carousel options={OPTIONS} title={data?.title} desc={data.desc} showAllUrl={data.showAllUrl}>
                {topics.map((topic, index) => {
                    const {
                        title,
                        slug,
                        CoverImage,
                        shortDesc,
                        isBlogText,
                        author
                    } = topic?.attributes;
                    const imgUrl = CoverImage ? getStrapiMedia(CoverImage[0]?.coverImage?.data?.attributes?.url) : "";

                    return (
                        <CarouselItem key={index} className="w-full lg:w-[346px] h-[460px] rounded-md overflow-hidden">
                            <HightlightedTopicCard 
                                title={title} 
                                slug={slug} 
                                imgUrl={imgUrl} 
                                shortDesc={shortDesc}
                                isBlogText={isBlogText}
                                author={author}
                            />
                        </CarouselItem>
                    )
                })}
            </Carousel>
        </section>
    );
}
