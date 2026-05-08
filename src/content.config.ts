import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const flexStr = z.union([z.string(), z.number()]).transform(String);
const flexBoolStr = z.union([z.boolean(), z.string()]);

const fruit = z.object({
  weight_g: flexStr,
  shape: z.string().optional(),
  color: z.string().optional(),
  color_technical: z.string().optional(),
  color_biological: z.string().optional(),
  wall_thickness_mm: flexStr.optional(),
  taste: z.string().optional(),
  use: z.string().optional(),
});

const varieties = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/varieties' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    category: z.enum(['tomato', 'pepper']),
    type: z.string().optional(),
    pepper_type: z.string().optional(),
    ripening: z.string(),
    days_to_harvest: flexStr,
    height_cm: flexStr,
    fruit: fruit,
    yield_per_plant_kg: flexStr.optional(),
    yield_per_m2_kg: flexStr.optional(),
    disease_resistance: z.array(z.string()).optional(),
    pruning: flexBoolStr.optional(),
    stems: flexStr.optional(),
    staking: flexBoolStr.optional(),
    watering: z.string().optional(),
    fertilizing: z.string().optional(),
    planting_western_ukraine: z.string().optional(),
    spacing_cm: z.string().optional(),
    tips: z.array(z.string()).optional(),
    confidence: z.enum(['high', 'medium', 'low']),
    notes: z.string().optional(),
  }),
});

export const collections = { varieties };
