"use client";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "./../utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { categories } from "../../../../constants/categories";
import { fetchAuthors, fetchBlogTopics } from "../utils/fetch-service";
import { useQuery } from "../utils/fetcherQuery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel, { CarouselItem } from "./Carousel";

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

export const HightlightedBlogCard: React.FC<HightlightedTopicCardProps> = ({
    title,
    slug,
    imgUrl,
    shortDesc,
    author: sanaatAuthor
}) => {
    const author = sanaatAuthor?.data?.attributes;

    return (
        <Link href={`/topics/${slug}`} className="block relative w-[346px] h-[460px] text-shadow-2xl overflow-hidden rounded-md">
            <Image
                src={`${imgUrl}`}
                alt={title}
                width={346}
                height={460}
                quality={100}
                className="w-full h-full object-cover relative transition transform hover:scale-105"
            />
            <div className="font-light text-sanaat-text absolute top-4 left-4 flex items-center gap-3">
                {author?.image?.data?.attributes?.url && (
                    <Image src={`${getStrapiMedia(`${author?.image?.data?.attributes?.url}`)}`} alt={`${author?.name} | Sanaat Blog`} width={44} height={44} quality={50} className="w-10 h-10 rounded-full drop-shadow-xl" />
                )}
                {author?.name}
            </div>
            <div className="absolute bottom-0 pl-4 pb-3">
                {title && <div className="font-normal text-sanaat-text mb-2 top-4 left-4">{title}</div>}
                {shortDesc && <p className="text-sm">{shortDesc.length > 199 ? `${shortDesc.slice(0, 199)}...` : shortDesc}</p>}
            </div>
        </Link>
    );
};

export const HightlightedAuthorCard: React.FC<any> = ({
    title,
    slug,
    imgUrl,
    shortDesc,
    isBlogText,
    author: sanaatAuthor
}) => {
    const author = sanaatAuthor?.data?.attributes;
    return (
        <div className="block relative w-full h-full text-shadow-2xl">
            <Image
                src={`${imgUrl}`}
                alt={title}
                width={346}
                height={460}
                quality={100}
                className="w-full h-full object-cover relative transition transform hover:scale-105"
            />
            <div className="font-light text-sanaat-text absolute top-4 left-4 flex items-center gap-3">
                {isBlogText && (
                    <Image src={`${getStrapiMedia(`${author?.image?.data?.attributes?.url}`)}`} alt={`${author?.name} | Sanaat Blog`} width={44} height={44} quality={50} className="w-10 h-10 rounded-full drop-shadow-xl" />
                )}
                {isBlogText ? author?.name : title}
            </div>
            <div className="absolute bottom-0 pl-4 pb-3">
                {isBlogText && <div className="font-normal text-sanaat-text mb-2 top-4 left-4">{title}</div>}
                {shortDesc && <p className="text-sm">{shortDesc.length > 199 ? `${shortDesc.slice(0, 199)}...` : shortDesc}</p>}
            </div>
        </div>
    );
};

