"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import Jumbotron from "./Jumbotron";

const sanaatProjectSections = [
  {
    title: "Detaylı Bilgi Sunumu",
    text: "Sanaat, her eserin ayrıntılı hikayelerle birlikte en yüksek kalitede görsellerle sunulmasını sağlar. Bu özellik, kullanıcıların eserleri daha derinlemesine incelemelerine olanak tanır. Ayrıca, görme engelli bireyler için sesli anlatımlarla eserler hakkında bilgiye erişim imkanı da sunulması da hedeflenmektedir. Sanaat, sunulan bilgilerin kaynakçalı ve güvenilir olmasına büyük önem verir. Bu sayede, kullanıcılar her zaman doğru ve teyit edilmiş bilgilere ulaşabilirler."
  },
  {
    title: "Genç Yetenekleri Desteklemek",
    text: "Sanaat Projesi’nin en önemli hedeflerinden biri, genç yetenekleri keşfetmek ve desteklemektir. Genç yetenekler için dijital bir sergi alanı ve kendi içeriklerini üretebilecekleri blog sayfaları sağlayarak, sanatçıların eserlerini daha geniş kitlelere ulaştırmalarına yardımcı olmayı amaçlamaktadır."
  },
  {
    title: "Sanaat Ansiklopedi ve Sanaat Blog",
    text: "Sanaat, kendi bilgi ansiklopedisini oluşturmaya devam etmektedir. Kültür, sanat, tarih, eğitici rehber, sinema gibi alanlarda zengin içerikler sunan Sanaat Blog, okuyuculara güncel ve ilgi çekici bilgiler sağlamaktadır. Bu blog, sanatseverlerin çeşitli konularda bilgi edinmesini ve kültürel birikimlerini artırmasını amaçlamaktadır."
  },
  {
    title: "Sanaat Takvim",
    text: "Sanaat Takvim, kullanıcıların aktif kültür sanat etkinliklerini takip edebilecekleri ve keşfedebilecekleri bir platformdur. Bu sayede, kullanıcılar bulundukları bölgedeki veya ilgi duydukları alandaki etkinlikleri kolayca öğrenebilir ve bu etkinliklere katılım sağlayabilirler."
  },
  {
    title: "Vizyon ve Misyon",
    text: `
      <p class="font-semibold text-xl mb-4">Vizyon:</p>
      <p class="mb-6">Sanaat, kültürel mirasın korunması, sanatın dijital dünyada yaşatılması ve sanatseverlere zengin içerikler sunulması yoluyla sanatı herkes için erişilebilir kılmayı amaçlayan öncü bir platformdur. Amacımız, sanat ve kültür alanında küresel bir bilgi merkezi oluşturarak, sanat eserlerinin ve sanatçıların hikayelerinin derinlemesine incelenmesini sağlamak ve bu eserleri gelecek nesillere aktarılacak şekilde korumaktır. Sanaat, sanatın evrensel dilini kullanarak, insanları bir araya getiren bir köprü oluşturmayı ve dünya çapında sanata olan ilgiyi artırmayı hedefler.</p>
      <p class="font-semibold text-xl mb-4">Misyon:</p>
      <p class="mb-4"><span class="font-semibold">1. Kültürel Mirasın Korunması ve Dijitalleştirilmesi:</span> Tarihi ve kültürel öneme sahip sanat eserlerinin dijital ortama aktarılması ve yüksek kalitede görsellerle sunulması. Kültürel mirasın korunması amacıyla, bu eserlerin hikayeleri, yaratılış süreçleri ve sanatsal değerleri hakkında detaylı bilgiler sunarak, gelecek nesillere aktarılmasına katkıda bulunmak.</p>
      <p class="mb-4"><span class="font-semibold">2. Erişilebilirlik ve Kapsayıcılık:</span> Sanatı, görme engelli bireyler dahil olmak üzere herkes için erişilebilir kılmak amacıyla, sesli anlatımlarla bilgiye erişim imkanı sağlamak. Kullanıcıların doğru ve teyit edilmiş bilgilere ulaşmalarını sağlayarak, güvenilir bir bilgi kaynağı oluşturmak.</p>
      <p class="mb-4"><span class="font-semibold">3. Genç Yeteneklerin Desteklenmesi:</span> Genç sanatçıları keşfetmek ve desteklemek amacıyla, onlara dijital bir sergi alanı ve kendi içeriklerini üretebilecekleri blog sayfaları sağlamak. Genç yeteneklerin eserlerini daha geniş kitlelere ulaştırmalarına yardımcı olmak ve onların sanatsal kariyerlerini desteklemek.</p>
      <p class="mb-4"><span class="font-semibold">4. Zengin İçerik ve Eğitim:</span> Kültür, sanat, tarih, sinema gibi alanlarda zengin ve güncel içerikler sunarak, sanatseverlerin bilgi edinmesini ve kültürel birikimlerini artırmasını sağlamak. Sanaat Blog aracılığıyla, okuyuculara eğitici rehberler ve ilgi çekici bilgiler sunmak.</p>
      <p class="mb-4"><span class="font-semibold">5. Aktif Kültür ve Sanat Takibi:</span> Kullanıcıların, bulundukları bölgedeki veya ilgi duydukları alandaki kültür sanat etkinliklerini kolayca takip edebilecekleri ve keşfedebilecekleri bir platform sunmak. Sanatseverlerin, ilgi duydukları etkinliklere katılım sağlamalarına olanak tanımak ve kültürel etkinliklere erişimlerini kolaylaştırmak.</p>
      <p class="font-semibold text-xl mb-4">Değerlerimiz:</p>
      <p class="mb-4"><span class="font-semibold">İnovasyon:</span> Sanatın dijital dünyada yeniden şekillenmesini sağlamak için sürekli yenilikçi çözümler geliştirmek.</p>
      <p class="mb-4"><span class="font-semibold">Erişilebilirlik:</span> Sanatı, engelleri kaldırarak herkes için erişilebilir kılmak.</p>
      <p class="mb-4"><span class="font-semibold">Eğitim:</span> Kültürel ve sanatsal bilgi birikimini artırarak, toplumu sanat ve kültür konusunda bilinçlendirmek.</p>
      <p class="mb-4"><span class="font-semibold">Destek:</span> Genç yeteneklere ve sanatçılara destek olmak, onların eserlerini tanıtmak ve sanatsal gelişimlerine katkıda bulunmak.</p>
      <p class="mb-4"><span class="font-semibold">Güvenilirlik:</span> Kullanıcılara her zaman doğru, teyit edilmiş ve kaynakçalı bilgiler sunmak.</p>
      <p>Sanaat Projesi, sanatın evrensel değerlerini dijital platforma taşıyarak, kültürel mirası korumayı ve sanatı daha geniş kitlelere ulaştırmayı amaçlar. Sanatseverler, kültürseverler ve sanatçıların bir araya geldiği bu platform, geleceğin sanat dünyasında önemli bir rol oynamayı hedefler.</p>
    `
  }
];

