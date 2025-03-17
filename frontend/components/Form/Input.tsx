// components/Form/Input.tsx
import React, { FC } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        {label}
        <input {...props} />
      </label>
    </div>
  );
};

export default Input;
