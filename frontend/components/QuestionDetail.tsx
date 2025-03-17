// components/QuestionDetail.tsx
import React, { FC, useState } from 'react';
import { Question, Answer } from '../lib/types';

interface QuestionDetailProps {
  question: Question;
}

const QuestionDetail: FC<QuestionDetailProps> = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (answer: Answer) => {
    setSelectedAnswer(answer);
    if (answer.correct) {
      setFeedback('Correct!');
    } else {
      setFeedback('Sorry, that is not correct.');
    }
  };

  return (
    <div>
      <h3>{question.text}</h3>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer.id}>
            <button onClick={() => handleAnswer(answer)}>
              {answer.text}
            </button>
          </li>
        ))}
      </ul>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default QuestionDetail;