const AboutPage: React.FC = () => {
  return (
    <main className="my-12 px-8 lg:pr-24 mt-24">
      <section className="mt-16 w-full lg:w-4/6 h-auto m-auto">
        <div className="z-20 p-4 lg:w-2/3 text-center m-auto">
          <HighlightedText text="Sanaat Nedir?" tag="h1" className="text-4xl font-normal mb-3 lg:mb-0" />
          <p className="text-white m-auto lg:mt-10 text-lg w-full text-shadow">
            Sanaat, kültürel mirasın korunması, dijitalleştirilmesi, çağdaş sanatın desteklenmesi ve yerli bir açık kaynak bilgi arşivi oluşturulması gibi önemli amaçları gerçekleştirmek üzere geliştirilen bir kültür ve sanat platformudur.
          </p>
        </div>
        <div className="relative w-full h-[600px]">
          <Image
            src={`${getStrapiMedia("/uploads/pexels_julia_volk_6061520_2f86d0ce9d.jpg")}`}
            alt="Sanaat | Sanaat Nedir?"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            quality={100}
          />
        </div>
      </section>
      {sanaatProjectSections.map((section, index) => (
        <section className="mt-16 lg:w-full h-auto m-auto" key={index}>
          <div className="z-20 p-4 lg:w-2/3 text-center m-auto">
            <HighlightedText text={section.title} tag="h2" className="text-3xl font-normal mb-3 lg:mb-0" />
            <p className="text-white m-auto lg:mt-10 text-md w-full text-shadow" dangerouslySetInnerHTML={{ __html: section.text }} />
          </div>
        </section>
      ))}
    </main>
  );
};

export default AboutPage;
