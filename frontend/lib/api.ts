// lib/api.ts
import { Category, Question } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.data; // adjust based on your API response structure
}

export async function fetchQuestionsByCategory(slug: string): Promise<Question[]> {
  const res = await fetch(`${BASE_URL}/questions?category=${slug}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  const data = await res.json();
  return data.data;
}

// Add functions for POST, PATCH, DELETE operations as needed.
