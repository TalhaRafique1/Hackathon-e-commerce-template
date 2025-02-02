// sanity.config.ts
'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Environment variables
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio', // Studio URL path
  projectId,
  dataset,
  name: 'Car_Rental_Studio', // Studio instance name
  title: 'Car Rental Studio', // Browser tab title
  
  schema, // Your schema definitions
  
  plugins: [
    structureTool(), // Default structure (remove custom structure import)
    visionTool({ defaultApiVersion: apiVersion }),
  ],})