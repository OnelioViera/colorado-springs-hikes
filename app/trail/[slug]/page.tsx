import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import PortableText from "@/components/PortableText";

async function getTrail(slug: string) {
  const query = `*[_type == "trail" && slug.current == $slug][0] {
    _id,
    name,
    description,
    difficulty,
    length,
    elevationGain,
    location,
    mainImage {
      asset->{
        url
      }
    },
    images[] {
      asset->{
        url
      }
    },
    features,
    bestSeasons
  }`;

  return client.fetch(query, { slug });
}

export default async function TrailPage({
  params,
}: {
  params: { slug: string };
}) {
  const trail = await getTrail(params.slug);

  if (!trail) {
    return <div>Trail not found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Image */}
      <div className="relative h-[50vh] bg-black">
        <Image
          src={trail.mainImage.asset.url}
          alt={trail.name}
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {trail.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                {trail.length} miles
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                {trail.elevationGain}ft elevation gain
              </span>
              <span
                className={`px-3 py-1 rounded-full backdrop-blur-sm ${
                  trail.difficulty === "easy"
                    ? "bg-green-500/20"
                    : trail.difficulty === "moderate"
                      ? "bg-yellow-500/20"
                      : "bg-red-500/20"
                }`}
              >
                {trail.difficulty.charAt(0).toUpperCase() +
                  trail.difficulty.slice(1)}{" "}
                difficulty
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trail Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this trail</h2>
              <div className="text-gray-600">
                <PortableText value={trail.description} />
              </div>
            </div>

            {/* Photo Gallery */}
            {trail.images && trail.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {trail.images.map((image: any, index: number) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image.asset.url}
                        alt={`${trail.name} - Photo ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location */}
            {trail.location && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                {trail.location.address && (
                  <p className="text-gray-600 mb-4">{trail.location.address}</p>
                )}
                {trail.location.coordinates && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${trail.location.coordinates.lat},${trail.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <span>View on Google Maps</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Features */}
            {trail.features && trail.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Trail Features</h2>
                <div className="flex flex-wrap gap-2">
                  {trail.features.map((feature: string) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {feature
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Best Seasons */}
            {trail.bestSeasons && trail.bestSeasons.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Best Seasons</h2>
                <div className="flex flex-wrap gap-2">
                  {trail.bestSeasons.map((season: string) => (
                    <span
                      key={season}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {season.charAt(0).toUpperCase() + season.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
