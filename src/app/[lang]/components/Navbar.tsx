"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface NavLink {
  id: number;
  url: string;
  newTab?: boolean;
  text: string;
  isScrolled?: boolean;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text, isScrolled }: NavLink) {
  return (
    <li className="h-full flex items-center">
      <Link href={url} className="text-sm text-nav-label h-full focus-visible:h-auto focus-visible:rounded-s transition-[color] ease-curve-a duration-fast hover:text-sanaat-red">
        <span className={`px-s/2 relative h-full w-full flex items-center text-sanaat-text font-light`}>{text}</span>
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex hover:text-sanaat-red">
      <Link href={url} onClick={handleClick} className="-mx-3 block rounded-lg px-3 py-2 text-base font-light leading-7 text-gray-100 hover:bg-gray-900">
        {text}
      </Link>
    </a>
  );
}

const navLinks = [
  {
    "id": 22,
    "url": "/ansiklopediler",
    "text": "Sanaat Anksiklopedi"
  },
  {
    "id": 23,
    "url": "/sanaat-blog",
    "text": "Sanaat Blog"
  },
  {
    "id": 21,
    "url": "/muzeler",
    "text": "Müzeler"
  },
  {
    "id": 24,
    "url": "/sanaat-hakkinda",
    "text": "Sanaat Hakkında"
  },
  {
    "id": 26,
    "url": "/sanaat-takvim",
    "text": "Sanaat Takvim"
  },
  {
    "id": 26,
    "url": "/iletisim",
    "text": "İletişim"
  }
];

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 400;
      setIsScrolled(show);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <header className={isScrolled ? "z-[102] text-nav-label top-0 fixed m-auto w-full m:py-0 transform-gpu transition-header ease-curve-d duration-300 -translate-y-full" : "z-[102] text-nav-label top-0 fixed m-auto w-full m:py-0 transform-gpu transition-header ease-curve-d duration-300"}>
      <nav aria-label="Main" data-orientation="horizontal" dir="ltr" className={`z-50 relative h-[55px] ${mobileMenuOpen && 'hidden'}`}>
        <div className="transform-gpu transition ease-out-cubic duration-300 mx-auto min-h-navHeight h-full w-full z-50 relative bg-base/80 backdrop-blur-xl">
          <div className="transition ease-curve-d duration-300 max-w-container flex items-center min-h-navHeight h-full w-full justify-between relative px-4 lg:px-80">
            <a aria-label="Home" className="transition ease-curve-a duration-250 block" href="/">
              {logoUrl && <Image src={logoUrl} alt="Sanaat" width={75} height={37} quality={100} />}
            </a>
            <ul className="h-full items-center justify-center hidden lg:flex space-x-10 mt-1">
              {navLinks.map((item) => (
                <NavLink key={item.id} {...item} isScrolled={isScrolled} />
              ))}
            </ul>
            <div className="flex justify-self-end items-center justify-center gap-[0.5rem]">
              <button
                className="lg:hidden w-[1.5rem] h-[1.5rem] flex flex-col items-center justify-center gap-[0.1875rem]"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-7 w-7 text-gray-100" aria-hidden="true" />
              </button>
            </div>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <div className="fixed inset-0 z-40 bg-opacity-75" /> {/* Overlay */}
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-sanaat-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
                <div className="flex items-center justify-between">
                  <a aria-label="Home" className="transition ease-curve-a duration-250 block" href="/">
                    {logoUrl && <Image src={logoUrl} alt="Sanaat" width={75} height={37} quality={100} />}
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {/* <hr className="mt-6 sanaat-text-gray" /> */}
                <div className="mt-6 flow-root border-t border-sanaat-text-gray pt-4">
                  <div className="-my-6 divide-y sanaat-text-gray">
                    <div className="space-y-2 py-6">
                      {navLinks.map((item) => (
                        <MobileNavLink key={item.id} closeMenu={closeMenu} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </div>
        </div>
      </nav>
    </header>
  );
}
