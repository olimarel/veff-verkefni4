// pages/admin.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { QuestionToCreate } from '../lib/types'; // Define the type accordingly

const AdminPage = () => {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);
  // You could also have state for the four answers here...
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Construct the question object and send it via fetch
    const payload: QuestionToCreate = {
      text,
      categoryId,
      answers: [
        // Populate your answers array here
      ],
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message}`);
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
        {/* Add inputs for categoryId and answers */}
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </Layout>
  );
};

export default AdminPage;
