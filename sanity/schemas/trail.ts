import { defineField, defineType } from "sanity";

export default defineType({
  name: "trail",
  title: "Trail",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Trail Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "length",
      title: "Trail Length (miles)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "elevationGain",
      title: "Elevation Gain (feet)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Moderate", value: "moderate" },
          { title: "Hard", value: "hard" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Trail Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bestSeasons",
      title: "Best Seasons",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "estimatedTime",
      title: "Estimated Time (hours)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "directions",
      title: "Getting There",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "tips",
      title: "Trail Tips",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
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
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "difficulty",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Difficulty: ${subtitle}`,
        media,
      };
    },
  },
});
