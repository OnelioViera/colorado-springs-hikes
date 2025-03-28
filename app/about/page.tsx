import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import ParallaxHero from "@/components/ParallaxHero";
import { Mountain, Tree, Compass, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Colorado Springs Hikes",
  description:
    "Learn about our mission to help you discover the best hiking trails in Colorado Springs.",
};

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-[400px] my-8">
          <img
            src={urlForImage(value).url()}
            alt={value.alt || "Image"}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const { href, blank } = value;
      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

const iconMap = {
  mountain: Mountain,
  tree: Tree,
  compass: Compass,
  heart: Heart,
};

async function getAboutPage() {
  try {
    console.log("Fetching about page data...");
    const data = await client.fetch(`*[_type == "about"][0]{
      title,
      heroImage,
      content,
      missionStatement,
      values
    }`);
    console.log("About page data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

export default async function AboutPage() {
  const about = await getAboutPage();

  // If no about page content exists, show a placeholder
  if (!about) {
    return (
      <main>
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gray-100 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-gray-600">
              Content coming soon. Please check back later!
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <ParallaxHero
        imageUrl={urlForImage(about.heroImage).url()}
        title={about.title}
      >
        <p className="text-lg md:text-xl max-w-2xl">{about.missionStatement}</p>
      </ParallaxHero>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <PortableText value={about.content} components={components} />
        </div>

        {about.values && about.values.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {about.values.map((value: any, index: number) => {
                const Icon =
                  iconMap[value.icon as keyof typeof iconMap] || Mountain;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-lg bg-white shadow-lg"
                  >
                    <div className="flex justify-center mb-4">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
