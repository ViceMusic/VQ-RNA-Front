import React from "react";
import { useState,useEffect } from "react";   
import { useNavigate } from "react-router-dom";
import state from "../tools/state";
import simplePost from "../tools/httpHub";

function Login() {

    const navi=useNavigate(); // 使用 useNavigate 钩子来获取导航函数
    useEffect(() => {
        
    }, []); 
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
            {/*登录按钮*/}
            <button
            className="fade-in"
             style={{backgroundColor:"#FFA500",zIndex:"100", color:"white", border:"none", borderRadium:"5px", fontWeight:"bold", fontSize:"20px", height:"45px", width:"150px"}}
            onClick={()=>{ navi("/") } }>Let Start！</button>
        

       </div>
    );
  }
  
  export default Login;