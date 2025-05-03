import simplePost from "./httpHub";

class State{
    user = null // private property to hold the state
    isLogged = false // private property to hold the state
    data={tasks:[]} //用于存储所有的任务信息
    constructor() { // constructor to initialize the state
        this.user = localStorage.getItem('vq-user'); //用户登录状态
        this.isLogged = JSON.parse(localStorage.getItem('isLogged'));//用户登录状态
        this.data=JSON.parse(localStorage.getItem('data')); //查找到的该用户的所有任务
        if(this.data==null){
            this.data={}
        }
    }
    login = (vq_user) => {
        console.log(simplePost({email:vq_user,type:"login"}).then((res)=>{
                console.log("登录成功",res)
                localStorage.setItem('vq-user', vq_user);
                localStorage.setItem('isLogged', JSON.stringify(true));
                this.user=vq_user
                this.isLogged=true
            }
            ).catch((err)=>{
                console.log("登录失败",err)
            })
        )

    };
    logout = () => {
        //退出登录以后, 要删除掉对应的内容
        localStorage.removeItem('vq-user');
        localStorage.setItem('isLogged', JSON.stringify(false));
        localStorage.removeItem('data');
        this.user=null
        this.isLogged=false
        this.data={tasks:[]}
        console.log("logout")
    };
    getUser = () => {
        return this.user
    };
    getData = () => {
        return this.data
    };
    setData = (data) => {
        localStorage.setItem('data', JSON.stringify(data));
        this.data=data
    };
}

const state=new State()
export default state;