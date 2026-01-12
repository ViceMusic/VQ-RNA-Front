import logo from './logo.svg';
import './App.css';
import Header from './layouts/header';
import Footer from './layouts/footer';
import { BrowserRouter, Routes, Route, Link, useNavigate,HashRouter, Outlet, Navigate } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

import Login from './pages/Login';

import router from './router';
import { useEffect } from 'react';
import Layout from './layouts/Layout';
//自己写的全局状态
import state from './tools/state';
import Toast from './tools/Toast';
import React from 'react';

//创建context上下文
const ToastContext = React.createContext();
//这个是用来操控上下文中数据的, 不能直接传递到下面去, 通过这个可以访问到value中传递的东西
export const useToast = () => useContext(ToastContext);



function App() {

  //关于展示区域这一块
  const [messages, setMessages] = useState([]);
  // 添加消息到队列，并设置定时器自动移除
  const showToast = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
    setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }, newMessage.duration || 10000);
  };

  useEffect(()=>{
    console.log("当前登录状态为",state.isLogged);
  },[])

  return (
      <ToastContext.Provider value={{showToast, messages}}>
            <HashRouter>
              <Toast messages={messages}/>
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
      </ToastContext.Provider>
  );
}

export default App;
