import { type SchemaTypeDefinition } from 'sanity'
import carsSchema from './cars'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ carsSchema]
}
