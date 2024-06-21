"use client";
import React, { useEffect, useState } from "react";
import HighlightedText from "../HighlightedText";
import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";
import { getCollectionData } from "../../utils/get-collection";
import { useIsMobile } from "../../utils/useIsMobile";
import HightlightedTopics from "../HightlightedTopics";

interface EncyclopediaPageProps {
  data: {
    pageData: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          desc: string;
          shortDesc: string;
          coverImage: {
            data: [{
              attributes: {
                url: string;
              }
            }]
          }
        };
    };
  };
}

const EncyclopediaPage: React.FC<EncyclopediaPageProps> = ({ data: { pageData: { attributes } } }) => {
  const [topics, setTopicsData] = useState<any>([]);
  const isMobile = useIsMobile();
  const coverImagePath = attributes.coverImage?.data[0]?.attributes?.url ?? "";

  const getEncyclopediTopics = async () => {
    const result = await getCollectionData(attributes?.slug, "tr", "/encyclopedias");

    return await result?.matchingTopic?.attributes?.topics ?? [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const promises = await getEncyclopediTopics();

      setTopicsData(promises?.data);
    };
  
    fetchData();
  }, [attributes?.slug]);

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
          {attributes?.desc && <p className="mt-4">{attributes?.desc}</p>}
        </div>
        {coverImagePath && !isMobile && (
          <div className="w-full lg:w-1/2">
            <Image src={`${getStrapiMedia(coverImagePath)}`} alt={`Sanaat | ${attributes.name}`} width={600} height={700} className='w-full rounded-md' />
          </div>
        )}
      </div>
      {topics?.length > 0 && (
        <section className="mb-20 lg:mb-0 lg:my-16">
          <HightlightedTopics data={{
              title: `${attributes.name} Ansiklopedisi Başlıkları`,
              isBlog: false,
              topics: {
                data: [...topics]
                }
              }}
            isTopicPage
          />
        </section>
      )}
    </main>
  );
};

export default EncyclopediaPage;
