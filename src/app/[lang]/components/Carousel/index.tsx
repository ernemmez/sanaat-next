import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import './style.css'
import HighlightedText from '../HighlightedText'
import Link from 'next/link'

type PropType = {
  children: React.ReactNode;
  options?: EmblaOptionsType
  title?: string;
  desc?: string;
  showAllUrl?: string;
}

export const CarouselItem: React.FC<{ children: React.ReactNode; className?: string}> = (props) => {
    const itemAttributes = {
        ...props,
        className: `lg:mr-6 flex-shrink-0 ${props.className}`
    }
    return (
        <div {...itemAttributes} />
    )
};

const Carousel: React.FC<PropType> = (props) => {
  const { children, options, title, desc, showAllUrl } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla w-full">
      <div className='lg:pl-24 flex justify-between items-center mb-4'>
        {title && (
          <div className='flex flex-col gap-3'>
            {showAllUrl ? (
              <Link href={showAllUrl}>
                <HighlightedText
                  text={title}
                  tag="h2"
                  className="text-3xl font-light text-pretty transition ease-curve-a duration-250 hover:text-btn-primary-base--hover"
                />
              </Link>
            ) : (
              <HighlightedText
                text={title}
                tag="h2"
                className="text-3xl font-light text-pretty transition ease-curve-a duration-250 hover:text-btn-primary-base--hover"
              />
            )}
            {desc && <p className="text-sm font-light">{desc}</p>}
          </div>
        )}
        <div className="embla__controls">
            <div className="embla__buttons">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>
      </div>
      <div className="embla__viewport lg:pl-24" ref={emblaRef}>
        <div className="embla__container">
          {children}
        </div>
      </div>
    </section>
  )
}

export default Carousel;