<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'; // 导入 useRouter 函数
const count = ref(0)
const username = ref("admin")
const password = ref("password")
const router = useRouter()
function LoginClick() {
    ; // 获取路由对象
    const usernameValue = username.value;
    const passwordValue = password.value;
    
    if (usernameValue === 'admin' && passwordValue === 'password') {
        console.log(router);
        router.push({ path: 'page' });
    } else {
        alert("账号或密码发生错误")
    }
}

</script>
<template>
<div id="LoginBox">
    <h1>登录</h1>
    <input type="text" v-model="username" >
    <input type="password" v-model="password" >
    <el-button class="ElLogin" @click="LoginClick">登录</el-button>
</div>
</template>
<style scoped>
#LoginBox{
    margin: 0 auto;
    margin-top: 200px;
    width: 550px;
    height: 300px;
}
#LoginBox h1{
    text-align: center;
    margin-bottom:30px ;
}
#LoginBox input{
    display: block;
    margin: 0 auto;
    width: 350px;margin-bottom:30px ;
    border-radius: 50px;
    height: 50px;
    padding-left:20px;
}
input:focus{
    right: 10px;
    outline: none
}
#LoginBox .ElLogin{
    display: block;
    margin: 0 auto;
    width: 350px;margin-bottom:30px ;
    border-radius: 50px;
    height: 50px;
    background-color: skyblue;
}
</style>