import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import OfficesPage from './pages/OfficesPage';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState<string>('login')

  const handleNavClick = (tabName: string) => {
    setCurrentTab(tabName)
  }

  const navLinkClass = (tabName: string) => {
    return currentTab === tabName ? 'nav-link nav-active' : 'nav-link'
  }

  return (
    <>
    <nav id="topnav">
      <a className={navLinkClass('login')} href={`#`} onClick={(e) => {
        e.preventDefault()
        handleNavClick('login')
      }}>Login</a>
      <a className={navLinkClass('offices')} href={`#`} onClick={(e) => {
        e.preventDefault()
        handleNavClick('offices')
      }}>Offices</a>
    </nav>
      <main>
        {
          currentTab === 'login' ? <LoginPage/> : <OfficesPage/>
        }
      </main>
    </>
  )
}

export default App
