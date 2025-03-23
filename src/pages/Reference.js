import Block from "../tools/block";
import "./pages.css";

function Refer(props){
  return(
    <div className="refer" style={{display:"flex", flexDirection:"column",justifyContent:"space-between",backgroundColor:"white", width:"90%", borderRadius:"5px", padding:"10px", margin:"10px",border:"none",borderLeft:"solid 5px #FFA500", height:"auto",minHeight:"150px",borderBottom:"solid 1px"}}>
      <div style={{fontSize:"20px", fontWeight:"bold"}}>{props.title}</div>
      <div style={{textTransform:"capitalize"}}>{props.author}</div>
      <div style={{fontStyle:"italic", fontSize:"12px"}}>{props.journey}</div>
      <div style={{fontSize:"14px"}}>[<a href="">FULL TEXT</a>][<a href="">PDF</a>]</div>
    </div>
  )
}

function Reference() {
    return (
      <div className="page" style={{}} >
          <div className="light-trail" style={{margin:"5px",fontSize:"40px",fontWeight:"bold",color:"white"}}>References</div>
          <div className="whole-page">
            <Refer title="Discrete latent embedding of single-cell chromatin accessibility sequencing data for uncovering cell heterogeneity" author="Cui, X., et al." journey="Nature Computational Science"/>
            <Refer title="Moss-m7G: A motif-based interpretable deep learning method for RNA N7-methlguanosine site prediction." author="Zhao, Y., et al." journey="Journal of Chemical Information and Modeling"/>
            <Refer title="Neural discrete representation learning." author="Van Den Oord, A. and O. Vinyals" journey="Advances in neural information processing systems"/>
            <Refer title="Attention-based multi-label neural networks for integrated prediction and interpretation of twelve widely occurring RNA modifications." author="Song, Z., et al." journey="Nature communications"/>
            <Refer title="fastISM: performant in silico saturation mutagenesis for convolutional neural networks." author="Nair, S., et al." journey="Bioinformatics"/>
          </div>
      </div>
    );
  }
  
  export default Reference;

/*
哈哈哈: 03-23 17:01:36
, . , 2024. 4(5): p. 346-359.

哈哈哈: 03-23 17:01:55
,  , 2024. 64(15): p. 6230-6240.

哈哈哈: 03-23 17:03:08
,  , 2017. 30.

哈哈哈: 03-23 17:03:20
,  , 2021. 12(1): p. 4011.

哈哈哈: 03-23 17:05:34
,  , 2022. 38(9): p. 2397-2403.

*/