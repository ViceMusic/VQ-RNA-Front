export class RequestClient {
  constructor(baseURL) {
    // 末尾自动去掉 '/'，防止重复
    this.baseURL = baseURL.replace(/\/+$/, "");
  }

  // 核心请求方法
  async _post(path, bodyObj) {
    const url = `${this.baseURL}${path}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json(); // 自动解析为 js 对象，所以这里
  }

  // === 具体接口 ===

  //1.发送单一序列的计算请求
  submitSeq(bodyObj) {
    return this._post("/submit/seq", bodyObj);
  }
  
  //2.发送一整个fasta文件的请求
  submitFasta(bodyObj) {
    return this._post("/submit/fasta", bodyObj);
  }

  //3.查询当前用户的所有任务的请求，暂时不设置删除吧就
  queryTasks(bodyObj){
    return this._post("/query/tasks", bodyObj);
  }
}
