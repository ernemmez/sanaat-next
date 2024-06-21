import { fetchAPI } from "@/app/[lang]/utils/fetch-service";
import { getPageBySlug } from "./get-page-by-slug";
import { getPageSlug, getPopulateParams } from "./getPopulateParams";

export async function getCollectionData(slug: string, lang: string, collectionPath?: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const path = collectionPath || `/topics`;
  const dynamicSlug = getPageSlug(path) ?? "";
  const urlParamsObject = { 
    locale: lang, 
    populate: getPopulateParams(path, lang),
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  
  const res = await fetchAPI(path, urlParamsObject, options);
  const matchingItem = res?.data?.find((item: { attributes: { slug: string; }; }) => item.attributes.slug === slug);
  const page = await getPageBySlug(dynamicSlug, lang);

  const parsedPage = {
    ...page,
    meta: {
        title: matchingItem?.attributes?.title,
        description: matchingItem?.attributes?.shortDesc,
        keywords: matchingItem?.attributes?.TopicKeywords,
    },
    matchingTopic: matchingItem
  }
    
  return matchingItem && parsedPage;
}
