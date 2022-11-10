import React from 'react';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import AddPage from './pages/AddPage';
import Navigation from './components/Navigation';
import DetailPage from './pages/DetailPage'
import {Routes, Route, Link} from 'react-router-dom';
import ArsipPage from './pages/ArsipPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/api';
import {LocaleProvider} from './contexts/LocaleContext';
import ToggleMenu from './components/ToggleMenu';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount(){
    const { data } = await getUserLogged();

    this.setState(() => {
      return{
        authedUser: data,
        initializing: false,
        localeContext: {
          locale: localStorage.getItem('locale') || 'id',
          toggleLocale: () => {
            this.setState((prevState) => {
              const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';

              localStorage.setItem('locale', newLocale);
              return {
                localeContext: {
                  ...prevState.localeContext,
                  locale: newLocale
                }
              }
            })
          }
        }
      }
    });
  }

  async onLoginSuccess({accessToken}){
    putAccessToken(accessToken);
    const {data} = await getUserLogged();

    this.setState(() => {
      return{
        authedUser: data,
      }
    });
  }

  onLogout(){
    this.setState(() => {
      return{
        authedUser: null,
      }
    });
    
    putAccessToken('');
  }

  render(){
    if(this.state.initializing){
      return null;
    }

    if(this.state.authedUser === null){
      return(
        <LocaleProvider value={this.state.localeContext}>
          <div className='app-container'>
            <header>
              <h1><Link to='/'>{this.state.localeContext.locale === 'id' ? 'Aplikasi Kontak' : 'Contacts App'}</Link></h1>
              <ToggleMenu authedUser={this.state.authedUser} />
            </header>

            <main>
              <Routes>
                <Route path='/*' element={<LoginPage loginSuccess={this.onLoginSuccess}/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      )
    }

    return(
      <LocaleProvider value={this.state.localeContext}>
        <div className='app-container'>
        <header>
              <h1><Link to='/'>{this.state.localeContext.locale === 'id' ? 'Aplikasi Kontak' : 'Contacts App'}</Link></h1>
              <Navigation/>
              <ToggleMenu logout={this.onLogout} authedUser={this.state.authedUser} name={this.state.authedUser.name}/>
            </header>
            <main>
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/notes/new' element={<AddPage/>}/>
              </Routes>
            </main>
        </div>
      </LocaleProvider>
    )
  }
}


export default App;
