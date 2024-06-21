import React from "react"
import HighlightedText from "../components/HighlightedText";
import Link from "next/link";

const richTextBlocks: any = {
    // You can use the default components to set class names...
    paragraph: ({ children }: { children: any}) => <p>{children}</p>,
    // ...or point to a design system
    heading: ({ children, level }: { children: any; level: number}) => {
      switch (level) {
        case 1:
          return <HighlightedText text={children} tag="h1" className="text-3xl" />
        case 2:
            return <HighlightedText text={children} tag="h2" className="text-2xl" />
        case 3:
            return <HighlightedText text={children} tag="h3" className="text-xl" />
        case 4:
            return <HighlightedText text={children} tag="h4" className="text-lg" />
        case 5:
            return <HighlightedText text={children} tag="h5" className="text-md" />
        case 6:
            return <HighlightedText text={children} tag="h6" className="text-sm" />
        default:
            return <HighlightedText text={children} tag="strong" className="text-2xl" />
      }
    },
    // For links, you may want to use the component from your router or framework
    // link: ({ children, url }: { children: any; url: string;}) => <Link href={url}>{children}</Link>,
};

export { richTextBlocks };