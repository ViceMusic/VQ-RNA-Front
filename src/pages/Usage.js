import { min, sub } from "three/tsl";
import Block from "../tools/block";
import { TagFilled } from '@ant-design/icons';
import "./pages.css";
import { height, margin, padding, width } from "@mui/system";
import { InboxOutlined } from '@ant-design/icons';
import { Input, message, Upload } from 'antd';
import { Checkbox } from 'antd';
import { useState } from "react";
import state from "../tools/state";
import { useRef } from "react";
const { Dragger } = Upload;



//文件的上传逻辑都写到这里了, 这个是一个antd封装好的方法, 具体查看ai或者文档
const props = {
  
};
const input_block={
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-around",
  height:"auto",
  margin:10,
  padding:10,
  height:400,
  width:"45%",
}
const input_block2={
  display:"flex",
  flexDirection:"column",
  height:"auto",
  margin:10,
  padding:10,
  height:400,
  width:"45%",
}

// 上传文件



//修饰类型的名字
const des_list=["Am", "Cm", "Gm", "Um", "m1A", "m5C", "m5U", "m6A", "m6Am", "Ψ"]
//多选框

function Usage() {
  const [des0,setDes0]=useState(0);
  const [des1,setDes1]=useState(0);
  const [des2,setDes2]=useState(0);
  const [des3,setDes3]=useState(0);
  const [des4,setDes4]=useState(0);
  const [des5,setDes5]=useState(0);
  const [des6,setDes6]=useState(0);
  const [des7,setDes7]=useState(0);
  const [des8,setDes8]=useState(0);
  const [des9,setDes9]=useState(0);
  const [display,setDisplay]=useState(false);
  const [email,setEmail]=useState("");

  // 这个是关于email的内容
  const [inputValue, setInputValue] = useState(""); // 定义一个状态变量 inputValue 和对应的更新函数 setInputValue
  const handle = (e) => {
      setInputValue(e.target.value);
    };

  //选择某种模式作为提交方案
  const [subModel,setSubModel]=useState(0); //0代表选择左侧的单序列提交, 1代表选择右侧的多序列提交


  const getDes=()=>{
    let dess=[];
    for(let i=0;i<10;i++){
      const temp=eval('des'+i);
      dess.push(temp);
    }
    return dess;
  }
  const select=(index)=>{
    const temp=eval('des'+index);
    const setTemp=eval('setDes'+index);
    setTemp(temp==1?0:1);
    
  }
  const selectAll=()=>{
    for(let i=0;i<10;i++){
      eval('setDes'+i+"(1)")
    }

  }
  //文件上传
  const [seq,setSeq]=useState('');
  const [base64String, setBase64String] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64 = e.target.result;
      setBase64String(base64);
      console.log('Base64:', base64.slice(0, 100) + '...'); // 打印前100字符
    };

    reader.onerror = (error) => {
      console.error('文件读取错误:', error);
    };

    reader.readAsDataURL(file); // 关键方法
  };
  const handleChange = (e) => {
    setSeq(e.target.value);
  };

  //管理提交方式:
  const submitSingle=()=>{
    const temp={
      type:"seq",
      body:seq,
      email:state.getUser(),
    }
    fetch('http://8.130.10.95:8080/api/req', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp)  // 转换为 JSON 字符串
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }
  const submitFasta=()=>{
    console.log("上传的文件",base64String);
    const temp={
      type:"file",
      body:base64String.split(',')[1], // "ABC123...",
      email:state.getUser(),
    }
    fetch('https://inner.wei-group.net/vqrna/api/req', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp)  // 转换为 JSON 字符串
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  }
  const submit=()=>{
    console.log("内容",state.getUser())
    if(subModel==0){
      submitSingle();
    }
    else if(subModel==1){
      submitFasta();
    }
    else{
      console.log("没有对应的提交方式")
    }

  }

  const checkFormat=()=>{
    if (!seq) {
      alert("please input your sequence");
      return false;
    }

    // 去除空格和换行
    const cleanSeq = seq.replace(/\s+/g, '').toUpperCase();

    // 长度检查
    if (cleanSeq.length < 51) {
      alert("The sequence must be at least 51 characters long");
      return false;
    }

    // 字符检查：只能包含 A、C、T、G
    if (!/^[ACTG]+$/.test(cleanSeq)) {
      alert("The sequence can only contain the characters A, C, T, and G");
      return false;
    }

    alert("Sequence format is correct!");
    return true;


  }

    return (
      <div className="page" >
          <Block title="Input target sequences" icon={<TagFilled style={{color:"white",fontSize:"20px",margin:5}}/>}>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"90%", height:"100%"}}>
              <div style={input_block} className={subModel==1?"unUse":""}
              onClick={()=>setSubModel(0)} >
                <div style={{fontSize:"20px",margin:"5px 0"}}>Enter the sequence with FASTA format:</div>
                <textarea style={{width:"100%", height:"100px", fontSize:"15px", padding:10}} onChange={handleChange} value={seq}></textarea>
                <div style={{fontSize:"12px",margin:"5px 0", fontWeight:"bold"}}>
                  Please input and ensure one sequence with the same format as example data (If you want display your result in 3Dmol, 
                  please give PDB id and chain id and use 'yes' or 'no' after '-' to tell whether your title have PDB id and chain id, such as 
                  {"> "}1a81_A-yes), while single sequence must be continual without blank space and line breaking, and the title of sequence is 
                  also need to be continual without blank space and line breaking. Besides, the max length of input sequence is limited to be less than 1700, 
                  otherwise the task would fail
                </div>
                <div>
                  {/*两个按钮, 分别是这个和哪个, 检查和更新seq的内容*/}
                  <button style={{margin:10, border:"none", padding:"5px", backgroundColor:"#FFA500", fontSize:"20px", color:"white", borderRadius:"5px"}} onClick={()=>{checkFormat()}}>Check Format</button>
                  <button  style={{margin:10, border:"none", padding:"5px", backgroundColor:"transparent", fontSize:"20px", borderBottom:"solid 1px"}} onClick={(e)=>{setSeq("ACTGTCATGACTAGCATGACTAGCATGATCATGACTACGATCAACTGTCATGACTAGCATGACTAGCATGATCATGACTACGATCA");console.log(seq)}}>example</button>
                </div>
              </div>
              <div style={input_block2} className={subModel==0?"unUse":""} onClick={()=>{setSubModel(1);}}>
                <div style={{margin:"5px 0"}}>Or upload your data file:</div>
                
                <div class="upload-container">
                  <h2>Upload FASTA</h2>
                  
                  <div class="custom-upload">
                    <input type="file" id="fileInput" onChange={handleFileChange}/>
                    <label for="fileInput" class="upload-btn">Upload</label>
                  </div>
                  

                  <div class="file-info" id="fileInfo">
                    <div class="file-name" id="fileName">{base64String!=''?"uploaded!":"unselect"}</div>
                  </div>

                </div>
    
              </div>
            </div>
          </Block>
          <Block title="Select motify type" >
            <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center",width:"100%", height:"100%"}}>
              <div style={{margin:"10px 0"}}>
                {des_list.map((item,index)=><Checkbox checked={eval('des'+index)} disabled={display} style={{fontSize:"16px", fontWeight:"bold",margin:"0 10px"}} onChange={()=>select(index)}>{item}</Checkbox>)}
              </div>
              <div>
                 <button onClick={()=>selectAll()} style={{backgroundColor:"#FFA5EE", height:"30px", width:"150px", margin:"0 20px", border:"none", borderRadius:"5px", color:"white", fontSize:"20px"}}>
                  Select All
                </button>

              </div>

            </div>

          </Block>
          <Block title="Submission">
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <input placeholder="Input your email" onChange={handle} style={{width:"100%", height:"50px", fontSize:"20px", margin:"10px", border:"solid gray 1px", paddingLeft:"10px", borderRadius:"10px",color:" rgba(0, 0, 0, 0.9)"}}/>
              <button style={{backgroundColor:"#FFA500", height:"30px", width:"90px", margin:"0 20px", border:"none", borderRadius:"5px", color:"white", fontSize:"20px"}} onClick={()=>submit()}>submit</button>
               
            </div>
          </Block>

      </div>
    );
  }
  
  export default Usage;