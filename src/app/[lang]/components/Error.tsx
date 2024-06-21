import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "../utils/api-helpers";

export default function Error() {
  return (
    <main className="lg:mt-32 px-8 lg:pl-64 lg:pr-24 pt-32">
      <section className="m-auto grid content-center gap-12 lg:w-11/12 lg:grid-cols-2 lg:items-center">
          <div className="home__data justify-self-center text-center lg:text-left">
            <p className="pb-2 ">Hata 404: Kayıp Harabeler</p>
            
            <h1 className="pb-6 text-5xl font-semibold lg:text-6xl">Kaybolmuş gibisiniz! </h1>
            <p className="pb-4 ">
            
            Üzgünüz, aradığınız sayfa eski harabelerde kaybolmuş gibi görünüyor.
            Ancak yalnız değilsiniz, kazı ekibimiz hala bu kayıp bilgi hazinesini aramak için çalışıyor. </p>

            <p className="pb-4 "> Belki de bu arada biraz geriye gidip başka bir yol denemek istersiniz.
            </p>
            <Link
              href="/"
              className="bg-white font-normal text-sanaat-black py-[5px] px-[12px] mt-6 rounded-2xl inline-flex justify-between items-center hover:scale-105 transition-all"
            >
              Ana sayfaya Dön
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="home__img justify-self-center">
            <Image
              src={`${getStrapiMedia("/uploads/error_page_22b5fef088.png")}`}
              className="w-64 animate-floting lg:w-[400px]"
              width={400}
              height={400}
              alt="404 image"
            />
            <div className="home__shadow mx-auto h-8 w-36 animate-shadow rounded-[50%] bg-gray-900/30 blur-md lg:w-64"></div>
          </div>
        </section>
    </main>
  );
}
