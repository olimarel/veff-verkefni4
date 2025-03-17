// components/QuestionList.tsx
import React, { FC } from 'react';
import { Question } from '../lib/types';
import QuestionDetail from './QuestionDetail';

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: FC<QuestionListProps> = ({ questions }) => (
  <div>
    {questions.map((q) => (
      <QuestionDetail key={q.id} question={q} />
    ))}
  </div>
);

export default QuestionList;
