import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    defineField({
      name: "formFields",
      title: "Form Fields",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Field ID",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Field Type",
              type: "string",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Message", value: "textarea" },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: "placeholder",
              title: "Placeholder Text",
              type: "string",
            }),
            defineField({
              name: "required",
              title: "Required",
              type: "boolean",
              initialValue: false,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "submitButtonText",
      title: "Submit Button Text",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "errorMessage",
      title: "Error Message",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    }),
  ],
});
