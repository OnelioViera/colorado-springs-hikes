"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import SearchFilters from "@/components/SearchFilters";
import PortableText from "@/components/PortableText";

type Trail = {
  _id: string;
  name: string;
  slug: { current: string };
  description: any; // Changed to any for Portable Text
  difficulty: string;
  length: number;
  elevationGain: number;
  estimatedTime: number;
  mainImage: {
    asset: {
      url: string;
    };
  };
};

async function getInitialTrails() {
  const query = `*[_type == "trail"] {
    _id,
    name,
    slug,
    description,
    difficulty,
    length,
    elevationGain,
    estimatedTime,
    mainImage {
      asset->{
        url
      }
    }
  }`;

  return client.fetch(query);
}

export default function Home() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial trails
  useEffect(() => {
    const loadTrails = async () => {
      try {
        const initialTrails = await getInitialTrails();
        setTrails(initialTrails);
      } catch (error) {
        console.error("Error loading trails:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrails();
  }, []);

  const handleSearchResults = (results: Trail[]) => {
    setTrails(results);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-black">
        <Image
          src="/images/garden-of-the-gods.jpg"
          alt="Garden of the Gods, Colorado Springs"
          fill
          priority
          className="object-cover"
          quality={100}
          unoptimized
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Colorado Springs Hiking Trails
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
            Discover the beauty of the Rocky Mountains and explore the best
            hiking trails in Colorado Springs
          </p>
          <Link
            href="#trails"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Trails
          </Link>
        </div>
      </div>

      {/* Search and Trails Section */}
      <div id="trails" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <SearchFilters onSearchResults={handleSearchResults} />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : trails.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              No trails found
            </h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trails.map((trail) => (
              <Link
                key={trail._id}
                href={`/trail/${trail.slug.current}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={trail.mainImage.asset.url}
                    alt={trail.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{trail.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      {trail.length} miles
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      {trail.elevationGain}ft gain
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        trail.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : trail.difficulty === "moderate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {trail.difficulty.charAt(0).toUpperCase() +
                        trail.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="text-gray-600 line-clamp-3">
                    <PortableText value={trail.description} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
