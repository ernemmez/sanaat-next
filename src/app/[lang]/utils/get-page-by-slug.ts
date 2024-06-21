import { fetchAPI } from "@/app/[lang]/utils/fetch-service";

export async function getPageBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const path = `/pages`;
  const urlParamsObject = { filters: { slug }, locale: lang };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const res = await fetchAPI(path, urlParamsObject, options);

  return res;
}
