import './layout.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import router from "../router"
function Content() {
  return (
    <div className='content'>
            <Routes>
                {router.map((route, index) => {
                    return <Route key={index} path={route.path} element={route.component} />
                })}
            </Routes>
    </div>
  );
}

export default Content;