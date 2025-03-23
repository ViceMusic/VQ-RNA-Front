import { useEffect, useState,useRef } from "react";

export function WheelContainer(props) {
    const [currentIndex, setCurrentIndex] = useState(0); 
    const isHoveredRef = useRef(false); 
    const [currentHeight,setCurrentHeight]=useState(0);
    const [childrens,setChildrens]=useState(props.children.filter((item)=>item.type.name=='WheelItem'));
    //目标, 首先完成轮播机制
    //解决插槽问题
    //最后解决调整大小的问题
    //解决监听器被创建了两次的问题: 首先空的挂载队列, 其次是在返回函数中清除一下监听器
    //还要解决鼠标过于灵敏的情况, 要使用节流机制实现
    //保证位置正确才能进行滑动
    //设置统一的格式
    //还要规定子元素必须为wheelitem, 否则不予以显示

    //useRef是个啥????, 为什么就有用了, current指针又是什么
    //dependency array是什么

    const slide=(event) => {
        //计算子元素数目
        let n =childrens.length
        if (isHoveredRef.current) {
            if (event.deltaY > 0) {
                // 向下滚动，切换到下一个元素
                setCurrentIndex((prevIndex) => {
                    if(prevIndex<n-1){
    
                        setCurrentHeight(countHeight(prevIndex+1))
                        return (prevIndex+1);
                    }
                    else{

                        setCurrentHeight(countHeight(prevIndex))
                        return prevIndex;
                    } 
                    
                }); 
            } else {
                // 向上滚动，切换到上一个元素
                setCurrentIndex((prevIndex) => {
                    if(prevIndex>0){

                        setCurrentHeight(countHeight(prevIndex-1))
                        return (prevIndex-1);
                    }
                    else{

                        setCurrentHeight(countHeight(prevIndex))
                        return prevIndex;
                    } 
                }); 
            }

            // 阻止默认滚动行为
            event.preventDefault();
        }
        
    }

    const countHeight=(index)=>{
        const heights=childrens.map((item)=>item.props.height?item.props.height:80);
        let sum=0;
        for(let i=0;i<index;i++){
            sum+=heights[i];
        }
        return sum;
    }

    useEffect(()=>{


        function throttle(fn, interval) {
            let lastTime = 0;
        
            return function(...args) {
                const context = this;
                const now = Date.now();
        
                if (now - lastTime >= interval) {
                    lastTime = now;
                    fn.apply(context, args);
                }
            };
        }


        const handleScroll = throttle(slide, 500);

        //设置事件监听
        window.addEventListener('wheel', handleScroll, { passive: false }); // passive: false 允许调用 preventDefault

        //取消监听
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };

    },[])

  return (
    <div >
      <div style={{
            overflow: 'hidden',
            height: `${props.height?props.height:80}${props.unith?props.unith:'px'}`, // 设置父元素高度
            width: `${props.width?props.width:300}${props.unitw?props.unitw:'px'}`,
            position: 'relative'
        }}
        onMouseOver={() => {
            isHoveredRef.current = true; // 更新 ref 的值
        }}
        onMouseLeave={() => {
            isHoveredRef.current = false; // 更新 ref 的值
        }}
        >
            <div style={{
                transition: 'transform 0.3s ease',
                transform: `translateY(${currentHeight*(-1)}${props.unith?props.unith:'px'})`, // 根据索引移动, 这个索引可能后面还要单独计算
                position: 'absolute', // 确保子元素使用绝对定位
                top: 0
            }}>
               {childrens}
            </div>
        </div>
      
    </div>
  );
}

export function WheelItem(props) {
   

  return (
      <div style={{
            height: `${props.height?props.height:80}${props.unith?props.unith:'px'}`, // 设置父元素高度
            width: `${props.width?props.width:300}${props.unitw?props.unitw:'px'}`,
        }}>
            {props.children}
        </div>
  );
}





