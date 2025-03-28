import { type SchemaTypeDefinition } from "sanity";
import trail from "./trail";
import about from "./about";
import contact from "./contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [trail, about, contact],
};
