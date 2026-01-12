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
import { useToast } from "../App";
import {RequestObjectBuilder} from "../tools/Request"
import { RequestClient } from "../tools/Http";
import { example } from "../tools/example";
import { server_path } from "../configure";
const { Dragger } = Upload;
const RequestBuilder=new RequestObjectBuilder();   //生成请求构建对象
const client=new RequestClient(server_path)

const example_base64=example

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
  width:"50%",
  backgroundColor:"rgba(0, 0, 0, 0.1)",
}
const input_block2={
  display:"flex",
  flexDirection:"column",
  height:"auto",
  margin:10,
  padding:10,
  height:400,
  width:"45%",
  backgroundColor:"rgba(0, 0, 0, 0.1)",
  alignItems:"center",
}

// Fasta Base64文件的处理方法

//切掉前缀
function stripBase64Prefix(str) {
  return str.includes(",") ? str.split(",")[1] : str;
}

function base64ToText(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

function parseFasta(fastaText) {
  const sequences = [];
  let current = null;

  fastaText.split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line) return;

    if (line.startsWith(">")) {
      if (current) sequences.push(current);
      current = {
        header: line.substring(1),
        sequence: ""
      };
    } else {
      current.sequence += line;
    }
  });

  if (current) sequences.push(current);
  return sequences;
}





//修饰类型的名字
const des_list=["Am", "Cm", "Gm", "Um", "m1A", "m5C", "m5U", "m6A", "m6Am", "Ψ"]
//多选框

