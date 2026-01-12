//生成用户信息
export class UserManager {
  constructor(storageKey = "user_id") {
    this.storageKey = storageKey;
    this.userId = this._ensureUserId();
  }

  // 对外暴露的获取接口（总是保证返回有效的 user_id）
  getUserId() {
    this.userId = this._ensureUserId();
    return this.userId;
  }

  // 内部方法：负责读取或生成 user_id
  _ensureUserId() {
    let uid = localStorage.getItem(this.storageKey);
    if (!uid) {
      uid = this._generateUUID();
      localStorage.setItem(this.storageKey, uid);
    }
    return uid;
  }

  // uuid-userid
  _generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  //暂时未能启用的方法：删除当前userid以及名下的所有任务
  //Notice!!:这个方法需要注意一个问题，如果删除了用户名下的任务中，包含一个正在运行中的，等那边运行完尝试插入数据库发现无法插入了怎么办
  //Notice2：另一个可以扩展的问题，如果有一个用户足够恶意，上传了一个巨大的案例，那么这个时候如果用户删掉了自己的客户信息，但是模型仍然会
  //         继续执行这个任务，造成其他任务的大量堵塞，因此在模型的推理部分需要加上强制中断内容
  closeUserId(){

  }
}
