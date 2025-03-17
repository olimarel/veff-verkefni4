// components/CategoryList.tsx
import React, { FC } from 'react';
import Link from 'next/link';
import { Category } from '../lib/types';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: FC<CategoryListProps> = ({ categories }) => (
  <ul>
    {categories.map((cat) => (
      <li key={cat.slug}>
        <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
      </li>
    ))}
  </ul>
);

export default CategoryList;
