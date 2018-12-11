import React,{Component} from "react";
import HTTP from "../http";
import HTTP_KUGOU from "../http-kugou";
import HTTP_MUSIC from "../http-music";
import Axios from "axios";
export default class Login extends Component{
    state={
        username:"tww",
        password:"123456",
        verify:"",
        verifysrc: "/miaov/user/verify?"+Date.now(),
        datakg:[]
    }
    login(){
        let {username,password,verify} = this.state;
        HTTP.post(
            "/user/login",
            {
                username,
                password,
                verify
            }
        ).then((res)=>{
            let {data} = res;
           alert("code:"+data.code+"msg:"+data.message);
        })
    }
    music(hash,cmd="playInfo",from="mkugo"){
        console.log(hash);
        HTTP_MUSIC.get(
            "/app/i/getSongInfo.php?",{
                params:{
                    cmd,
                    hash,
                    from
                }
            }
        ).then((res)=>{
            let {data} = res;
           alert(data);
        })
    }
    getKuGou(){
        HTTP_KUGOU.get("/",{
            params:{
                "json":true
            }
        }).then((res)=>{
            let datakg = this.state.datakg
            datakg = res.data.data;
            console.log(datakg);
            this.setState({
                datakg
            })
        });
    }
    render(){
        let datakg = this.state.datakg;
        let {username,password,verify,verifysrc} = this.state;
        return (<div>
            <h1>登录</h1>
            <input
                type="text" 
                placeholder="username" 
                value={username}
                onChange = {(e)=>{
                    this.setState({
                        username: e.target.value
                    });
                }}
            />
            <input 
                type="text" 
                placeholder="password" 
                value={password}
                onChange = {(e)=>{
                    this.setState({
                        password: e.target.value
                    });
                }}
            />
            <input 
                type="text" 
                placeholder="verify" 
                value={verify}
                onChange = {(e)=>{
                    this.setState({
                        verify: e.target.value
                    });
                }}
            />
            <img 
                src={verifysrc} 
                onClick = {()=>{
                    this.setState({
                        verifysrc:"/miaov/user/verify?"+Date.now()
                    });
                }}

            />
            <button
                onClick={()=>{
                    this.login();
                }}
            >登录</button>
             <button
                onClick={()=>{
                    this.getKuGou();
                    
                }}
            >请求酷狗</button>
            {datakg.length>0?datakg.map((item,index)=>{
                 return <div 
                    key={index}
                    hash={item.hash}
                    onClick={()=>{
                        this.music(item.hash);
                    }}
                 >{item.filename}</div>
               }):""
            }
            
        </div>);
    }
}