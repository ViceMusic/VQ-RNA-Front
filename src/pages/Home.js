import { EffectComposer } from "three/examples/jsm/Addons.js";
import { WheelContainer, WheelItem } from "../tools/wheel";
import { useEffect } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import "./pages.css";
import { ExperimentOutlined,BulbOutlined,DeploymentUnitOutlined,PieChartFilled,SlidersFilled } from '@ant-design/icons';
import { red } from "@mui/material/colors";

function Home() {
   useEffect(()=>{
    //内容
    const textElement = document.getElementById('vq-rna');
    const text = textElement.textContent; // 获取文本内容
    textElement.innerHTML = ''; // 清空内容

    // 将每个字符包裹在 span 中
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        textElement.appendChild(span);
    }

    const spans = textElement.querySelectorAll('span');
    let currentIndex = 0;

    // 高亮函数
    function highlightNext() {
        // 移除当前字符的高亮
        spans[currentIndex].classList.remove('highlight');

        // 移动到下一个字符
        currentIndex = (currentIndex + 1) % spans.length;

        // 高亮下一个字符
        spans[currentIndex].classList.add('highlight');
    }

    // 初始化高亮
    spans[currentIndex].classList.add('highlight');

    // 设置定时器，每隔 1 秒切换高亮字符
    setInterval(highlightNext, 500);

    //球体
    const container = document.getElementById('threejs-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400); // 设置渲染器大小为 100px × 100px
    container.appendChild(renderer.domElement);

    renderer.setClearColor(0x107E64); // 0x00ff00 是绿色的十六进制值
    renderer.setClearAlpha(0); // 设置背景透明度为 0（完全透明）

    const headGeometry = new THREE.SphereGeometry(3, 12, 12); // 低多边形球体
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0x4B5267, wireframe: true });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    scene.add(head);
    camera.position.z = 5;
    function animate() {
        requestAnimationFrame(animate);
        head.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    // 启动动画
    animate();

    return ()=>{
      container.removeChild(renderer.domElement);

      // 销毁几何体、材质和网格
      headGeometry.dispose();
      headMaterial.dispose();
      scene.remove(head);

      // 销毁渲染器
      renderer.dispose();


    }
   },[])
    return (
          <div>
              <WheelContainer height={90} width={100} unith="vh" unitw="vw" >
                <WheelItem height={90} width={100} unith="vh" unitw="vw" >
                  <div style={{display: "flex", justifyContent: "center",alignItems: "center",backgroundColor: "#BE97C6",height: "100%",width: "100%"}}>
                    <div className="item item1">
                      <div className="item-flex">

                          <div>
                              <h3> · Intuitive Visualization: </h3>
                              <p> Support for the visualization of prediction performance across 10 common RNA modification types.</p>
                          </div>
                          <ExperimentOutlined className="icon-item" style={{color:"#403D58"}}/>
                          

                      </div>

                      <div className="item-flex">

                          <div>
                            <h3>· Advanced Deep Learning Methods: </h3>
                              <p>  Multi-layer convolutional neural networks, VQ-VAE, Transformer, and more.</p>
                          </div>
                          <BulbOutlined className="icon-item" style={{color:"#F2EFEA"}}/>
                          

                      </div>

                      <div className="item-flex">

                          <div>
                              <h3> · Biologically meaningful interpretability:</h3>
                              <p>  VQ-RNA can identify informative motif patterns and construct an interpretable feature spectrum for each type of RNA modification.</p>
                          </div>
                          <DeploymentUnitOutlined className="icon-item" style={{color:"#FC7753"}}/>

                          

                      </div>




                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column", 
                      justifyContent: "center",
                      alignItems: "center", 
                      paddingLeft: "50px",paddingRight: "50px",

                      }}>
                        <div id="threejs-container" ></div>
                        <div style={{fontSize: "48px"}} id="vq-rna">VQ-RNA</div>
                        <button className="info-button" style={{fontSize: "24px"}} onClick={()=>{window.location.href="/usage"}}>
                            GET START 
                        </button>
                    </div>
                    <div className="item item2">
                        <div className="item-flex">
                            <PieChartFilled className="icon-item" style={{color:"#66D7D1"}}/>
                            <div>
                                <h3> · One-Stop Solution: </h3>
                                <p> End-to-end model training, optimization, and prediction.</p>
                            </div>
                           
                        </div>
                        <div className="item-flex">
                            <SlidersFilled className="icon-item" style={{color:"#DBD56E"}}/>
                            <div>
                                <h3> · Optimized Hardware: </h3>
                                <p> VQ-RNA are fully GPU-based, significantly accelerating training time.</p>
                            </div>
                        </div>


                    </div>
                  </div>
                </WheelItem >
                <WheelItem height={90} width={100} unith="vh" unitw="vw">
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", 
                      }}>
                      <div class="info">
                        <h3> What is VQ-RNA?</h3>
                        <p>
                            VQ-RNA is a user-friendly interpretable deep-learning platform for RNA sequence modification analysis, such as RNA modification sites prediction and motif recognition based on In silico saturation mutagenesis (ISM). VQ-RNA supports site prediction for ten common RNA modifications (Am, Cm, Gm, Um, m1A, m5C, m5U, m6A, m6Am, Ψ) and offers interpretability analyses. We support modification site prediction for RNA sequences longer than 51 bp. To achieve this, we employ a sliding window approach, starting predictions from the 25th position onward. Due to the constraints of the model architecture and the need to ensure result reliability, predictions cannot be made for the first and last 25 positions, and only the intermediate region is presented. We identify key bases or regions with higher importance in the model by simulating mutations, aligning them with biologically relevant motifs, and visualizing the results.
                        </p>
                        <p>Our platform is continuously evolving,
                            and we plan to introduce a file upload feature that allows batch processing of
                            multiple sequences for prediction and motif identification.
                            This enhancement is expected to improve motif recognition accuracy, as it has been shown
                            to be more reliable when based on multiple sequences. Additionally,
                            we will also incorporate a TF-IDF-based RNA modification specificity analysis,
                            providing a clear and quantitative visualization of the distinctions among different RNA modification types.
                        </p>
                        <button class="info-button" onclick="window.location.href='http://8.130.10.95:8000/usage'">
                            GET START 
                        </button>
                    </div>
                    <img src="/zhuye.png" id="zhuye"/>


                    </div>
                </WheelItem>
              </WheelContainer>
          </div>
    );
  }
  
  export default Home;