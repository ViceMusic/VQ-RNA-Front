import { EffectComposer } from "three/examples/jsm/Addons.js";
import { WheelContainer, WheelItem } from "../tools/wheel";
import { useEffect,useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import "./pages.css";
import { ExperimentOutlined,BulbOutlined,DeploymentUnitOutlined,PieChartFilled,SlidersFilled } from '@ant-design/icons';
import { red } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';

function Home1() {
   const navi=useNavigate(); // 使用 useNavigate 钩子来获取导航函数
   useEffect(()=>{
    
   },[])
    return (
          <div>

                  <div style={{display: "flex", justifyContent: "center",alignItems: "center",backgroundColor: "#BE97C6",height: "90vh",width: "100vw"}}>
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
                        <div id="threejs-container">
                            <div class="sphere">
                            <div class="circle meridian"></div>
                            <div class="circle meridian"></div>
                            <div class="circle meridian"></div>
                            <div class="circle meridian"></div>
                            <div class="circle meridian"></div>
                            <div class="circle meridian"></div>
                            <div class="circle parallel"></div>
                            <div class="circle parallel"></div>
                            <div class="circle parallel"></div>
                            <div class="circle parallel"></div>
                            <div class="circle parallel"></div>
                            <div class="circle parallel"></div>
                            </div>
                        </div>
                        <div style={{fontSize: "48px"}} id="vq-rna">VQ-RNA</div>
                        <button className="info-button" style={{fontSize: "24px"}} onClick={()=>{navi("/usage"); }}>
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

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", 
                        height:'90vh',
                        width:'100vw'
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
                        <button class="info-button"  onClick={()=>{navi("/usage"); }}>
                            GET START 
                        </button>
                    </div>
                    <img src="./zhuye.png" id="zhuye"/>


                    </div>

          </div>
    );
  }
  

function SafeRenderer({ children }) {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    return isMounted ? children : null;
  }
function Home({ children }) {
    return (
        <SafeRenderer>
         <Home1/>
        </SafeRenderer>
    )
}
  export default Home;