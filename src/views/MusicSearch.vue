<script >
import { ref } from 'vue'
import axios from 'axios'
import { useCounterStore } from '@/stores/counter'; // 替换为实际的存储路径
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
var time=0
export default{
    data(){
        return{
            music:[],
            musicid:0,
        }
    },
    mounted(){
        this.MusicName()
    },
    methods:{
        //收藏数据到数据库或到某个页面
        Collection(id, title, description, imageUrl,album){
            event.stopPropagation();
            const myObject = {
            id,
            title,
            description,
            imageUrl,
            album
            }
            const myStore = useCounterStore()
            myStore.increment(myObject);
             // 打印整个 state 对象
            // console.log(myStore.$state);
           
        },
        //传递音乐的各种值，包括id
        MusicId(id,name,plople,img1v1Url,album){
            if(time){
                clearTimeout(time)
            }
            time=setTimeout(()=>{
                console.log('Key value:', id,name,plople,img1v1Url,album);
                this.$Bus.emit("musicid",[id,name,plople,img1v1Url,album]);
                time=undefined
            },0)
            
        },
        //接收音乐的名词根据名词搜素歌曲
        MusicName(){
            this.$Bus.on("text",(data)=>{
                if(this.musicname==""){
                    alert("输入框不能为空")
                }else if(this.musicname==data){
                    console.log("请求一样")
                }else{
                    console.log("允许")
                    this.musicname=data
                    this.getMusicId()
                }
            })
        },
        //根据音乐id 查找数据
        getMusicId() {
      var config = {
        method: 'get',
        url:`/music/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s=${this.musicname}&type=1&offset=0&total=true&limit=30`,

      };
      axios(config, {
                })
        .then((response) => {
          this.music = response.data.result.songs; // 使用箭头函数来确保正确的上下文
          console.log(response.data.result.songs)
        //   console.log(this.music);
        })
        .catch(function (error) {
            this.$message.error('音乐搜素失败，请检查网络');
        });
    },
    },
    
    beforeUnmount() {
        this.$Bus.off("text");
        this.$Bus.off("musicid");
        // console.log("组件销毁")
    },
}
</script>
<template>
    <div class="music-box">
        <div class="musci">
            <div class="music-name-list">
                <div class="music-msg ms">
                    <span class="music-name">歌曲名</span>
                    <span>歌手</span>
                    <span>专辑</span>
                    <span>操作</span>
                </div>
            </div>
            <div class="music-name-list mm">
                <!-- <div class="music-msg mm">
                    <span class="music-name ">我和你</span>
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
                            <Link />
                        </el-icon>
                    </span>
                </div>   -->
                <div class="music-msg mm" v-for="item in music" :key="item.id" @click="MusicId(item.id,item.name,item.artists[0].name,item.artists[0].img1v1Url,item.album.name)">
                    <span class="music-name mn">{{ item.name }}</span>
                    <span>{{ item.artists[0].name }}</span>
                    <span>{{ item.album.name }}</span>
                    <span class="operation">
                        <el-icon class="elicon add" :size="20">
                            <CloseBold />
                        </el-icon>
                        <el-icon class="elicon " :size="20" @click.stop="Collection(item.id,item.name,item.artists[0].name,item.artists[0].img1v1Url,item.album.name)">
                            <FolderAdd />
                        </el-icon>
                        <!-- <el-icon class="elicon" :size="20">
                            <Delete />
                        </el-icon> -->
                        <el-icon class="elicon" :size="20">
                            <Link />
                        </el-icon>
                    </span>
                </div>
            </div> 
        </div>
    </div>
</template>
<style scoped>
.music-box {
    margin-top: 10px;
    margin: 0 auto;
    /* background-color: brown; */
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

.add {
    rotate: 45deg;
    opacity: 0.7;
}
.mm{
    background-color:#2d2d2d ;
    color: rgb(255, 253, 253);
}
.mm div:nth-child(even) {
    background-color: #1b212b;
}

/* 为奇数子元素添加样式 */
.mm div:nth-child(odd) {
  background-color:#2d2d2d ;

}
.music-msg .operation{
    display: flex;
    align-items: center;
    justify-self: start;
   
}

.operation * {
    
    /* line-height: 40px; */
    margin-right: 5px;
}
.ms {
    margin-top: 10px;
    color: rgb(149, 149, 149);
    font-size: 14px;
}

.music-msg {
    /* margin-left: 20px; */
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* align-items: center; */
}

.music-msg span {
    flex: 1;
    white-space: nowrap;
    /* 防止文本换行 */
    text-overflow: ellipsis;
    /* 使用省略号来表示被隐藏的文本 */
    overflow: hidden;
    /* 隐藏超出容器的内容 */

    display: inline-block;
    /* background-color: aquamarine; */
}

.music-msg .music-name {
    flex-grow: 1;
    margin-left: 15px;
    flex-basis: 30%;
}
</style>