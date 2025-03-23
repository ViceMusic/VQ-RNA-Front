
import { useEffect,useState } from "react";
import Block from "../tools/block";
import "./pages.css";
import { Collapse } from 'antd';
import { type } from "@testing-library/user-event/dist/type";
import { Margin, Padding } from "@mui/icons-material";
import { color } from "three/tsl";
const { Panel } = Collapse;

const warning={
  backgroundColor:"red",
  fontSize:"10px",
  fontWeight:"bold",
  padding:"2px",
  color:"white",
  fontWeight:"bold",
  width:"50px",
  textAlign:"center",
  borderRadius:"5px",
  margin:" 0 20px"
}
const waiting={
  backgroundColor:"#FFA500",
  fontSize:"10px",
  fontWeight:"bold",
  padding:"2px",
  color:"white",
  fontWeight:"bold",
  width:"50px",
  textAlign:"center",
  borderRadius:"5px",
  margin:" 0 20px"
}
const finished={  
  backgroundColor:"green",
  fontSize:"10px",
  fontWeight:"bold",
  padding:"2px",
  color:"white",
  fontWeight:"bold",
  width:"50px",
  textAlign:"center",
  borderRadius:"5px",
  margin:" 0 20px"
}
const type_map={
  "warning":warning,
  "waiting":waiting,
  "finished":finished
}


function Tasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
       //获取队列
       setTasks([
         {name:"Task1",description:"This is task1",type:"warning"},
         {name:"Task2",description:"This is task2",type:"waiting"},
         {name:"Task3",description:"This is task3",type:"finished"},
         {name:"Task4",description:"This is task4",type:"warning"},
         {name:"Task5",description:"This is task5",type:"waiting"},
         {name:"Task6",description:"This is task6",type:"finished"},
       ])
  },[])
    return (
      <div className="page" >
          <Block title="Tasks">
              <Collapse defaultActiveKey={['0']} onChange={()=>{}}>
                {tasks.map((item,index)=>{
                  return (<Panel header={<div style={{display:"flex", alignItems:"center"}}>
                                            <div>{item.name} </div> 
                                            <div style={type_map[item.type]}>
                                              {item.type}
                                            </div>
                                         </div>} 
                                 key={index}>
                                <div>
                                  具体任务信息的展示
                                  {item.description}
                                </div> 
                          </Panel>)
                })}
            </Collapse>
            
          </Block>

      </div >
    );
  }
  
  export default Tasks;