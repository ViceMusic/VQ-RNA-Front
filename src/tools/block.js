/*
  Block组件, 用于展示一个块, 有一个标题和一个icon, 用于展示一个块
  title: string, 块的标题
*/
import "./tools.css";
import { TagFilled } from '@ant-design/icons';
function Block(props) {
    return (
      <div  className="block-container" >
          <div className="block-header">
            <div style={{backgroundColor:"#FFA500",position:"absolute",height:"100%", width:"8px", top:"0",left:0}} />
            <div style={{color:"white", fontSize:"20px", fontWeight:"bold", marginLeft:"15px", display:"flex", alignItems:"center"}}>
              {props.icon}
              <div style={{padding:0}}>{props.title?props.title:"default"}</div>
            </div>
          </div>
          <div className="placeholder"/>
          {props.children}
      </div>
    );
  }
  
export default Block;