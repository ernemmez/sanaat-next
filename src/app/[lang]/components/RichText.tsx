import { BlocksRenderer, } from '@strapi/blocks-react-renderer';
// import { richTextBlocks } from '../utils/richTextBlocks';

interface RichTextProps {
  data: {
    body: any;
  };
}

export default async function RichText({ data }: RichTextProps) {
  return (
    <section className="rich-text pb-6">
      <BlocksRenderer 
        content={data?.body}
      />
    </section>
  );
}
