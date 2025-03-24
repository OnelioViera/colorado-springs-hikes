import { PortableText as PortableTextComponent } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";

const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mb-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mb-2">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
    number: ({ children }: any) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
};

interface PortableTextProps {
  value: TypedObject | TypedObject[];
}

export default function PortableText({ value }: PortableTextProps) {
  if (!value) return null;

  return <PortableTextComponent value={value} components={components} />;
}
