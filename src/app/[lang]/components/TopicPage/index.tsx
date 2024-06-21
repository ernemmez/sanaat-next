"use client";
import React, { useEffect, useState } from "react";

import { TopicImage } from "./components/TopicImage";
import HighlightedText from "../HighlightedText";
import QuickTable from "./components/QuickTable";
import RichText from "../RichText";
import HightlightedTopics from "../HightlightedTopics";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCollectionData } from "../../utils/get-collection";
import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "../../utils/useIsMobile";

interface TopicPageProps {
  data: {
    pageData: {
        id: number;
        attributes: {
            title: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            TopicKeywords: string;
            slug: string;
            isBlogText: boolean;
            content: any[];
            shortDesc: string;
            CoverImage: any;
            QuickTable: [{
              title: string;
              content: [{ label: string; value: string }];
            }];
            createdBy: any;
            isCollectionItem: boolean;
            recomended_topics: any;
        };
    };
  };
}

const TopicPage: React.FC<TopicPageProps> = ({ data: { pageData: { attributes } } }) => {
  const [recommendedTopics, setRecommendedTopics] = useState<any>([]);
  const coverImagePath = attributes.CoverImage[0]?.coverImage?.data?.attributes?.url ?? "";
  const recommendedData = attributes.recomended_topics?.data ?? [];
  //@ts-ignore
  const author = attributes?.author?.data?.attributes;
  const isMobile = useIsMobile();

  const getAuthorTopics = () => {
    return author?.topics?.data?.filter((topic: any) => topic?.attributes?.isBlogText && topic?.attributes?.title !== attributes?.title) ?? [];
  }
  const authorTopics = getAuthorTopics();

  const getRecommendedData = async (slug: string) => {
      const result = await getCollectionData(slug, "tr", "/topics");
      
      return await result?.matchingTopic;
  };

  useEffect(() => {
      const fetchMuseumsData = async () => {
        const promises = recommendedData?.map((t: any )=> getRecommendedData(t?.attributes?.slug));
        const results = await Promise.all(promises);
        setRecommendedTopics(results);
      };
      
      fetchMuseumsData();
  }, [recommendedData]);

  return (
    <main className="my-12 px-8 lg:pr-24 mt-4">
      {coverImagePath && (
        <div className="mt-14">
          <TopicImage imgUrl={coverImagePath} imgDesc={attributes.CoverImage[0]?.desc} />
        </div>
      )}
      {attributes?.isBlogText ? (
        <div className="lg:w-2/3 m-auto mt-12 flex flex-col lg:flex-row justify-between lg:items-center w-full">
          <div>
            {attributes?.title && <HighlightedText text={attributes.title} tag="h1" className="text-4xl lg:text-5xl text-left" />}
            {!isMobile && attributes?.createdAt && <p className="text-[#747474] mt-1 text-xs">Yayınlanma Tarihi: {new Date(attributes.createdAt).toLocaleDateString("tr-TR")}</p>}
          </div>
          {author?.image?.data?.attributes?.url && (
            <Link href={`/sanaat-blog-yazarlari/${author?.slug}`} className="my-4 lg:my-2 flex justify-start items-center gap-2">
              <Image 
                src={`${getStrapiMedia(`${author?.image?.data?.attributes?.url}`)}`} 
                alt={`${author?.name} | Sanaat Blog`} 
                width={64} 
                height={64} 
                quality={50} 
                className="w-12 h-12 rounded-full drop-shadow-xl"
              />
              <div>
                <span>{author?.name}</span>
                {isMobile && attributes?.createdAt && <p className="text-[#747474] mt-1 text-xs">Yayınlanma Tarihi: {new Date(attributes.createdAt).toLocaleDateString("tr-TR")}</p>}
              </div>
            </Link>
          )}
        </div>
      ) : attributes?.title && <HighlightedText text={attributes.title} tag="h1" className="text-4xl lg:text-5xl text-center mt-12" />}
      {attributes?.QuickTable?.length > 0 && <QuickTable data={attributes.QuickTable} isCollectionItem={attributes?.isCollectionItem} />}
      {attributes?.content?.length > 0 && (
        <div className="lg:w-2/3 m-auto lg:mt-12">
          <RichText data={{ body: attributes.content}} />
        </div>
      )}
      {attributes?.isBlogText && authorTopics?.length > 0 && (
          <section className="lg:w-[77.5%] m-auto mb-20 lg:mb-0 lg:my-16">
            <HightlightedTopics data={{
                title: `${author?.name} Adlı Yazarın Diğer Yazıları`,
                isBlog: false,
                topics: {
                  data: authorTopics
                  }
                }}
              isTopicPage
            />
          </section>
      )}
      {recommendedTopics.length > 0 && (
          <section className="lg:w-[77.5%] m-auto mb-20 lg:mb-0 lg:my-16">
            <HightlightedTopics data={{
                title: "Önerilen Konulara Göz Atın",
                isBlog: false,
                topics: {
                  data: [...recommendedTopics]
                  }
                }}
              isTopicPage
            />
          </section>
      )}
    </main>
  );
};

export default TopicPage;
