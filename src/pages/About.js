import Block from "../tools/block";
import "./pages.css";
function About() {
    return (
      <>
      <div className="light-trail" style={{margin:"5px",fontSize:"40px",fontWeight:"bold"}}>Contact Us</div>
            <div className="refer" style={{display:"flex",backgroundColor:"white", width:"90%", borderRadius:"5px", padding:"10px", margin:"10px",border:"none",borderLeft:"solid 5px #FFA500", height:"auto",minHeight:"150px",borderBottom:"solid 1px"}}>
                <div style={{marginRight:"20px",}}>
                      <img style={{width:"300px",height:"300px"}} src="./image.png"></img>
                </div>
                <div style={{ display:"flex", justifyContent:"space-around", flexDirection:"column"}}>
                  <div style={{fontSize:"28px", fontWeight:"bold", color:"#8661c1"}}>Wei Leyi</div>
                  <div style={{textTransform:"capitalize"}}>Post Code: 250101</div>
                  <div style={{fontStyle:"italic", fontSize:"12px"}}>E-mail: weileyi@sdu.edu.cn</div>
                  <div style={{fontSize:"14px"}}>Room 404,Joint SDU-NTU Centre for Artificial Intelligence Research (C-FAIR) Shandong University, Jinan, Shandong, China</div>
                </div>
            </div>
      </>
     
          
      
    );
  }
  
  export default About;