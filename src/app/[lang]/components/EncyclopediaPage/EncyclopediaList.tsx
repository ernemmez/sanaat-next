"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HighlightedText from "../HighlightedText";
import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { getCollectionData } from "../../utils/get-collection";
import ListingTab from "../ListingTab";
import { categories } from "../../../../../constants/categories";

interface HightlightedTopicsProps {
    data: {
        title: string;
        desc?: string;
        showAllUrl?: string;
        cardType?: string;
        showAllButton?: boolean;
        isBlog: boolean;
        encyclopedias: {
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
    length: number;
}

export const HightlightedBlogCard: React.FC<HightlightedTopicCardProps> = ({
    title,
    slug,
    imgUrl,
    shortDesc,
    createdBy,
    length
}) => {

    return (
        <Link href={`/encyclopedias/${slug}`} className="block relative w-[346px] h-[460px] text-shadow-2xl overflow-hidden rounded-md">
            <Image
                src={`${imgUrl}`}
                alt={title}
                width={346}
                height={460}
                quality={70}
                className="w-full h-full object-cover relative transition transform hover:scale-105"
                placeholder="blur"
            />
            <div className="font-[500] text-sm text-sanaat-black absolute top-4 left-4 flex items-center gap-3 bg-white pt-1 pl-1 pr-[6px] pb-[0.5px] text-center rounded-xl shadow-xl">
               {length} Başlık
            </div>
            <div className="absolute bottom-0 pl-4 pb-3">
                {title && <div className="font-normal text-sanaat-text mb-2 top-4 left-4">{title}</div>}
                {shortDesc && <p className="text-sm">{shortDesc.length > 199 ? `${shortDesc.slice(0, 199)}...` : shortDesc}</p>}
            </div>
        </Link>
    )
};

export default function EncyclopediaList({ data, isTopicPage }: HightlightedTopicsProps) {
    const [encyclopediasData, setEncyclopediasData] = useState<any>([]);
    const [filteredEncyclopediasData, setFilteredEncyclopediasData] = useState<any>([]);
    const [activeCategory, setActiveCategory] = useState<number>(0);

    const getEncyclopedia = async (slug: string) => {
        const result = await getCollectionData(slug, "tr", "/encyclopedias");
        
        return await result?.matchingTopic;
    };

    useEffect(() => {
        const fetchMuseumsData = async () => {
          const promises = data?.encyclopedias?.data?.map(t => getEncyclopedia(t?.attributes?.slug));
          const results = await Promise.all(promises);
          setEncyclopediasData(results);
        };
      
        fetchMuseumsData();
    }, [data?.encyclopedias?.data]);

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredEncyclopediasData(encyclopediasData);
        } else if (encyclopediasData.length > 0) {
            const currentCategory = categories[activeCategory].label.toLocaleLowerCase();
            const filteredEncyclopedias = encyclopediasData.filter((encyclopedia: any) => 
                encyclopedia?.attributes?.keywords?.includes(currentCategory)
            );
    
            setFilteredEncyclopediasData(filteredEncyclopedias);
        }
    }, [activeCategory, encyclopediasData]);

    return (
        <section className={`my-12 ${!isTopicPage && 'px-8'} lg:px-24`}>
            <div className="my-16">
                <HighlightedText
                    text="Sanaat Ansiklopedi Nedir?"
                    tag="h2"
                    className="text-3xl font-light text-pretty transition ease-curve-a duration-250 hover:text-btn-primary-base--hover"
                />
                <div className="mt-4">
                    <p className="mb-3">
                        Sanaat Ansiklopedi, çeşitli disiplinlerde ve konularda Sanaat platformu yazarları tarafından oluşturulmuş makaleler ve rehberlerden oluşan kapsamlı bir yazı koleksiyonudur. Bu ansiklopediler, sanat, tarih, kültür vb. çeşitli alanlarına odaklanarak geniş bir perspektif sunar ve siz okurlarımıza derinlemesine bilgi ve kılavuzluk sağlar.
                    </p>
                    <p>
                        Her bir makale ve rehber, uzmanlık alanlarında derinlemesine araştırma ve analizlerle oluşturulmuş bilgi birikimini yansıtmaktadır. Sanat Ansiklopedileri, sanatseverler, öğrenciler ve araştırmacılar için kaynak bir başvuru noktası olmayı amaçlamaktadır.
                    </p>
                </div>
            </div>
            <div className="w-full m-auto my-16">
                <ListingTab activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </div>
            <div className="flex justify-between items-start mt-8 mb-4">
                <HighlightedText
                    text={categories[activeCategory].label === "Genel" ? "Tüm Ansiklopediler" : `${categories[activeCategory].label} Ansiklopedileri`}
                    tag="h2"
                    className="text-3xl font-light text-pretty transition ease-curve-a duration-250 hover:text-btn-primary-base--hover"
                />
                {data.desc && <p className="text-md">{data.desc}</p>}
            </div>
            <div className="flex flex-col lg:flex-row flex-wrap justify-start items-stretch gap-10">
                {filteredEncyclopediasData?.length > 0 ? filteredEncyclopediasData?.map((encyclopedia: any, index: number) => {
                    const imageUrl = encyclopedia?.attributes?.coverImage?.data && encyclopedia.attributes.coverImage.data.length > 0
                    ? getStrapiMedia(encyclopedia.attributes.coverImage.data[0]?.attributes?.url)
                    : "";
                    return (
                        <HightlightedBlogCard 
                            key={index} 
                            title={encyclopedia?.attributes?.name} 
                            slug={encyclopedia?.attributes?.slug} 
                            imgUrl={imageUrl} 
                            shortDesc={encyclopedia?.attributes?.shortDesc}
                            length={filteredEncyclopediasData?.length}
                        />
                    )
                }) : <div className="italic m-auto my-24">Üzgünüz, şu an bu kategoride ansiklopedi bulunmamaktadır.</div>}                
            </div>
        </section>
    );
};
