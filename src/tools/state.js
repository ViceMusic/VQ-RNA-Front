import simplePost from "./httpHub";

class State{
    user = null // private property to hold the state
    isLogged = true // private property to hold the state
    data={tasks:[]} //用于存储所有的任务信息
    constructor() { // constructor to initialize the state
        if(this.data==null){
            this.data={}
        }
    }
    login = (vq_user) => {
        //用户的登录逻辑
    };
    logout = () => {
        //用户的登出逻辑
    };
    getUser = () => {
        //获取用户信息
    };
    getData = () => {
        //获取当前用户的所有数据
    };
    setData = (data) => {
        //设置用户的数据
    };
}

const state=new State()
export default state;