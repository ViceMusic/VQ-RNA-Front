import { UserManager } from "./User";

//构建请求的方法
//该类并不生产请求，而是生产请求体，也就是message部分
/*
    {
      type: "request",
      op: "submit",
      userid:this.user.getUserId(),
      payload: {
        data_type: dataType,
        task_id: this.generateUUID(),
        InfomationBody:InfomationBody,
        motifs:motifs,
        timestamp: Date.now(),
      },
    };
*/
//具体发送请求的方法请详见Http.js
export class RequestObjectBuilder {
  constructor() {
    this.user=new UserManager()
  }

  generateUUID() {

    // 退化方案（简单实现，兼容旧环境）
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  buildPayload(dataType, InformationBody, motifs) {
    return {
      type: "request",
      op: "submit",
      userid:this.user.getUserId(),
      payload: {
        data_type: dataType,
        task_id: this.generateUUID(),
        InformationBody:InformationBody,
        motifs:motifs,
        timestamp: Date.now(),
      },
    };
  }

  seq(sequence, motifs = [1,1,1,1,1,1,1,1,1,1]) {
    return this.buildPayload("seq", sequence, motifs);
  }

  fasta(fastaString, motifs = [1,1,1,1,1,1,1,1,1,1]) {
    return this.buildPayload("fasta", fastaString, motifs);
  }

  querytasks(){
    return {
      type: "request",
      op: "query",
      userid:this.user.getUserId(),
      payload: {
        data_type: "tasks",  //获取全部的任务信息
        timestamp: Date.now(),
      },
    };
  }

}
