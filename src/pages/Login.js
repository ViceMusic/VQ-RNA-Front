import React from "react";
import { useState,useEffect } from "react";   
import { useNavigate } from "react-router-dom";
import state from "../tools/state";
import simplePost from "../tools/httpHub";

function Login() {

    const navi=useNavigate(); // 使用 useNavigate 钩子来获取导航函数
    const [inputValue, setInputValue] = useState(""); // 定义一个状态变量 inputValue 和对应的更新函数 setInputValue
    const handleChange = (e) => {
        setInputValue(e.target.value);
      };
    useEffect(() => {
        // 这里可以放置一些初始化的代码，比如获取用户信息等
        console.log("Login component mounted");
    }, []); // 空依赖数组表示只在组件挂载时执行一次
    return (
       <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                height:"100vh",
                width:"100vw",
                backgroundColor:"#BE97C6",
                color:"black"}}  className={"magic-background"}>
            <div style={{fontSize:"72px", fontWeight:"bold", margin:"20px",color:"#7600ad",zIndex:"100"}}>Welcome to VQ-RNA</div>
            <input type="text" 
                    placeholder="Input your email" 
                    style={{margin:10, height:"50px",width:"600px", border:"none", borderRadius:"5px", textAlign:"center",zIndex:"100"}} value={inputValue}  
                    onChange={handleChange} className="fade-in"/>
            <button
            className="fade-in"
             style={{backgroundColor:"#FFA500",zIndex:"100", color:"white", border:"none", borderRadium:"5px", fontWeight:"bold", fontSize:"20px", height:"45px", width:"150px"}}
            onClick={()=>{
                if(inputValue!==""){
                  state.login(inputValue); 
                  navi("/")
                  
                  
                }else{
                  alert("Please Input you Email")
                }
              }
              }

              >dd</button>
        

       </div>
    );
  }
  
  export default Login;