export default function BlogList({ data, isTopicPage }: HightlightedTopicsProps) {
    const [filteredBlogs, setFilteredBlogs] = useState<any>([]);
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const { responseData: blogsData } = useQuery<any>('getBlogs', fetchBlogTopics);
    const { responseData: authors } = useQuery<any>('getAuthors', fetchAuthors);

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredBlogs(blogsData);
        } else if (blogsData?.length > 0) {
            const currentCategory = categories[activeCategory].label;
            const filteredBlogDatas = blogsData.filter((blog: any) => {
                return blog?.attributes?.keywords?.includes(currentCategory);
            });
    
            setFilteredBlogs(filteredBlogDatas);
        }
    }, [activeCategory, blogsData]);

    return (
        <section className={`my-12 ${!isTopicPage && 'px-8'}`}>
            <div className="my-16 lg:px-24">
                <HighlightedText
                    text="Sanaat Blog Nedir?"
                    tag="h2"
                    className="text-3xl font-light text-pretty transition ease-curve-a duration-250 hover:text-btn-primary-base--hover"
                />
                <div className="mt-4">
                    <p className="mb-3">
                        Sanaat Blog, çeşitli disiplinlerde ve konularda Sanaat platformu yazarları tarafından oluşturulmuş blog yazılarından oluşan kapsamlı bir koleksiyonudur. Bu blog yazıları, sanat, tarih, kültür vb. çeşitli alanlarına odaklanarak geniş bir perspektif sunar ve siz okurlarımıza keyifli ve bilgilendirici içerikler sunar.
                    </p>
                    <p>
                        Sanaat Blog'da yer alan yazıları kategorilere göre filtreleyerek ilgi alanlarınıza uygun içeriklere kolayca ulaşabilirsiniz. Sanaat Blog, sizlere sanat ve kültür dünyasına dair en güncel ve en ilgi çekici içerikleri sunmayı hedefler.
                    </p>
                </div>
            </div>
            {authors?.length > 0 && (
                <section className={`my-12`}>
                    <Carousel options={{ align: 'start' }} title="Sanaat Blog Yazarları">
                        {authors.map((author: any, index: number) => {
                            return (
                                <CarouselItem key={index} className="w-full lg:w-[346px] h-[460px] rounded-md overflow-hidden">
                                    <HightlightedAuthorCard 
                                        title={author?.attributes?.name} 
                                        slug={author?.attributes?.slug} 
                                        imgUrl={`${getStrapiMedia(`${author?.attributes?.image?.data?.attributes?.url}`)}`} 
                                        shortDesc={author?.attributes?.about}       
                                        isBlogText={false}
                                    />
                                </CarouselItem>
                            )
                        })}
                    </Carousel>
                </section>
            )}
            <div className="flex justify-between items-start lg:mt-32 mb-4 lg:px-24">
                <HighlightedText
                    text="Sanaat Blog"
                    tag="h2"
                    className="text-3xl font-light text-pretty transition ease-curve-a duration-250 hover:text-btn-primary-base--hover"
                />
                {data.desc && <p className="text-md">{data.desc}</p>}
            </div>
            <div className="flex justify-between items-start mt-8 mb-4 lg:px-24">
                <HighlightedText
                    text={categories[activeCategory].label === "Genel" ? "Tüm Blog Yazıları" : `${categories[activeCategory].label} Blog Yazıları`}
                    tag="h3"
                    className="text-xl lg:text-2xl font-light text-pretty transition ease-curve-a duration-250 hover:text-btn-primary-base--hover"
                />
               <label className="flex justify-start items-start relative lg:gap-4" htmlFor="underline_select">
                    <select 
                        id="underline_select" 
                        value={activeCategory} 
                        onChange={(e) => setActiveCategory(Number(e.target.value))}
                        className="text-sm block px-0 w-[85px] lg:w-[130px] text-gray-500 pb-0.5 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={index}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 left-[63px] bottom-2 flex items-center px-2">
                        <svg className="h-4 w-4" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
               </label>
            </div>
            <div className="flex flex-col lg:flex-row flex-wrap justify-start items-stretch gap-10 lg:px-24">
                {filteredBlogs?.length > 0 ? filteredBlogs.map((blog: any, index: number) => {
                    return (
                        <HightlightedBlogCard 
                            key={index} 
                            title={blog?.attributes?.title} 
                            slug={blog?.attributes?.slug} 
                            imgUrl={getStrapiMedia(blog?.attributes?.CoverImage[0]?.coverImage?.data?.attributes?.url)} 
                            shortDesc={blog?.attributes?.shortDesc}
                            author={blog?.attributes?.author}
                        />
                    )
                }) : <div className="italic m-auto my-24">Üzgünüz, şu an bu kategoride blog yazısı bulunmamaktadır.</div>}                
            </div>
        </section>
    );
};
