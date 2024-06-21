import React, { useRef, useState } from 'react'
import { categories } from '../../../../constants/categories'

type Props = {
    activeCategory: number;
    setActiveCategory: (index: number) => void;
}

const ListingTab = ({ activeCategory, setActiveCategory }: Props) => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const handleMouseDown = (e: any) => {
    if(!listRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: any) => {
    if(!isDown || !listRef.current) return;
    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 0.65; //scroll-fast
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className='w-full'>
        <ul className="flex justify-between items-center gap-4 text-center overflow-x-scroll scrollbar-hide"
            ref={listRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
           {categories.map(({ id, label }, index) => (
                <li key={id} className='min-w-[110px] lg:min-w-[210px] hover:cursor-pointer'>
                    <div onClick={() => setActiveCategory(index)} className={`h-16 text-nowrap flex justify-center py-4 transition-all ${activeCategory === index && 'border-t-2 border-sanaat-text font-normal'}`}>
                        {label}
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ListingTab