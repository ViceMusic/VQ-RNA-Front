import axios from "axios"
//发送post请求的方法
async function simplePost(data) {
    try {
      //const response = await axios.post('http://8.130.10.95/api/req', data);
      //return response.data;
      const postData = data;
  
      // 使用 fetch 发送 POST 请求到 /api/req
      fetch('https://inner.wei-group.net/vqrna/api/req', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)  // 转换为 JSON 字符串
      })
        .then(response => response.text())  // 获取响应体
        .then(data => {
          console.log('Response from server:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('请求失败:', error);
      return null;
    }
  }

export default simplePost;