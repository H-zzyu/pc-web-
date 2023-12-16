<script setup>
import { ref } from 'vue'
    
const count = ref(0)
</script>
<template>
    <div class="navigation-big">
        <div class="navigation-internal-box">

            <div class="navigation-page-home">
                <img class="navigation-home-tag" src="../assets/img/1671011444102.png" alt="">
            </div>
            <div class="navigationpage-icon-box-tag">
                
                <router-link class="router-link" to="/page">
                    <div >
                        <el-icon  class="elicon" :size="25"><House /></el-icon>
                        <p>首页</p>
                    </div>
                </router-link>
                <router-link class="router-link" to="/playlist">
                    <div>
                        <el-icon class="elicon" :size="25"><Headset /></el-icon>
                        <p>歌单</p>
                    </div>
                </router-link>
                <router-link class="router-link" to="/picture">
                    <div>
                        <el-icon class="elicon" :size="25"><Picture /></el-icon>
                        <p>图库</p>
                    </div>
                </router-link>
                <router-link class="router-link" to="/barrage">
                    <div>
                        <el-icon class="elicon" :size="25"><Star /></el-icon>
                        <p>弹幕</p>
                    </div>
                </router-link>
            </div>
            <div class="navigation-uesr-msg">
                <div class="navigation-user-profile">
                    <el-icon class="elicon users" :size="25"><UserFilled /></el-icon>
                </div>
                <span>admin</span>
            </div>
        </div>
        
        <router-view></router-view>
       
    </div>
</template>
<style scoped>
.router-link{
    list-style: none;
    display: inline;

}
*{
    margin: 0;
    padding: 0;
    text-decoration: none;
}
.navigation-uesr-msg{
right: 20px;
width: 125px;
position: absolute;
display: flex;
align-items: center;
/* background-color: rgb(17, 0, 255); */
color: #333;
line-height: 50px;
}
.navigation-user-profile{
    float: left;
    width: 35px;
    height: 35px;
    display: flex;
    margin-left: 5px;
    align-items: center;
    justify-content: center; 
    align-items: center;
    margin-right: 7px;
    border-radius: 50%;
    border:2px solid black;
    overflow: hidden;
}
.uses{
    text-align: center;
    
}
.navigation-big {
    display: inline-block;
    height: 50px;
    width: 100%;
    /* position: absolute; */
    /* position: relative; */
    background-color: skyblue;
}

.navigation-internal-box {
    /* position:absolute; */
    width: 100%;
    height: 100%;
    /* background-color: antiquewhite; */
    top: 0%;

}
.navigationpage-icon-box-tag div:hover{
    background-color: rgba(70, 80, 83, 0.3);
}

.navigation-page-home {
float: left;
width: 100px;
position: absolute;
}

.navigation-home-tag {
    height: 50px;
    width: 50px;
}

.navigationpage-icon-box-tag {
    /* background-color: red; */
    width: 420px;
    height: 100%;
    /* position: absolute; */
    float: left;
    left: 10%;
    margin-left: 10%;
    display: flex;
    color: black;
    align-items: center;
    justify-content: center;
}

.navigationpage-icon-box-tag div,.router-link {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}
</style>