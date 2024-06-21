import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export const fetchNotBlogTopics = async () => {
  try {
    const res = await fetchAPI("/topics", { locale: "tr" }, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` } });
    const topics = await res.data?.filter((topic: { attributes: { isBlogText: boolean; }; }) => !topic.attributes.isBlogText);

    return topics;
  } catch (error) {
    console.error('An error occurred while fetching the blogs:', error);
    throw error;
  }
};

export const fetchBlogTopics = async () => {
  try {
    const res = await fetchAPI("/topics", { locale: "tr" }, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` } });
    const blogs = await res.data?.filter((topic: { attributes: { isBlogText: boolean; }; }) => topic.attributes.isBlogText);

    return blogs;
  } catch (error) {
    console.error('An error occurred while fetching the blogs:', error);
    throw error;
  }
};

export const fetchAuthors = async () => {
  try {
    const response = await fetchAPI("/authors", { locale: "tr" }, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` } });

    return response?.data;
  } catch (error) {
    console.error('An error occurred while fetching the blogs:', error);
    throw error;
  }
};

export const fetchSpesificTopic = async (slug: number) => {
  try {
    const res = await fetchAPI(`/topics/${slug}`, { locale: "tr" }, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` } });

    return res;
  } catch (error) {
    console.error('An error occurred while fetching the blogs:', error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const res = await fetchAPI(`/events/`, { locale: "tr" }, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}` } });

    return res;
  } catch (error) {
    console.error('An error occurred while fetching the blogs:', error);
    throw error;
  }
};