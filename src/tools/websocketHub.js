// 用于实现websocket的hub
// 主要用于管理websocket的连接和消息的发送和接收
// 1. 保持一个websocket连接,并且在后端断开链接的时候尝试重连(五次)
// 2. 对接收到的消息进行处理, notice进行全局通知, login需要直接返回, 其他按需求类型进行处理
// 3. 对外暴露一个接口, 可以传递参数向后端发送请求信息, 需要检测链接状态, 如果链接状态不对也是要全局播报的

//大概六点20到地方, 五点半到济南西


// 全局播报组件
// 部署在跟组件上, 一旦接收到消息, 就会出现几秒钟, 并且显示内容

import state from "./state";

const expose_request=(obj)=>{
    const type = obj.type;
    if(!type) {console.log("没有类型信息");return;}

    if(type=="login"){
        console.log("登陆成功")
        console.log("登录成功",obj.data)
        
    }
    else if(type=="register"){
        console.log("登录没成功, 但是注册成功了")

    }
    else if(type=="notice"){
        console.log("暂时不支持全局内容播报")

    }
    else if(type=="user_task"){
        //更新任务信息
        const data = obj.data;
        console.log("更新任务信息",data)
        state.setData(data)
    }
    else{
        console.log("没有对应的处理函数")
    }

}


class SimpleWebSocket {

    //根据url创建对应链接
    constructor(url) {
      this.url = url;
      this.socket = null;
      
      
      // 初始化连接
      this.connect();
    }

    connect() {
      this.socket = new WebSocket(this.url);
      
      // 连接断开时自动重连
      this.socket.onclose = () => {
        console.log('连接断开，尝试重新连接...');
        setTimeout(() => this.connect(), 3000);
      };
      
      // 错误处理
      this.socket.onerror = (error) => {
        console.error('WebSocket 错误:', error);
      };

      //查看建立链接的过程
      this.socket.onopen = () => {
        console.log('WebSocket 连接已建立');
      };

      //处理接收到的数据
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data); //自动将其转化为对象格式了
          state.setData(data) //更新数据
          console.log('接收到消息:', data);
          expose_request(data); // 处理接收到的消息
        } catch (error) {
          console.error('消息解析失败:', error);
        }
      }
    }
    

    send(data) {
      // 检查连接状态
      if (this.socket.readyState !== WebSocket.OPEN) {
        console.warn('连接未就绪，消息发送失败');
        return;
      }
      
      // 序列化并发送数据
      try {
        const jsonString = JSON.stringify(data);
        this.socket.send(jsonString);
      } catch (error) {
        console.error('数据序列化失败:', error);
      }
    }
    

    close() {
      this.socket.close();
    }
  }
  
  // 使用示例
  // const ws = new SimpleWebSocket('ws://example.com/socket');
  // ws.send({ message: 'Hello' });

console.log('websocketHub.js: 连接已建立')

//const ws = new SimpleWebSocket('wss://8.130.10.95:8080');

const ws={}


export default ws; //抛出链接对象