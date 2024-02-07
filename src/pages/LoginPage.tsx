import { useState, ChangeEvent, useCallback } from 'react'
import LoginForm from '../components/LoginForm'
import axios from 'axios'

export default function LoginPage() {
  const [lang, setLang] = useState<string>('en')
  const [modal, setModal] = useState<boolean>(false)

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLang(e.target.value)
  }

  // with useCallback LoginForm only re-render when lang state changed
  // without useCallback LoginForm will re-render when state changed in LoginPage
  const onSubmit = useCallback(async (form: object) => {
    try {
      await axios.post('https://www.sample.app/login', form)
    } catch (e) {
      console.error(e)
      alert('Failed to login, please check your network')
    }
  }, [
    lang
  ])

  return (
    <div>
      <div className={`login-form`}>
        <LoginForm onSubmit={onSubmit} currentLang={lang}/>
        <div className={`radio-buttons`} style={{ margin: '10px 35px' }}>
          <span>Language: </span>
          <label>
            <input
            name="change-translate"
            type="radio"
            value="en"
            checked={lang === 'en'}
            onChange={handleOptionChange}
          />
            English
          </label>
          <label>
            <input
            name="change-translate"
            type="radio"
            value="id"
            checked={lang === 'id'}
            onChange={handleOptionChange}
          />
            Bahasa
          </label>
        </div>
      </div>
      <button className={`footer-button`} onClick={() => setModal(!modal)}>Contacs Help</button>
      {
        modal ? (
        <div id="demo-modal" className="modal">
          <div className="modal__content">
              <p>Please make call only on working days</p>
              <ul>
                <li>+62-2889-20033</li>
                <li>+62-2889-20035</li>
                <li>+62-2889-20031</li>
              </ul>

              <button onClick={() => setModal(false)} className={`modal__close`}>&times;</button>
          </div>
        </div>
        ) : ''
      }
    </div>
  )
}