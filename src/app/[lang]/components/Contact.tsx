"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { getStrapiMedia } from '../utils/api-helpers';
import { useIsMobile } from '../utils/useIsMobile';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Ad Soyad zorunlu'),
  email: yup.string().email('Geçerli bir email girin').required('Email zorunlu'),
  subject: yup.string().required('Konu zorunlu'),
  message: yup.string().required('Mesaj zorunlu'),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
  });
    
  const onSubmit = async (data: any) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact-forms`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=UTF-8',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            },
            body: JSON.stringify({...data, isReading: false }),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          reset();
          setIsSubmitted(true);
          setIsError(false);
        } catch (error) {
          console.error('Error:', error);
          setIsError(true);
          setIsSubmitted(false);
        }
  };

  return (
      <div className="lg:h-screen">
              {isMobile && <div className="relative lg:col-span-2 mt-16">
                    <Image
                        src={`${getStrapiMedia("/uploads/error_page_22b5fef088.png")}`}
                        className="w-2/3 animate-floting lg:w-[400px] m-auto"
                        width={400}
                        height={400}
                        alt="404 image"
                        />
              </div>}
              <div
                  className="lg:flex items-center max-lg:justify-center gap-6 h-full lg:px-64 lg:gap-[200px] m-auto">
                  <div className="w-[98%] mt-24 lg:mt-0 lg:w-1/2 max-lg:mx-auto max-lg:text-center max-lg:mb-6">
                      <h2 className="text-4xl">Bizimle İletişime Geç</h2>
                      <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                        Belirli bir sorunuz mu var? Yeni fırsatları mı keşfetmek veya Sanaat Yazarları arasına mı katılmak istiyorsunuz?
                        Ekibimiz sizinle görüşmek için hazır.
                      </p>
  
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 rounded-lg p-6 lg:pl-0 shadow-md space-y-4">
                        <input {...register('name')} placeholder='Ad Soyad' className="w-full rounded-md h-12 px-6 bg-black text-sm outline-none" />
                        {errors.name && <p className='text-xs pl-2 text-sanaat-red'>*{errors.name.message}</p>}
                        <input {...register('email')} placeholder='Email' className="w-full rounded-md h-12 px-6 bg-black text-sm outline-none" />
                        {errors.email && <p className='text-xs pl-2 text-sanaat-red'>*{errors.email.message}</p>}
                        <input {...register('subject')} placeholder='Konu' className="w-full rounded-md h-12 px-6 bg-black text-sm outline-none" />
                        {errors.subject && <p className='text-xs pl-2 text-sanaat-red'>*{errors.subject.message}</p>}
                        <textarea {...register('message')} placeholder='Mesaj' rows={6} className="w-full rounded-md px-6 bg-black text-sm pt-3 outline-none"></textarea>
                        {errors.message && <p className='text-xs pl-2 text-sanaat-red'>*{errors.message.message}</p>}
                        {isSubmitted && <p className='text-xs pl-2 text-green-500'>Mesajınız başarıyla gönderildi!</p>}
                        {isError && <p className='text-xs pl-2 text-red-500'>Bir şeyler ters gitti, lütfen tekrar deneyin.</p>}
                        <button type='submit' className="text-gray-800 hover:text-white bg-white hover:bg-sanaat-red transition-all font-semibold rounded-md text-sm px-6 py-3 block w-full">Gönder</button>
                    </form>
                  </div>
                  {!isMobile && <div className="relative lg:col-span-2 pb-12 lg:pb-0">
                    <Image
                        src={`${getStrapiMedia("/uploads/error_80551f0221.png")}`}
                        className="w-2/3 animate-floting lg:w-[400px] m-auto"
                        width={400}
                        height={400}
                        alt="404 image"
                        />
                  </div>}
              </div>
          </div>
    );
  }
  