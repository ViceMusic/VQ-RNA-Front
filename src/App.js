import logo from './logo.svg';
import './App.css';
import Header from './layouts/header';
import Content from './layouts/content';
import Footer from './layouts/footer';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (

        <BrowserRouter>
            <Header />
            <Content  />
            <Footer />
        </BrowserRouter>


  );
}

export default App;