function Usage_pending() {

  //设置修饰状态，这个将会决定我们调用何种修饰内容，因此首先是一个状态，其次是一个方法
  const [motifs,setMotifs]=useState([0,0,0,0,0,0,0,0,0,0])
  const changeMotifs=(index)=>{
    const arr=[...motifs]
    if(arr[index]==0) arr[index]=1;
    else arr[index]=0;
    setMotifs(arr);
  }

  //文件名称
  const [filename,setFilename]=useState("unuploded")

  //选择某种模式作为提交方案
  const [subModel,setSubModel]=useState(0); //0代表选择左侧的单序列提交, 1代表选择右侧的多序列提交

  const select=(index)=>{
    changeMotifs(index)
  }
  const selectAll=()=>{
    console.log(motifs)
    setMotifs([1,1,1,1,1,1,1,1,1,1]);
  }
  const unSelectAll=()=>{
    console.log(motifs)
    setMotifs([0,0,0,0,0,0,0,0,0,0]);
  }


  //我们的目标内容
  const [seq,setSeq]=useState('');
  const [base64String, setBase64String] = useState('');

  //上传文件，但是这里能做到的防护为：检查文件是否为空，检查文件是否为fasta结尾，文件加载错误
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("上传文件名称为",file.name)


    //如果文件不存在
    if (!file) return;
    //如果文件后缀不是fasta
    if(!file.name.endsWith(".fasta")) {
      alert("Please upload a appropriate fasta file")
      return;
    }
    const reader = new FileReader();
    //正常的上传逻辑
    reader.onload = (e) => {
      console.log(e)
      const base64 = e.target.result;
      setBase64String(base64);
      setFilename(file.name)
      console.log('Base64:', base64.slice(0, 100) + '...'); // 打印前100字符
    };
    //文件读取错误
    reader.onerror = (error) => {
      console.error('文件读取错误:', error);
    };

    reader.readAsDataURL(file); // 关键方法
  };

  //设置输入的文件内容
  const handleChange = (e) => {
    setSeq(e.target.value);
  };

  //提交单一的内容
  const submitSingle=()=>{
    const message=RequestBuilder.seq([seq],motifs)
    console.log(message)
    //发送请求
    client.submitSeq(message).then((value)=>{
      showToast({ type: 'success', message: 'Your task has been finish successfully! You can check the result in the "My Tasks" section. ' });
      console.log(value)
    }).catch((reason)=>{
      showToast({ type: 'error', message: 'Some Network breaking! Please try again. ' });
      console.log(reason)
    })

  }
  //提交fasta文件
  const submitFasta=(e)=>{
    const cleanedFasta=stripBase64Prefix(base64String)
    const fastaText = base64ToText(cleanedFasta);
    const records = parseFasta(fastaText);
    const seqs=records.map(item=>item.sequence)

    console.log(records[0].sequence);
    // "AUGCUAGCUAGCUAGC..."

    const message=RequestBuilder.fasta(seqs,motifs)
    console.log(message)
    //发送请求
    client.submitFasta(message).then((value)=>{
      showToast({ type: 'success', message: 'Your task has been finish successfully! You can check the result in the "My Tasks" section. ' });
      console.log(value)
    }).catch((reason)=>{
      showToast({ type: 'error', message: 'Some Network breaking! Please try again. ' });
      console.log(reason)
    })
  }

  //点击提交的内容
  const submit=()=>{

    //首先提示内容，提交成功/失败
    //然后进行查询
    if(motifs.includes(1)==false){
      showToast({ type: 'error', message: 'Please select at least one modification type ' });
      return;
    }
    else if(subModel==0 && seq!=''){ //上传单一序列，并且不为空
      showToast({ type: 'success', message: 'Your task has been submitted a single sequence successfully! You can check the result in the "My Tasks" section. ' });
      submitSingle();
    }
    else if(subModel==1 && base64String!=''){ //上传整个文件的内容，让后端自己处理
      showToast({ type: 'success', message: 'Your task has been submitted a fasta file successfully! You can check the result in the "My Tasks" section. ' });
      submitFasta();
    }
    else{
      showToast({ type: 'error', message: 'Please input or upload as correct format ' });
      console.log("没有对应的提交方式")
    }

  }

  const { showToast } = useToast();

  //一个暂时可能用不上的方法
  //const handleClick = () => { showToast({ type: 'success', message: '操作成功！' }); };

  //检查序列是否可靠（单纯检查序列内容）
  const checkFormat=()=>{
    if (!seq) {
      showToast({ type: 'error', message: 'Please input your sequence' });
      return false;
    }

    // 去除空格和换行
    const cleanSeq = seq.replace(/\s+/g, '').toUpperCase();

    // 长度检查
    if (cleanSeq.length < 51) {
      showToast({ type: 'error', message: "The sequence must be at least 51 characters long" });
      return false;
    }

    // 字符检查：只能包含 A、C、T、G
    if (!/^[ACTG]+$/.test(cleanSeq)) {
      showToast({ type: 'error', message: "The sequence can only contain the characters A, C, T, and G"});
      return false;
    }

    showToast({ type: 'success', message: "Format is correct!" });
    return true;
  }
  //提交方法，主要是提示正常内容
  const Submitted=()=>{
    showToast({ type: 'success', message: 'Your task has been submitted successfully! You can check the result in the "My Tasks" section. ' });
  }
  //界面的具体情况和逻辑
    return (
      <div className="page" >
          <Block title="Input target sequences" icon={<TagFilled style={{color:"white",fontSize:"20px",margin:5}}/>}>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%", height:"100%"}}>
              {/*左侧的栏目，直接输入序列*/}
              <div style={input_block} className={subModel==1?"unUse":""}
              onClick={()=>setSubModel(0)} >
                <div style={{fontSize:"20px",margin:"5px 0"}}>Enter the sequence with FASTA format:</div>
                <textarea style={{width:"90%", height:"100px", fontSize:"15px", padding:10}} onChange={handleChange} value={seq}></textarea>
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
              {/*右侧的栏目，需要上传文件*/}
              <div style={input_block2} className={subModel==0?"unUse":""} onClick={()=>{setSubModel(1);}}>
                <div style={{margin:"5px 0"}}>Or upload your data file:</div>
                
                <div class="upload-container">
                  <h2>Upload FASTA</h2>

                  {
                      base64String!=''
                        ?
                          <div class="custom-upload" >
                            <input type="file" id="fileInput" onChange={handleFileChange}/>
                            <label for="fileInput" class="upload-btn" style={{backgroundColor:"#FFA500"}}> Uploaded </label>
                          </div>
                        :
                          <div class="custom-upload">
                            <input type="file" id="fileInput" onChange={handleFileChange}/>
                            <label for="fileInput" class="upload-btn"> Upload </label>
                              
                          </div>
                  }
                  

                  

                  <div class="file-info" id="fileInfo">
                    <div class="file-name" id="fileName">{base64String!=''?"uploaded!:"+filename:"unselect"}</div>
                  </div>
                  <button  style={{margin:10, border:"none", padding:"5px", backgroundColor:"transparent", fontSize:"20px", borderBottom:"solid 1px"}} 
                                  onClick={
                                    (e)=>{
                                      //直接设置example即可
                                      setBase64String(example)
                                      setFilename("example.faste")

                                    }
                                    }>
                                  example
                              </button>

                </div>
    
              </div>
            </div>
          </Block>
          <Block title="Select motify type and Submission" >
            <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center",width:"100%", height:"100%"}}>
              <div style={{margin:"10px 0"}}>
                {des_list.map(
                  (item,index)=>
                    <Checkbox checked={motifs[index]} 
                      style={{fontSize:"16px", fontWeight:"bold",margin:"0 10px"}} 
                      onChange={()=>select(index)}>{item}
                    </Checkbox>
                )}
              </div>
              <div>
                <button onClick={()=>selectAll()} style={{backgroundColor:"#FFA5EE", height:"30px", width:"150px", margin:"0 20px", border:"none", borderRadius:"5px", color:"white", fontSize:"20px"}}>
                  Select All
                </button>
                <button onClick={()=>unSelectAll()} style={{backgroundColor:"#11B56E", height:"30px", width:"150px", margin:"0 20px", border:"none", borderRadius:"5px", color:"white", fontSize:"20px"}}>
                  Clear
                </button>
                <button style={{backgroundColor:"#FFA500", height:"30px", width:"90px", margin:"0 20px", border:"none", borderRadius:"5px", color:"white", fontSize:"20px"}} onClick={()=>{submit()}}>
                  submit
                </button>

              </div>

            </div>

          </Block>
          {/*
          <Block title="Submission">
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <input placeholder="Input your email" onChange={handle} style={{width:"100%", height:"50px", fontSize:"20px", margin:"10px", border:"solid gray 1px", paddingLeft:"10px", borderRadius:"10px",color:" rgba(0, 0, 0, 0.9)"}}/>
              
               
            </div>
          </Block>
          */}

      </div>
    );
  }
  
  export default Usage_pending;