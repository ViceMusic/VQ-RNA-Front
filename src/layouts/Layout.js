import './layout.css';
import { BrowserRouter, Routes, Route, Link, useNavigate,Outlet } from 'react-router-dom';
import router from "../router"
import Header from './header';
import Footer from './footer';
import Home from '../pages/Home';
import state from '../tools/state';
import { Navigate } from 'react-router-dom';
function Layout() {
  return (
    state.isLogged?<>
    <Header></Header>
    <div className='content'>
        <Outlet/>
    </div>
    <Footer></Footer>
    </>:<Navigate to="/login" />
    
  );
}

export default Layout;