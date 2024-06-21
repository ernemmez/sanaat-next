"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import dayjs from 'dayjs';
import { TfiLocationPin } from "react-icons/tfi";
import { useIsMobile } from "../utils/useIsMobile";

interface HightlightedEventsProps {
    data: {
        title: string;
        desc: string;
        showAllUrl: string;
        events: {
            data: any[];
        };
    };
}

interface HightlightedEventCardProps {
    name: string;
    slug: string;
    imgUrl: string | null;
    shortDesc: string;
    ticketUrl?: string;
    startDate?: string;
    endDate?: string;
    visitStartTime?: string;
    visitEndTime?: string;
    address: string;
    notes: string;
}

const HightlightedEvenCard: React.FC<HightlightedEventCardProps> = ({
    name,
    slug,
    imgUrl,
    shortDesc,
    ticketUrl,
    startDate,
    endDate,
    visitStartTime,
    visitEndTime,
    address,
    notes
}) => {
    const isMobile = useIsMobile();

    const getCardContent = () => (
        <>
            <div className="rounded-tr-[50px] overflow-hidden border border-red">
                {imgUrl && (
                    <Image
                    src={imgUrl}
                    alt={name}
                    width={310}
                    height={158.5}
                    className="w-[410px] h-[220px]"
                    />
                )}
            </div>
            <div className="m-auto mt-3 lg:w-10/12 text-left lg:pl-8 flex-col justify-between w-full px-4 lg:px-0">
                <div className="font-semibold text-sanaat-red mb-1">{name}</div>
                {shortDesc && <p className="text-sm">{shortDesc}</p>}
                {(startDate && endDate) && (
                    <div className="text-sm mt-2">
                        <span className="font-semibold">Etkinlik Zamanı: </span>
                        {dayjs(startDate).format('DD.MM.YYYY')} - {dayjs(endDate).format('DD.MM.YYYY')}
                    </div>
                )}
                {(visitStartTime && visitEndTime) && (
                    <div className={`text-sm ${(!startDate && !endDate) && 'mt-2'}`}>
                        <span className="font-semibold">Ziyaret Saatleri: </span>
                        {dayjs(`1970-01-01T${visitStartTime}`).format('HH:mm')} - 
                        {dayjs(`1970-01-01T${visitEndTime}`).format('HH:mm')}
                    </div>
                )}
                {notes && (
                    <p className="text-sm mt-2 pr-1">
                        {notes}
                    </p>
                )}
                {address && (
                    <p className="text-sm mt-3 mb-3 lg:mb-0 lg:mt-4 text-[#71706F] flex">
                        <TfiLocationPin className="mt-[1px]" /> {address}
                    </p>
                )}
            </div>
        </>
    );

    const parentClass = `transition transform lg:hover:scale-105 py-4 lg:px-2 lg:py-0 lg:px-0 mt-4 lg:mt-0 bg-[#D9D9D926] inline-block lg:inline-flex rounded-tr-[50px] rounded-bl-[50px] lg:shadow-md lg:hover:shadow-lg overflow-hidden lg:w-[750px] cursor-pointer pt-0 lg:pl-0`;

    return ticketUrl ? (
        <a href={ticketUrl} className={parentClass}>
            {getCardContent()}
        </a>
    ) : (
        <div className={parentClass}>
            {getCardContent()}
        </div>
    );
};

export default function HightlightedEvents({ data }: HightlightedEventsProps) {
    const events = data?.events?.data;

    const settings = {
        dots: true,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        focusOnSelect: false,
        centerMode: false,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                }
            },
        ]
    };

    return (
        <section className="my-12 lg:ml-32 lg:mt-16 py-2 lg:pr-24 highlighted-events overflow-hidden px-8 lg:px-0">
            <div className="flex justify-between items-start">
                <HighlightedText
                text={data.title}
                tag="h2"
                className="text-3xl font-light leading-none"
                color="dark:text-white-400"
                />
            </div>
            {data.desc && <p className="text-md">{data.desc}</p>}
            <div className="lg:ml-1">
                {events?.map((event, index) => {
                        return (
                            <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
                            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                {(event?.attributes?.startDate && event?.attributes?.endDate) && (
                                   <>
                                        <span className="mt-2 font-light text-md title-font text-gray-300">Tarihler:</span>
                                        <span className="mt-1 text-gray-500 text-sm">
                                            {dayjs(event?.attributes?.startDate).format('DD.MM.YYYY')} - {dayjs(event?.attributes?.endDate).format('DD.MM.YYYY')}
                                        </span>
                                   </>
                                )}
                                {(event?.attributes?.visitStartTime && event?.attributes?.visitEndTime) && (
                                   <>
                                        <span className="mt-2 font-light text-md title-font text-gray-300">Ziyaret Saatleri:</span>
                                        <span className="mt-1 text-gray-500 text-sm">
                                            {dayjs(event?.attributes?.startDate).format('DD.MM.YYYY')} - {dayjs(event?.attributes?.endDate).format('DD.MM.YYYY')}
                                        </span>
                                   </>
                                )}
                                {event?.attributes?.address && (
                                    <>
                                        <span className="mt-2 font-light text-md title-font text-gray-300">Adres:</span>
                                        <p className="text-sm mt-2 text-gray-500 flex">
                                            {event?.attributes?.address}
                                        </p>
                                    </>
                                )}
                                {event?.attributes?.notes && (
                                    <>
                                        <span className="mt-2 font-light text-md title-font text-gray-300">Notlar:</span>
                                        <p className="text-sm mt-2 lg:pr-1 text-gray-500 max-w-[70%] lg:max-w-full">
                                            {event?.attributes?.notes}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="md:flex-grow">
                                <h2 className="text-2xl font-light title-font mb-2">{event?.attributes?.name}</h2>
                                <p className="text-md leading-relaxed">{event?.attributes?.description}</p>
                                {event?.attributes?.ticketUrl && (
                                    <a href={`${event?.attributes?.ticketUrl}?ref=sanaat.org`} referrerPolicy="origin" target="_blank" className="bg-white font-normal text-sanaat-black py-[5px] px-[12px] mt-6 rounded-2xl inline-flex justify-between items-center hover:scale-105 transition-all">
                                        Etkinliği Gör
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                )}
                            </div>
                            </div>
                        )
                })}
            </div>
        </section>
    );
}
