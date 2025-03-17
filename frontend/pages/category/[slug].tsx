// pages/category/[slug].tsx
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import QuestionList from '../../components/QuestionList';
import { fetchQuestionsByCategory } from '../../lib/api';
import { Question } from '../../lib/types';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  const { data, error } = useSWR<Question[]>(
    slug ? `questions/${slug}` : null,
    () => fetchQuestionsByCategory(slug)
  );

  if (error) return <Layout><p>Error loading questions.</p></Layout>;
  if (!data) return <Layout><p>Loading questions...</p></Layout>;

  if (data.length === 0) {
    // You can also create a custom 404 page if the category is not found.
    return <Layout><h2>Category not found</h2></Layout>;
  }

  return (
    <Layout>
      <h2>Questions in {slug}</h2>
      <QuestionList questions={data} />
    </Layout>
  );
};

export default CategoryPage;
