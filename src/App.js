import React from 'react';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Logout from './components/Logout';
import AddPage from './pages/AddPage';
import Navigation from './components/Navigation';
import DetailPage from './pages/DetailPage'
import {Routes, Route, Link} from 'react-router-dom';
import ArsipPage from './pages/ArsipPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/api';
import LocaleContext from './contexts/LocaleContext';
import ToggleLanguage from './components/ToggleLanguage';
import ToggleTheme from './components/ToggleTheme';

function App(){
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") || 'dark');
  const [language, setLanguage] = React.useState(localStorage.getItem("language") || "en");


const toggleTheme = () => {
  setTheme((prevState) => {
    const newTheme = prevState === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute('data-theme' , newTheme);
    return newTheme;
  })
}

const toggleLanguage = () => {
  setLanguage((prevState) => {
    const newLanguage = prevState === "en" ? "id" : "en";
    localStorage.setItem("language", newLanguage);
    return newLanguage;
  })
};

const localeContextValue = React.useMemo(() => {
  return{
    theme,
    toggleTheme,
    language,
    toggleLanguage,
  }
}, [theme, language]);

React.useEffect(() => {
  getUserLogged().then(({data}) => {
    setAuthedUser(data);
    setInitializing(false);
  })

  const fixTheme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', fixTheme);

}, []); 

async function onLoginSuccess({accessToken}){
  putAccessToken(accessToken);
  const {data} = await getUserLogged();
  setAuthedUser(data);
}

function onLogout(){
  setAuthedUser(null);
  putAccessToken("");
}


return(
  <>
  {(() => {
    if(initializing){
      return null;
    }

    if(authedUser === null){
      return(
        <LocaleContext.Provider value={localeContextValue}>
          <div className='app-container'>
            <header>
              <h1><Link to='/'>{localeContextValue.language === 'id' ? 'Aplikasi Kontak' : 'Contacts App'}</Link></h1>
              <ToggleLanguage/>
              <ToggleTheme/>
           </header>

           <main>
              <Routes>
                <Route path='*' element={<LoginPage loginSuccess={onLoginSuccess}/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
             </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      )
    }

    return(
      <LocaleContext.Provider value={localeContextValue}>
        <div className='app-container'>
         <header>
               <h1><Link to='/'>{localeContextValue.language === 'id' ? 'Aplikasi Kontak' : 'Contacts App'}</Link></h1>
               <Navigation/>
               <ToggleLanguage/>
               <ToggleTheme/>
               <Logout name={authedUser.name} logout={onLogout}/>
            </header>
             <main>
               <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/notes/new' element={<AddPage/>}/>
                  <Route path='/notes/:id' element={<DetailPage/>}/>
                  <Route path='/archives' element={<ArsipPage/>}/>
                  <Route path='*' element={<NotFound/>}/>
               </Routes>
             </main>
         </div>
      </LocaleContext.Provider>
    )
  })()}
  </>
)
}

export default App;
