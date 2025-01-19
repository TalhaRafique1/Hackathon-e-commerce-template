import { type SchemaTypeDefinition } from 'sanity'
import carSchema from './car'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ carSchema]
}
