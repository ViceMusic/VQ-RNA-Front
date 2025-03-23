/*
  2025.3.23
  1. 该文件是整个网站的头部导航栏，包括左侧的功能栏以及右侧的用户登录信息
  2. 左侧功能栏包括Home, Usage, Tasks, Reference, About
*/

import { useNavigate } from 'react-router-dom';
import './layout.css';
import { SettingOutlined,HomeOutlined,AppstoreOutlined,CloudServerOutlined,FileSearchOutlined,ContactsOutlined } from '@ant-design/icons';
import { use, useState,useEffect } from 'react';
import { Dropdown } from 'antd';

//用户登入登出的下拉菜单
const items = [
  {
    key: '1',
    label: (
      <div style={{fontSize:"14px",width:"100px"}}>
        Personal Info
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div style={{fontSize:"14px",width:"100px"}}>
        Log Out 
      </div>
    ),
  },
];

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const navi=useNavigate();
  useEffect(()=>{
  },[])
  return (
    <>
      <div className='header'>
            {/*左侧功能栏以及UI*/}
            <div id="navigation" 
                style={{display: 'flex', 
                        justifyContent: 'space-around',
                        width: '40%',
                        fontSize: '20px',
                        alignItems: 'center',
                    }}>
                <div  style={{fontWeight:"bold",fontSize:"30px"}}  onClick={()=>navi("/")}>VQ-RNA</div>
                <div  onClick={()=>navi("/home")} ><HomeOutlined style={{padding:"3px"}}/>Home</div>
                <div  onClick={()=>navi("/usage")} ><AppstoreOutlined style={{padding:"3px"}}/>Usage</div>
                <div  onClick={()=>navi("/tasks")}><CloudServerOutlined style={{padding:"3px"}}/>Tasks</div>
                <div  onClick={()=>navi("/reference")}><FileSearchOutlined style={{padding:"3px"}}/>Reference</div>
                <div  onClick={()=>navi("/about")}><ContactsOutlined style={{padding:"3px"}}/>About</div>
            </div>
            {/*右侧的用户登录信息以及界面*/}
            <div id="author" style={{display: 'flex',paddingRight: '20px',fontSize: '30px',alignItems: 'center',cursor: 'pointer'}}>
              <Dropdown
                menu={{  items, }}
                placement="bottom"
              >
                <SettingOutlined
                  onMouseEnter={() => setIsHovered(true)} // 鼠标悬停时设置 spin 为 true
                  onMouseLeave={() => setIsHovered(false)} // 鼠标离开时设置 spin 为 false
                  spin={isHovered}/>
              </Dropdown>

            </div>
      </div>
      <div className='placeholder'/>
    </>
  );
}

export default Header;