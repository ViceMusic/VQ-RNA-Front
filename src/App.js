import logo from './logo.svg';
import './App.css';
import Header from './layouts/header';
import Footer from './layouts/footer';
import { BrowserRouter, Routes, Route, Link, useNavigate,HashRouter, Outlet, Navigate } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import ws from './tools/websocketHub';

import Login from './pages/Login';

import router from './router';
import { useEffect } from 'react';
import Layout from './layouts/Layout';
//自己写的全局状态
import state from './tools/state';



function App() {
  

  useEffect(()=>{

    console.log("当前登录状态为",state.isLogged);
  },[])
  return (

            <HashRouter>
              <Routes>
                
                <Route path="/"  element={<Layout />}>
                            {router.map((route, index) => {
                                if (index==0) return <Route index key={index} path={route.path} element={route.component} />
                                else return <Route key={index} path={route.path} element={route.component} />
                            })}
                </Route>
                <Route path="/login" element={<Login/>} />

                
              </Routes>              

            </HashRouter>
  );
}

export default App;
