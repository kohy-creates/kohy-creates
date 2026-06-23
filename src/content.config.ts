import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		img: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		link: z.string().optional(),
	}),
});

export const collections = {
	blog,
	projects
};
