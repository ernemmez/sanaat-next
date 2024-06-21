import LangRedirect from "./components/LangRedirect";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { sectionRenderer } from "./utils/section-renderer";

export default async function RootRoute({ params }: { params: { lang: string } }) {
  try {
    const page = await getPageBySlug("home", params.lang);
    if (page.error && page.error.status == 401)
      throw new Error(
        "Missing or invalid credentials.",
      );

    if (page.data.length == 0 && params.lang !== "tr") return <LangRedirect />;
    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;

    return contentSections.map((section: any, index: number) => sectionRenderer(section, index));
  } catch (error: any) {
    throw new Error(
      "Missing or invalid credentials.",
    );
  }
}
