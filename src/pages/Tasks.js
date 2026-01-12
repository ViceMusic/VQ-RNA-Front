
import { useEffect,useState } from "react";
import Block from "../tools/block";
import "./pages.css";
import { Collapse } from 'antd';
import { type } from "@testing-library/user-event/dist/type";
import { Margin, Padding } from "@mui/icons-material";
import { color } from "three/tsl";
import {RequestObjectBuilder} from "../tools/Request"
import { RequestClient } from "../tools/Http";
import state from "../tools/state";
import { useToast } from "../App";
import { server_path } from "../configure";
const { Panel } = Collapse;
const des_list=["Am", "Cm", "Gm", "Um", "m1A", "m5C", "m5U", "m6A", "m6Am", "Ψ"]
const RequestBuilder=new RequestObjectBuilder();   //生成请求构建对象
const client=new RequestClient(server_path) //生成对应的链接对象

const text="测试"
// 输入参数为task的读取代码内容
const convert_tasks_to_items=(tasks)=>{
    let results=[]
    console.log("其任务为：",tasks)
    try {
      results=tasks.map(task=>{
      return {
        key:task.taskID,
        label:task.timestamp ? new Date(Number(task.timestamp)).toLocaleString() : '?',
       children: <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '20px', 
                    padding: '10px' 
                  }}>
                      {task.results?.map((result, index) => (
                        <div 
                          key={index} 
                          style={{ 
                            height: '400px',           // 适中的固定高度
                            overflowY: 'auto',         // 内部上下滚动
                            border: '1px solid #e0e0e0', 
                            borderRadius: '12px',      // 圆框效果
                            padding: '16px', 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // 轻微阴影提升质感
                            backgroundColor: '#fff',
                            fontSize: 12
                          }}>
                              {/* 1. 序列展示区 - 标题 */}
                              <div style={{ fontWeight: 'bold', marginBottom: 4, color: '#666' }}>
                                Original Sequence #{index + 1}:
                              </div>
                              <div style={{ 
                                whiteSpace: 'nowrap', 
                                overflowX: 'auto', 
                                backgroundColor: '#f5f5f5', 
                                padding: '8px', 
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                                marginBottom: 12 
                              }}>
                                {result.original_seq ?? '?'}
                              </div>

                              {/* 2. 详情表格区 */}
                              <div style={{ marginBottom: 12 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                  <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                                    <tr style={{ borderBottom: '2px solid #eee' }}>
                                      <th style={{ padding: '4px' }}>Pos</th>
                                      <th style={{ padding: '4px' }}>Type</th>
                                      <th style={{ padding: '4px' }}>Base</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {result.details?.map(([pos, type, base], i) => (
                                      <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '4px' }}>{pos}</td>
                                        <td style={{ padding: '4px' }}>{des_list[type-1]}</td>
                                        <td style={{ padding: '4px', fontWeight: 'bold' }}>{base}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* 3. Motif 图片展示区 */}
                              {result.image && (
                                <div style={{ marginTop: 12, textAlign: 'center' }}>
                                  <div style={{ fontWeight: 'bold', marginBottom: 8, textAlign: 'left', color: '#666' }}>
                                    Motif Visualization:
                                  </div>
                                  <img
                                    style={{ 
                                      maxWidth: '100%', 
                                      borderRadius: '4px',
                                      border: '1px solid #f0f0f0'
                                    }}
                                    src={`data:image/svg+xml;base64,${result.image}`}
                                    alt={`motif-${index}`}
                                  />
                                </div>
                              )}
                            </div>
                          ))
                        }
                  </div>



      }
    })
    } catch (error) {
      results=[{
      key: '1',
      label: 'There some errors in server,please contach us or send the email to xarnudvilas@gmail.com',
      children: <p>{"错误"}</p>,
    }]
    }
    
    return results;
}

function Tasks() {
  const [res,setRes]=useState({})
  const [tasks, setTasks] = useState([])
  const { showToast } = useToast();

  //来点组件状态
  const [items, setItems] = useState([])

  const onChange = key => {
    console.log(key);
  };
  useEffect(()=>{
    return () => {
      // setRes(client.queryTasks(RequestBuilder.querytasks()))
    };

  },[])
    return (
      <div className="page" >
          <button 
            style={{margin:"10px",height:"50px",width:"400px",borderRadius:"5px", border:"none",backgroundColor:"#4CAF50",color:"white",fontSize:"20px",fontWeight:"bold"}}
            onClick={()=>{
              showToast({ type: 'success', message: 'You had submitted requesting, please wait and don`t repeat. ' });
              client
                .queryTasks(RequestBuilder.querytasks())
                .then(res => {
                  console.log(res)
                  showToast({ type: 'success', message: 'Tasks are retrieved successfully !. ' });
                  let item_arr=[]
                  if(res.tasks)item_arr=convert_tasks_to_items(res.tasks)
                  setItems(item_arr)

                  /*
                  # 任务结构如下图所示
                  results : [{…}]
                  taskID :  "d338ca44-0b25-472f-907a-2d9c7ab81ef6"
                  timestamp :  "1768063182285"
                  userID : "4f7c533e-6c21-48ce-9c54-e85182495f86"
                  */
                })
                .catch(err => {
                  showToast({ type: 'error', message: 'Please try again !' });
                  console.error("请求失败：", err)
                })

              }}> 
            Click This To Get My Tasks
          </button>
          <Block title="Tasks">
              <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
          </Block>

      </div >
    );
  }
  
  export default Tasks;