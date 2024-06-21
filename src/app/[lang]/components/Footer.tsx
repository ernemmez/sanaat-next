"use client";

import React from "react";
import { FaInstagram, FaLinkedin, FaYoutube, } from "react-icons/fa";
import Logo from "./Logo";
import { FaSquareXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface FooterProps {
    logoUrl: string | null;
    logoText: string | null;
    menuLinks: Array<FooterLink>;
    legalLinks: Array<FooterLink>;
    socialLinks: Array<FooterLink>;
}

interface FooterLink {
    id: number;
    url: string;
    newTab: boolean;
    text: string;
    social?: string;
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
    switch (social) {
        case "INSTAGRAM":
            return <FaInstagram />;
        case "TWITTER":
            return <FaSquareXTwitter />;
        case "YOUTUBE":
            return <FaYoutube />;
        case "LINKEDIN":
            return <FaLinkedin />;
        default:
            return null;
    }
}

function FooterLink({ url, text }: FooterLink) {
    const path = usePathname();
    return (
        <li className="lg:flex text-center">
            <Link
                href={`${url}`}
                className={`hover:text-sanaat-red ${path === url && "text-sanaat-red"}}`}
            >
                {text}
            </Link>
        </li>
    );
}

const Footer: React.FC<FooterProps> = ({
    logoUrl,
    logoText,
    menuLinks,
    legalLinks,
    socialLinks
}) => {
    return (
        <footer>
            <div className="h-1/2 w-full flex flex-col lg:flex-row  justify-between lg:justify-around items-center lg:items-start px-20 lg:p-20 border-t text-sanaat-text">
                <div className="p-5">
                    <ul>
                        <Logo width={180} height={60} src={logoUrl}>{logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}</Logo>
                        <div className="flex gap-6 pb-5">
                            {socialLinks.map((link:FooterLink, index) => (
                                <a
                                    key={link.id}
                                    rel="noopener noreferrer"
                                    href={link.url}
                                    title={link.text}
                                    target={link.newTab ? "_blank" : "_self"}
                                    className="flex items-center justify-center w-10 h-10 rounded-full text-sanaat-text"
                                >
                                    <RenderSocialIcon social={link.social} />
                                </a>
                            ))}
                        </div>
                    </ul>
                </div>
                {menuLinks && (
                    <div className="p-5">
                        <ul className="text-center lg:text-left">
                            <p className="font-bold text-2xl pb-4">
                                Menü
                            </p>
                            {menuLinks.map((link: FooterLink) => (
                                <FooterLink key={link.id} {...link} />
                            ))}
                        </ul>
                    </div>
                )}
                {legalLinks && (
                    <div className="p-5">
                        <ul className="text-center lg:text-left">
                            <p className="font-bold text-2xl pb-4 m-auto">
                                Diğer
                            </p>
                            {legalLinks.map((link: FooterLink) => (
                                <FooterLink key={link.id} {...link} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center items-center text-center p-5">
                <h1 className="font-light text-sanaat-text">
                    ©️ {new Date().getFullYear()} All rights reserved Sanaat
                </h1>
            </div>
        </footer>
    );
};

export default Footer;