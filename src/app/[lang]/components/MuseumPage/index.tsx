"use client";
import React from "react";
import HighlightedText from "../HighlightedText";
import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";
import dayjs from "dayjs";
import { useIsMobile } from "../../utils/useIsMobile";
import HightlightedTopics from "../HightlightedTopics";

interface MuseumPageProps {
  data: {
    pageData: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          description: string;
          shortDesc: string;
          notes: string;
          visitStartTime: string;
          visitEndTime: string;
          googleMapsUrl: string;
          addressText: string;
          coverImage: {
            data: {
              attributes: {
                url: string;
              }
            }
          }
          topics: {
            data: any[];
          }
        };
    };
  };
}

const MuseumPage: React.FC<MuseumPageProps> = ({ data: { pageData: { attributes } } }) => {
  const isMobile = useIsMobile();
  const coverImagePath = attributes.coverImage?.data?.attributes?.url ?? "";

  return (
    <main className="my-12 px-8 lg:pr-24 mt-4">
      <div className="lg:flex justify-between items-start mt-16 lg:my-16 lg:px-24">
        {coverImagePath && isMobile && (
          <div className="w-full lg:w-1/2">
            <Image src={`${getStrapiMedia(coverImagePath)}`} alt={`Sanaat | ${attributes.name}`} width={600} height={700} className='w-full rounded-md' />
          </div>
        )}
        <div className="lg:w-1/3 text-left pt-12">
          {attributes?.name && <HighlightedText text={attributes.name} tag="h1" className="text-4xl  text-left" />}
          {attributes?.description && <p className="mt-4">{attributes?.description}</p>}
          <div className="mt-4">
            <HighlightedText text="Detaylar" tag="span" className="text-xl  text-left mb-4" />
            {attributes?.notes && (
              <p className="mt-2 text-gray-700">
                <span className="text-sanaat-red ">Adres: </span>
                {attributes?.addressText}
              </p>
            )}
            {(attributes?.visitStartTime && attributes?.visitEndTime) && (
              <div className="mt-2">
                <span className="text-sanaat-red ">Ziyaret Saatleri: </span>
                  {dayjs(`1970-01-01T${attributes?.visitStartTime}`).format('HH:mm')} - 
                  {dayjs(`1970-01-01T${attributes?.visitEndTime}`).format('HH:mm')}
              </div>
            )}
            {attributes?.notes && (
              <p className="mt-2 text-gray-700">
                <span className="text-sanaat-red ">Bilgi: </span>
                {attributes?.notes}
              </p>
            )}
        </div>
        </div>
        {coverImagePath && !isMobile && (
          <div className="w-full lg:w-1/2">
            <Image src={`${getStrapiMedia(coverImagePath)}`} alt={`Sanaat | ${attributes.name}`} width={600} height={700} className='w-full rounded-md' />
          </div>
        )}
      </div>
      {attributes?.googleMapsUrl && (
        <div className="w-full mt-8 lg:mt-0 pb-4 lg:px-24">
                <iframe
                  src={attributes?.googleMapsUrl}
                  width="200"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="w-full rounded-md"
                ></iframe>
        </div>
      )}
      {attributes?.topics?.data.length > 0 && (
        <section className="mb-20 lg:mb-0 lg:my-16">
          <HightlightedTopics data={{
              title: `${attributes.name} İle İlgili Konular`,
              isBlog: false,
              topics: {
                data: [...attributes?.topics?.data]
                }
              }}
            isTopicPage
          />
        </section>
      )}
    </main>
  );
};

export default MuseumPage;
