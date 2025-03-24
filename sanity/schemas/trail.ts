export const trail = {
  name: "trail",
  title: "Trail",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Trail Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Moderate", value: "moderate" },
          { title: "Hard", value: "hard" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "length",
      title: "Trail Length (miles)",
      type: "number",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "elevationGain",
      title: "Elevation Gain (feet)",
      type: "number",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "estimatedTime",
      title: "Estimated Time (hours)",
      type: "number",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "trailhead",
          title: "Trailhead Name",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "address",
          title: "Trailhead Address",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "mainImage",
      title: "Main Trail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "features",
      title: "Trail Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Waterfall", value: "waterfall" },
          { title: "Lake", value: "lake" },
          { title: "Mountain Views", value: "mountain-views" },
          { title: "Forest", value: "forest" },
          { title: "Wildlife", value: "wildlife" },
          { title: "Dog Friendly", value: "dog-friendly" },
          { title: "Family Friendly", value: "family-friendly" },
          { title: "Rocky", value: "rocky" },
          { title: "Shaded", value: "shaded" },
          { title: "Exposed", value: "exposed" },
        ],
      },
    },
    {
      name: "bestSeasons",
      title: "Best Seasons",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Spring", value: "spring" },
          { title: "Summer", value: "summer" },
          { title: "Fall", value: "fall" },
          { title: "Winter", value: "winter" },
        ],
      },
    },
    {
      name: "directions",
      title: "Getting There",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "tips",
      title: "Trail Tips",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "parking",
      title: "Parking Information",
      type: "object",
      fields: [
        {
          name: "available",
          title: "Parking Available",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "fee",
          title: "Parking Fee",
          type: "string",
        },
        {
          name: "notes",
          title: "Parking Notes",
          type: "text",
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "difficulty",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title,
        subtitle: `Difficulty: ${subtitle}`,
        media,
      };
    },
  },
};
