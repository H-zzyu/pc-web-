<script>
import { useCounterStore } from '@/stores/counter'
import axios from "axios"
let time
export default{
    data(){
        return{
            music:[  
            ],
            imageUrl:"src/assets/img/58839867_p0.png",
            arIds:[],
            rendoms:0,
        }
    },
    mounted(){
        this.Collection()
        this.getmusic()    
    },
    methods:{
        //发送数据给播放
        rendomId(a){
            this.$Bus.emit("rendoms", a)
        },
        //getnode请求数据库同时存储进state
        getmusic(){ 
            const myMusic=useCounterStore()
            
            if(myMusic.$state.musics==""){
                axios.get('http://127.0.0.1:3000/music', {
            })

            .then(response => {
            // 请求成功时的处理
            // console.log(response.data);
            this.music=response.data
            this.music.reverse()
            myMusic.$state.musics=this.music.reverse()
            this.rendomId(this.music.reverse())

            })
            .catch(error => {
            // 请求失败时的处理
            this.$message.error('音乐获取失败');
            });
            }else{
                this.music=myMusic.$state.musics
                console.log(myMusic.$state.musics,"----------")
                this.rendomId(myMusic.$state.musics)
            }            
        },
        //接收stote并渲染到页面上
        Collection(){
            const counter = useCounterStore()
            // console.log(counter.$state.arIds); 
            this.music=counter.$state.arIds
        },
        //传递id，提供搜素功能
        MusicId(id,name,plople,img1v1Url,album){
            
            if(time){
                clearTimeout(time);
            }
            time=setTimeout(() => {
                console.log(2123)
                console.log(id,name,plople,img1v1Url,album,"--")
                this.$Bus.emit("musicids",[id,name,plople,img1v1Url,album]);
                time= undefined
            }, 500);
            
            // console.log('Key value:', id,name,plople,img1v1Url,album);    
        },
    },
    beforeUnmount() {
        this.$Bus.off("musicids");
        this.$Bus.off("rendoms");
        // console.log("组件销毁")
    }
}
</script>
<template>
    <div class="music-box">
        <div class="musci">
            <div class="">
                <div class="music-item">
                    <div class="music-box-jpg"><img class="music-jpg" :src="imageUrl" alt=""></div>
                    <div class="music-like-play-all">
                        <h1>我喜欢的音乐</h1>
                        <div class="music-play-all">
                            <el-icon class="elicon" :size="25">
                                <CaretRight />
                            </el-icon><span>播放全部</span>
                        </div>
                    </div>
                </div>

            </div>
            <div class="music-name-list">
                <div class="music-msg ms">
                    <span class="music-name">歌曲名</span>
                    <span>歌手</span>
                    <span>专辑</span>
                    <span>操作</span>
                </div>
            </div>
            <div class="music-name-list name">
                <!-- <div class="music-msg mm">
                    <span class="music-name mn">我和你</span>
                    <span>唐宁</span>
                    <span></span>
                    <span class="operation">
                        <el-icon class="elicon add" :size="20">
                            <CloseBold />
                        </el-icon>
                        <el-icon class="elicon" :size="20">
                            <FolderAdd />
                        </el-icon>
                        <el-icon class="elicon" :size="20">
                            <Delete />
                        </el-icon>
                        <el-icon class="elicon" :size="20">
                            <Link />
                        </el-icon>
                    </span>
                </div> -->
                <div class="music-msg mm" v-for="item in music" :key="item.id" @click="MusicId(item.id,item.title,item.description,item.imageUrl,item.album)">
                    <span class="music-name mn">{{ item.title }}</span>
                    <span>{{item.description}}</span>
                    <span class="music-name-album">{{item.album}}</span>
                    <span class="operation">
                        <!-- <el-icon class="elicon" :size="20">
                            <Delete />
                        </el-icon> -->
                    </span>
                </div>
            </div>
        </div>
</div>
</template>
<style scoped>
.music-msg .music-name-album{
    flex: 5%;
}
h2 {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
video::-webkit-media-controls-timeline {
        /* display: none; */
        color: red;
    }
.music-jpg{
    width: 100%;
    height: 100%;
    object-fit: cover; /* 或者 object-fit: contain; */
}
.music-box {
    margin-top: 10px;
    margin: 0 auto;
    /* background-color: brown; */
}
.add {
    rotate: 45deg;
    opacity: 0.7;
}

.operation * {
    margin-right: 5px;

}
.music-msg .operation{
    margin-top:4px;
    
}
.ms {
    margin-top: 10px;
    color: rgb(149, 149, 149);
    font-size: 14px;
}

.music-msg {
    /* margin-left: 15px; */
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}

.music-msg span {
    flex: 1;
    white-space: nowrap;
    /* 防止文本换行 */
    text-overflow: ellipsis;
    /* 使用省略号来表示被隐藏的文本 */
    overflow: hidden;
    display: inline-block;
    /* background-color: aquamarine; */
}
.music-msg .music-name {
    flex-grow: 1;
    margin-left: 15px;
    flex-basis: 30%;
}
.name{
    height: 40px;
    border-radius: 1px;
    background-color: #2d2d2d;
}
.musci .music-name-list .mm {
    position: relative;
    display: flex;
    height: 40px;
    /* align-items: center; */
    color: rgb(255, 253, 253);
    /* margin-right: 20px; */
    line-height: 40px;
}
/* 为偶数子元素添加样式 */
.name div:nth-child(even) {
    background-color: #1b212b;

}
/* 为奇数子元素添加样式 */
.name div:nth-child(odd) {
    background-color:#2d2d2d ;
}

.musci {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: inline-block;
    box-shadow: 3px;
    /* background-color: rgb(131, 255, 127); */
}
.music-item {
    margin-top: 20px;
    display: flex;
}

.music-box-jpg {
    width: 150px;
    height: 150px;
    display: block;
    overflow: hidden;
    background-color: black;
    margin: 10px;
}
.music-play-all {
    display: flex;
    /* display: inline-block; */
    text-align: center;
    border: 1px solid rgba(10, 0, 0, 0.6);
    border-radius: 3px;
}

.music-play-all i,
span {
    align-items: center;
}

</style>