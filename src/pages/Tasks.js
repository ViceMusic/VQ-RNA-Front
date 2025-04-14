
import { useEffect,useState } from "react";
import Block from "../tools/block";
import "./pages.css";
import { Collapse } from 'antd';
import { type } from "@testing-library/user-event/dist/type";
import { Margin, Padding } from "@mui/icons-material";
import { color } from "three/tsl";

import state from "../tools/state";
import ws from "../tools/websocketHub";
const { Panel } = Collapse;

//下面
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
  "error":warning,
  "in_progress":waiting,
  "completed":finished
}

//传进来的是一个
const MethylationDisplay = (props) => {
  const data=props.data;
  const content=JSON.parse(data.content==" "?JSON.stringify({}):data.content);
  const startTime=data.startTime;
  const taskstate=data.state;
  const taskId=data.taskid;  

  //content的内部信息
  const type=content.type;
  const seqs=type==="mutil" ? content.seqs : [content.seqs]; // 处理单一或者多序列的情况
  const image=content.image; // 图片的链接
  const meth=content.meth; // 甲基化的类型
  const details=type==="mutil" ? content.detail:[eval(content.detail)]; // 甲基化的详细信息
  // 根据传入信息查看序列
  const base=["Am", "Cm", "Gm", "Um", "m1A", "m5C", "m5U", "m6A", "m6Am", "Ψ"];
  // 根据甲基化类型, 以及详细信息进行标红
  const markMethylatedPositions = (sequence,detail) => {
    let point=0;
    return sequence.split('').map((base, index) => {
      try{
        
        if(detail && detail.length>0 && detail[0] && detail[point] && index==detail[point][0]){
          point++;
          return  <span style={{color: "red",fontWeight: "bold"}}>{base}</span>
        }
        else 
              return base;

      }catch(e){
        console.log("查看任务出错",e)
      }
      
    });
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
        {content.message=="OK" ?
        //数据顺利
        <>
                {/* 第一行：任务信息 */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #ddd'
              }}>
                <span>Task Start Time: {startTime}</span>
                <span>Task ID: {taskId}</span>
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>State: {taskstate}</span>
              </div>

              {/* 甲基化序列展示 */}
              <div style={{
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                border: '1px solid #eee',
                lineHeight: '1.6',
                wordBreak: 'break-all',
                fontSize: '14px',
                overflow:"auto",
                height:"180px",
                backgroundColor:"#E9E9E9",
              }}>
                {seqs.map((seq, index) => (
                  <div key={index} style={{ marginBottom: '10px' , overflow:"auto",height:"100px",border:"1px solid #ddd",borderRadius:"5px",backgroundColor:"#fff"}}>
                    <strong>Sequence {index + 1}:</strong>
                    <div >{markMethylatedPositions(seq,details[index])}</div>
                  </div>
                ))}
              </div>

              {/* 甲基化数据表格 */}
              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  flex: '1',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                  }}>
                    <thead style={{
                      position: 'sticky',
                      top: '0',
                      backgroundColor: '#4CAF50',
                      color: 'white'
                    }}>
                      <tr>
                        <th style={{ padding: '10px', textAlign: 'left' }}>seq_index</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>site</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>location</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        details.map((detail,index)=>
                          detail.map((row) => (
                            <tr key={row.id} style={{
                              borderBottom: '1px solid #ddd',
                              backgroundColor: row.id % 2 === 0 ? '#f9f9f9' : 'white'
                            }}>
                              <td style={{ padding: '10px' }}>{index}</td>
                              <td style={{ padding: '10px' }}>{row[2]}</td>
                              <td style={{ padding: '10px' }}>{row[0]}</td>
                              <td style={{ padding: '10px', color: '#2196F3' }}>{base[row[1]-1]}</td>
                            </tr>
                          ))
    
    
                        )
                      }
                    </tbody>
                  </table>
                </div>

                {/* 图片展示区域 */}
                <div style={{
                  flex: '1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                  border: '1px solid #eee',
                  padding: '10px'
                }}>
                  <div style={{
                    textAlign: 'center',
                    color: '#666'
                  }}>
                    <ImageWithZoom src={"data:image/png;base64,"+image}></ImageWithZoom>
                    <p>motif</p>
                  </div>
                </div>


              </div>
        </>
        
        :
        //数据不顺利
        <>
        
          {/* 第一行：任务信息 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #ddd'
          }}>
            <span>Task Start Time: {startTime}</span>
            <span>Task ID: {content.taskid}</span>
            <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>State: Error</span>
          </div>
        </>
        }
    </div>
  );
};
const ImageWithZoom = ({ src, alt = "", width = "90%", height = "auto" }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* 原始图片 */}
      <img
        src={src}
        alt={alt}
        style={{
          width: width,
          height: height,
          cursor: 'pointer',
          borderRadius: '4px',
          transition: 'transform 0.2s',
          ':hover': {
            transform: 'scale(1.02)'
          }
        }}
        onClick={toggleZoom}
      />
      
      {/* 放大按钮（右上角） */}
      <button
        onClick={toggleZoom}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          ':hover': {
            background: 'rgba(0,0,0,0.8)'
          }
        }}
      >
        +
      </button>
      
      {/* 放大浮窗 */}
      {isZoomed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
          onClick={toggleZoom}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: '80vw',
              height: '60vh',
              objectFit: 'contain',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* 关闭按钮 */}
          <button
            onClick={toggleZoom}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '24px',
              cursor: 'pointer',
              ':hover': {
                background: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};


function Tasks() {
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    return () => {
      
    };

  },[])
    return (
      <div className="page" >
          <button 
            style={{margin:"10px",height:"50px",width:"400px",borderRadius:"5px", border:"none",backgroundColor:"#4CAF50",color:"white",fontSize:"20px",fontWeight:"bold"}}
            onClick={()=>{
              ws.send({email:state.getUser(),type:"user_tasks"});
              setTasks(state.data.tasks?[...state.data.tasks]:[])}}> 
              Click This To Get My Tasks
          </button>
          <Block title="Tasks">
              <Collapse defaultActiveKey={['0']} onChange={()=>{}}>
                {tasks.map((item,index)=>{
                  return (<Panel header={<div style={{display:"flex", alignItems:"center"}}>
                                            <div>{item.startTime} </div> 
                                            <div style={type_map[item.state]}>
                                              {item.state}
                                            </div>
                                         </div>} 
                                 key={index}>
                                <div>
                                  <MethylationDisplay data={item}/>
                                </div> 
                          </Panel>)
                })}
            </Collapse>
            
          </Block>

      </div >
    );
  }
  
  export default Tasks;