import './layout.css';
import { GithubOutlined,   UserOutlined } from '@ant-design/icons';
function Footer() {
  return (
    <div className='footer'>    
     <div> <UserOutlined /> Author : wenjia gao</div>
     <div> <GithubOutlined /> GITHUB : 1gao2 </div>
     
    </div>

  );
}

export default Footer;