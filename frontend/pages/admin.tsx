// pages/admin.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { QuestionToCreate, Category } from '../lib/types';

const AdminPage = () => {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [answers, setAnswers] = useState([
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
  ]);
  const [message, setMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Fetch categories from the backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`);
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        // Assuming your API returns an object with a "data" key containing an array of categories.
        const cats = data.data || data;
        setCategories(cats);
        if (cats.length > 0) {
          setCategoryId(cats[0].id);
        }
      } catch (error) {
        setMessage('Failed to fetch categories');
      }
    }
    fetchCategories();
  }, []);

  const handleAnswerChange = (
    index: number,
    field: 'text' | 'correct',
    value: string | boolean
  ) => {
    setAnswers((prev) =>
      prev.map((ans, i) => (i === index ? { ...ans, [field]: value } : ans))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setValidationErrors([]);
  
    if (categoryId === null) {
      setMessage('Please select a category.');
      return;
    }
  
    const payload: QuestionToCreate = {
      text,
      categoryId,
      answers,
    };
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/questions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
  
      if (!res.ok) {
        const errorData = await res.json();
        console.log('Error response:', errorData);
        // Check if the error object has an "issues" array
        if (
          errorData.error &&
          errorData.error.issues &&
          Array.isArray(errorData.error.issues)
        ) {
          const errors = errorData.error.issues.map(
            (err: { message: string; path?: (string | number)[] }) =>
              err.message
          );
          setValidationErrors(errors);
        } else if (errorData.message) {
          setMessage(`Error: ${errorData.message}`);
        } else {
          setMessage('An unknown error occurred.');
        }
      } else {
        setMessage('Question created successfully!');
      }
    } catch (err) {
      setMessage('An unexpected error occurred.');
    }
  };
  

  return (
    <Layout>
      <h2>Create a New Question</h2>
      {message && <p>{message}</p>}
      {validationErrors.length > 0 && (
        <div>
          <ul>
            {validationErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={categoryId ?? ''}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {answers.map((ans, index) => (
          <div key={index}>
            <label>Answer {index + 1}:</label>
            <input
              type="text"
              value={ans.text}
              onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
              required
            />
            <label>
              Correct?
              <input
                type="checkbox"
                checked={ans.correct}
                onChange={(e) =>
                  handleAnswerChange(index, 'correct', e.target.checked)
                }
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default AdminPage;
