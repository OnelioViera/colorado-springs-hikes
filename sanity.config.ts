import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemas";
import { StructureBuilder } from "sanity/desk";
import TrailPreview from "./sanity/components/TrailPreview";
import { DefaultDocumentNodeResolver } from "sanity/desk";

// Custom structure
const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Trail Group
      S.listItem()
        .title("Trails")
        .child(
          S.list()
            .title("Trails")
            .items([S.documentTypeListItem("trail").title("All Trails")])
        ),
      // About Page
      S.documentTypeListItem("about").title("About Page"),
      // Contact Page
      S.documentTypeListItem("contact").title("Contact Page"),
    ]);

// Default document node resolver
const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Only show preview for trail documents
  if (schemaType === "trail") {
    return S.document().views([
      S.view.form(),
      S.view.component(TrailPreview).title("Preview"),
    ]);
  }
  return S.document().views([S.view.form()]);
};

export default defineConfig({
  name: "colorado-springs-hikes",
  title: "Colorado Springs Hikes",
  projectId: "y6vbbfmh",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
  ],
  schema,
  apiVersion: "2024-03-24",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
