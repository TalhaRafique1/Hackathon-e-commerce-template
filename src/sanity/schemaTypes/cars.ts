import { defineField, defineType } from 'sanity';

const carSchema = defineType({
  name: 'car', // Should match your GROQ query (_type == "car")
  type: 'document',
  title: 'Car',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Car Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Unique identifier for URLs',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      type: 'string',
      title: 'Brand',
      description: 'Brand of the car (e.g., Nissan, Tesla, etc.)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Car Type',
      description: 'Type of the car (e.g., Sport, Sedan, SUV, etc.)',
      options: {
        list: [
          { title: 'Sport', value: 'sport' },
          { title: 'Sedan', value: 'sedan' },
          { title: 'SUV', value: 'suv' },
          { title: 'Luxury', value: 'luxury' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fuelCapacity',
      type: 'number',
      title: 'Fuel Capacity',
      description: 'Fuel capacity in liters (e.g., 90)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'transmission',
      type: 'string',
      title: 'Transmission',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Automatic', value: 'automatic' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seatingCapacity',
      type: 'number',
      title: 'Seating Capacity',
      description: 'Number of seats (e.g., 2, 4, 5)',
      validation: (Rule) => Rule.required().min(2).max(10),
    }),
    defineField({
      name: 'pricePerDay',
      type: 'number',
      title: 'Price Per Day',
      description: 'Rental price per day in USD',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      type: 'number',
      title: 'Original Price',
      description: 'Original price in USD before discount',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Popular', value: 'popular' },
          { title: 'Recommended', value: 'recommended' },
          { title: 'New', value: 'new' },
        ],
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Car Image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});

export default carSchema;