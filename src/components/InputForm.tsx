import { useId } from 'react'
import InputProps from '../interfaces/types/InputProps'

const InputForm = ({
  name, label, error, ... rest
}: InputProps) => {
  const id = useId();
  return (
    <div className={`input-field`}>
      <label htmlFor={ id + name} >{ label ? label : name }</ label>
      <input id={ id + name }  {...rest}/>
      {error && <p className="error">{error.message}</p>}
    </div>
  )
}

export default InputForm;