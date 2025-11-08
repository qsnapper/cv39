import { defineConfig } from "tinacms"

// Your hosting provider will likely expose this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main"

export default defineConfig({
  branch,

  // Use local mode for development (no cloud credentials needed)
  // When deploying to production, set these environment variables
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  // Enable local development mode when no credentials provided
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "property",
        label: "Property Content",
        path: "content/property",
        format: "json",
        fields: [
          {
            type: "string",
            name: "locale",
            label: "Locale",
            required: true,
            options: ["en", "pt", "fr", "de", "nl"],
          },
          // Hero Section
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                required: true,
              },
              {
                type: "string",
                name: "price",
                label: "Price",
                required: true,
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          // Quick Facts
          {
            type: "object",
            name: "quickFacts",
            label: "Quick Facts",
            fields: [
              {
                type: "number",
                name: "bedrooms",
                label: "Bedrooms",
                required: true,
              },
              {
                type: "number",
                name: "bathrooms",
                label: "Bathrooms",
                required: true,
              },
              {
                type: "string",
                name: "builtArea",
                label: "Built Area",
                required: true,
              },
              {
                type: "string",
                name: "plotSize",
                label: "Plot Size",
                required: true,
              },
              {
                type: "string",
                name: "poolSize",
                label: "Pool Size",
                required: true,
              },
            ],
          },
          // Overview
          {
            type: "object",
            name: "overview",
            label: "Overview Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "rich-text",
                name: "leadParagraph",
                label: "Lead Paragraph",
                required: true,
              },
              {
                type: "rich-text",
                name: "description",
                label: "Description",
                required: true,
              },
              {
                type: "string",
                name: "highlights",
                label: "Highlights",
                list: true,
              },
            ],
          },
          // Gallery
          {
            type: "object",
            name: "gallery",
            label: "Gallery",
            list: true,
            fields: [
              {
                type: "image",
                name: "src",
                label: "Image",
                required: true,
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
                required: true,
              },
              {
                type: "string",
                name: "category",
                label: "Category",
                options: ["exterior", "interior", "pool", "gardens"],
              },
            ],
          },
          // Features
          {
            type: "object",
            name: "features",
            label: "Features",
            fields: [
              {
                type: "object",
                name: "interior",
                label: "Interior Features",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "string",
                    name: "items",
                    label: "Features",
                    list: true,
                  },
                ],
              },
              {
                type: "object",
                name: "outdoor",
                label: "Outdoor Features",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "string",
                    name: "items",
                    label: "Features",
                    list: true,
                  },
                ],
              },
              {
                type: "object",
                name: "amenities",
                label: "Premium Amenities",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "string",
                    name: "items",
                    label: "Features",
                    list: true,
                  },
                ],
              },
              {
                type: "object",
                name: "lifestyle",
                label: "Lifestyle Advantages",
                fields: [
                  {
                    type: "string",
                    name: "heading",
                    label: "Heading",
                  },
                  {
                    type: "string",
                    name: "items",
                    label: "Features",
                    list: true,
                  },
                ],
              },
            ],
          },
          // Location
          {
            type: "object",
            name: "location",
            label: "Location",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                required: true,
              },
              {
                type: "rich-text",
                name: "description",
                label: "Description",
              },
              {
                type: "number",
                name: "latitude",
                label: "Latitude",
              },
              {
                type: "number",
                name: "longitude",
                label: "Longitude",
              },
              {
                type: "string",
                name: "highlights",
                label: "Location Highlights",
                list: true,
              },
            ],
          },
          // Contact
          {
            type: "object",
            name: "contact",
            label: "Contact Information",
            fields: [
              {
                type: "string",
                name: "phone",
                label: "Phone Number",
                required: true,
              },
              {
                type: "string",
                name: "reference",
                label: "Property Reference",
              },
              {
                type: "string",
                name: "benefits",
                label: "Benefits of Buying Direct",
                list: true,
              },
            ],
          },
        ],
      },
    ],
  },
})
