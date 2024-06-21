"use client";
import dayjs from "dayjs";
import React, { useState, useMemo } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { days, generateDate, months } from "../../utils/calendar";
import cn from "../../utils/calendar/cn";
import { useQuery } from "../../utils/fetcherQuery";
import { fetchEvents } from "../../utils/fetch-service";
import HighlightedText from "../HighlightedText";

export default function Calendar() {
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);
    const { responseData: eventsData } = useQuery<any>('getBlogs', fetchEvents);

    const events = eventsData?.data || [];

    // Group events by date
    const eventsByDate = useMemo(() => {
        const grouped: { [key: string]: any[] } = {};
        events.forEach((event: { attributes: { startDate: string | number | dayjs.Dayjs | Date | null | undefined; }; }) => {
            const dateKey = dayjs(event.attributes.startDate).format('YYYY-MM-DD');
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(event);
        });
        return grouped;
    }, [events]);

    const handleDateClick = (date: React.SetStateAction<dayjs.Dayjs>) => {
        setSelectDate(date);
    };

    const renderDateContent = () => (
        <div className="w-full">
                <HighlightedText
                    text={`${dayjs(selectDate).locale("tr").format("DD.MM.YYYY")} Tarihindeki Etkinlikler`}
                    tag="h2"
                    className="text-3xl font-light leading-2 line"
                    color="dark:text-white-400"
                />
                {eventsByDate[selectDate.format('YYYY-MM-DD')] && (
                    <div className="px-2 py-4 shadow-md">
                        {eventsByDate[selectDate.format('YYYY-MM-DD')].map((event: { attributes: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; address: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; startDate: string | number | dayjs.Dayjs | Date | null | undefined; endDate: string | number | dayjs.Dayjs | Date | null | undefined; visitStartTime: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; visitEndTime: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; ticketUrl: string | undefined; }; }, idx: React.Key | null | undefined) => {
                            const isLastItem = idx === eventsByDate[selectDate.format('YYYY-MM-DD')].length - 1;

                            return (
                                <div key={idx} className={`lg:py-8 flex flex-wrap lg:flex-nowrap mb-8 lg:mb-0 pb-8 lg:pb-0 ${isLastItem ? '' : 'border-b'} lg:border-none`}>
                                    <div className="lg:w-64 lg:mb-0 mb-6 flex-shrink-0 flex flex-col">
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
                                        {//@ts-ignore
                                        event?.attributes?.notes && (
                                            <>
                                                <span className="mt-2 font-light text-md title-font text-gray-300">Notlar:</span>
                                                <p className="text-sm mt-2 lg:pr-1 text-gray-500 max-w-[70%] lg:max-w-full">
                                                    {//@ts-ignore
                                                    event?.attributes?.notes}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <div className="lg:flex-grow w-full">
                                        <h2 className="text-2xl font-light title-font mb-2">{event?.attributes?.name}</h2>
                                        <p className="text-md leading-relaxed">{event?.attributes?.description}</p>
                                        {event?.attributes?.ticketUrl && (
                                            <a href={`${event?.attributes?.ticketUrl}?ref=sanaat.org`} referrerPolicy="origin" target="_blank" className="bg-white font-normal text-sanaat-black py-[5px] px-[12px] mt-6 rounded-2xl inline-flex justify-between items-center hover:scale-105 transition-all">
                                                Etkinliği Gör
                                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h24"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                {(!eventsByDate[selectDate.format('YYYY-MM-DD')] || eventsByDate[selectDate.format('YYYY-MM-DD')].length === 0) && (
                    <p className="text-gray-400 mt-4 italic">"Malesef bu tarih için herhangi bir etkinlik bulunamadı."</p>
                )}
        </div>
    );

    return (
        <main className="px-8 lg:px-24 py-12 overflow-hidden">
            <div className="w-full h-auto mb-12">
                    <div className="flex justify-between items-center">
                        <h2 className="select-none font-semibold">
                            {months[today.month()]}, {today.year()}
                        </h2>
                        <div className="flex gap-10 items-center">
                            <GrFormPrevious
                                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                onClick={() => {
                                    setToday(today.month(today.month() - 1));
                                }}
                            />
                            <h2
                                className="cursor-pointer hover:scale-105 transition-all"
                                onClick={() => {
                                    setToday(currentDate);
                                }}
                            >
                                Bugün
                            </h2>
                            <GrFormNext
                                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                onClick={() => {
                                    setToday(today.month(today.month() + 1));
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-7">
                        {days.map((day, index) => (
                            <h2
                                key={index}
                                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                            >
                                {day}
                            </h2>
                        ))}
                    </div>
                    <div className="grid grid-cols-7">
                        {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
                            const dateKey = date.format('YYYY-MM-DD');
                            const eventsOnDate = eventsByDate[dateKey] || [];
                            const hasEvents = eventsOnDate.length > 0;
                            return (
                                <div
                                    key={index}
                                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                                    onMouseEnter={() => hasEvents && setHoveredDate(dateKey)}
                                    onMouseLeave={() => setHoveredDate(null)}
                                >
                                    <div className="relative">
                                        <h2
                                            className={cn(
                                                currentMonth ? "" : "text-gray-400",
                                                today ? "bg-gray-500 text-white" : "",
                                                selectDate.toDate().toDateString() === date.toDate().toDateString()
                                                    ? "bg-black text-white"
                                                    : "",
                                                hasEvents ? "bg-sanaat-red text-white" : "",
                                                "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                            )}
                                            onClick={() => handleDateClick(date)}
                                        >
                                            {date.date()}
                                        </h2>
                                        {hoveredDate === dateKey && hasEvents && (
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1" style={{ zIndex: "2000"}}>
                                                <ul className="bg-black shadow-md rounded-md py-2 px-4 transition-all">
                                                    {eventsOnDate.slice(0, 3).map((event: { attributes: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }, idx: React.Key | null | undefined) => (
                                                        <li key={idx} className="transition-all py-1 px-2 my-1 rounded">
                                                            {event.attributes.name}
                                                        </li>
                                                    ))}
                                                    {eventsOnDate.length > 3 && <li className="transition-all py-1 px-2 my-1 rounded">....</li>}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            </div>
            {renderDateContent()}
        </main>
    );
}
