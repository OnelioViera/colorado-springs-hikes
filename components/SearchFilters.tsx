"use client";

import { useState } from "react";
import { client } from "@/lib/sanity";

type Trail = {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  difficulty: string;
  length: number;
  elevation: number;
  mainImage: {
    asset: {
      url: string;
    };
  };
};

type SearchFiltersProps = {
  onSearchResults: (results: any[]) => void;
};

export default function SearchFilters({ onSearchResults }: SearchFiltersProps) {
  const [difficulty, setDifficulty] = useState("");
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");

  const handleSearch = async () => {
    try {
      const query = `*[_type == "trail" ${
        difficulty ? `&& difficulty == "${difficulty}"` : ""
      } ${minLength ? `&& length >= ${parseFloat(minLength)}` : ""} ${
        maxLength ? `&& length <= ${parseFloat(maxLength)}` : ""
      }] {
        _id,
        name,
        slug,
        description,
        difficulty,
        length,
        elevation,
        mainImage {
          asset->{
            url
          }
        }
      }`;

      const results = await client.fetch(query);
      onSearchResults(results);
    } catch (error) {
      console.error("Error searching trails:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="minLength"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Length (miles)
          </label>
          <input
            type="number"
            id="minLength"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label
            htmlFor="maxLength"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Length (miles)
          </label>
          <input
            type="number"
            id="maxLength"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="20"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search Trails
        </button>
      </div>
    </div>
  );
}
