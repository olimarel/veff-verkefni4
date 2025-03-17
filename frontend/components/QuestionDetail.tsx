import React, { FC, useState } from 'react';
import { Question, Answer } from '../lib/types';

interface QuestionDetailProps {
  question: Question;
}

const QuestionDetail: FC<QuestionDetailProps> = ({ question }) => {
  // Removed selectedAnswer since it is not used
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (answer: Answer) => {
    // If you plan to use selectedAnswer later, consider Option B instead.
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
