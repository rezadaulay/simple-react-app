import { InputHTMLAttributes } from 'react';
import ErrorValidation from './ErrorValidation';

export default interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: ErrorValidation | null;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
