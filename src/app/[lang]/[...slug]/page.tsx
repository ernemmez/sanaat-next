import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { Metadata } from "next";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
import { getCollectionData } from "../utils/get-collection";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

async function getPageData({ slug, lang }: Props['params']) {
  const staticPage = await getPageBySlug(slug, lang);
  const dynamicPage = await getCollectionData(slug[1], lang, `/${slug[0]}`);
  const isDynamic = staticPage.data.length === 0;

  return { page: isDynamic ? dynamicPage : staticPage, isDynamic };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { page, isDynamic } = await getPageData(props.params);

  if (!page.data[0]?.attributes?.seo) return FALLBACK_SEO;
  const metadata = isDynamic ? page.meta : page.data[0].attributes.seo;

  return {
    title: isDynamic ? metadata.title : metadata.metaTitle,
    // title: metadata.title?.includes(" | Sanaat") ? metadata.title : metadata.title.concat(" | Sanaat"),
    description: isDynamic ? metadata.description : metadata.metaDescription,
    keywords: metadata.keywords
  };
}

export default async function PageRoute(props: Props) {
  const { page, isDynamic } = await getPageData(props.params);

  if (page?.data?.length === 0) {
    return null;
  };

  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section: any, index: number) => {
    if (["layout.topic-page", "layout.muze-page", "layout.encyclopedia-page", "layout.author-page"].includes(section.__component)) {
      return sectionRenderer({ ...section, pageData: page.matchingTopic }, index);
    }

    return sectionRenderer(section, index);
  });
}