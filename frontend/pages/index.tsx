// pages/index.tsx
import React from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import CategoryList from '../components/CategoryList';
import { fetchCategories } from '../lib/api';
import { Category } from '../lib/types';

const fetcher = async () => fetchCategories();

const HomePage = () => {
  const { data, error } = useSWR<Category[]>('categories', fetcher);

  if (error) return <Layout><p>Error loading categories.</p></Layout>;
  if (!data) return <Layout><p>Loading categories...</p></Layout>;

  return (
    <Layout>
      <h2>Flokkar</h2>
      <CategoryList categories={data} />
    </Layout>
  );
};

export default HomePage;
