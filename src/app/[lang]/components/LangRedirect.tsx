import HighlightedText from "./HighlightedText";
import Image from "next/image";
import Link from "next/link";
import { renderButtonStyle } from "../utils/render-button-style";

export default function LangRedirect() {
  return (
    <section className="">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
          <HighlightedText
            text="Bu Dil de içerik bulunmuyor."
            tag="h1"
            className="text-5xl font-bold leading-none sm:text-4xl mb-8"
            color="dark:text-white-400"
          />

          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link href="/" className={renderButtonStyle("primary")}>
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
