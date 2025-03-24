"use server";

import { client } from "@/lib/sanity";

export async function searchTrails(searchParams: {
  search?: string;
  difficulty?: string[];
  features?: string[];
  seasons?: string[];
}) {
  let query = '*[_type == "trail"';

  const conditions = [];
  const params: Record<string, any> = {};

  if (searchParams?.search) {
    conditions.push("name match $search");
    params.search = `*${searchParams.search}*`;
  }

  if (searchParams?.difficulty?.length) {
    conditions.push("difficulty in $difficulty");
    params.difficulty = searchParams.difficulty;
  }

  if (searchParams?.features?.length) {
    conditions.push("$features in features[]");
    params.features = searchParams.features;
  }

  if (searchParams?.seasons?.length) {
    conditions.push("$seasons in bestSeasons[]");
    params.seasons = searchParams.seasons;
  }

  if (conditions.length) {
    query += ` && ${conditions.join(" && ")}`;
  }

  query += `] {
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

  return client.fetch(query, params);
}
