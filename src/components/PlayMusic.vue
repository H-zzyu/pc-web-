<script >
import axios from 'axios'
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
import { useCounterStore } from '@/stores/counter'; // 替换为实际的存储路径
// import { useUserStore } from '../stores/counter.js'
export default {
    data() {
        return {
            musicid: "",
            id: 0,
            current: {},
            arIds: [
                519460354,
                "天行九歌（Cover 霍尊）",
                "白止",
                "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                "【白止】天行九歌"
            ],
            play: {},
            allmusic: [],
            stop: false,
            currentTime:"0:00",
            duration:"0:00",
            play: "src/assets/music/天行九歌.mp3",
            percent:0,
            speed:0,
        }
    },
    mounted() {
        this.MusicId()
        this.Follection()
        this.$Bus.on("rendoms", (data => {
            console.log(data)
            this.allmusic = data
        }))
     
        const video = this.$refs.musicPlayer;

        // 监听音频播放进度变化事件
        video.addEventListener("timeupdate", () => {
            const currentTime = video.currentTime;
            this.currentTime = this.formatTime(currentTime);//获取当前播放时长
            Math.ceil((currentTime)/this.percent)
            this.$refs.progressBtn.style.left =  Math.ceil((currentTime)/this.percent) + "%";
            this.$refs.progress.style.width =  Math.ceil((currentTime)/this.percent) + "%";
        });
        var els = document.querySelectorAll('video');
        for (var el of els) {
            el.addEventListener('pause', (e) => {
                console.log('暂停播放');
                this.playNextCommand();
            });
        }
             setTimeout(() => {
                this.MusicTime()
          }, 1100)
    },
    methods: {
        startTracking(event) {
            this.tracking = true;
            this.drag(e);
            },
        //拖拽
        drag(e){
            const video = this.$refs.musicPlayer;
            const address=e.x-this.$refs.progressBar.offsetLeft
            let newratio=(address/this.$refs.progressBar.clientWidth).toFixed(2)
            // console.log(e.offsetX,this.$refs.progressBar.clientWidth,"--")
            const duration = parseInt(video.duration);
            video.currentTime=parseInt(duration*newratio)
        },
        //点击快进音乐
        clicktime(e){
            const video = this.$refs.musicPlayer;
            const address=e.x-this.$refs.progressBar.offsetLeft
            let newratio=(address/this.$refs.progressBar.clientWidth).toFixed(2)
            // console.log(e.offsetX,this.$refs.progressBar.clientWidth,"--")
            const duration = parseInt(video.duration);
            video.currentTime=parseInt(duration*newratio)
        },
        //获取音乐时长
        MusicTime(){
            const video=this.$refs.musicPlayer
            const currentTime = video.currentTime;
            const duration = video.duration;
            this.percent=parseInt(duration)/100
            this.currentTime = this.formatTime(currentTime);
            this.duration = this.formatTime(duration);
        },
        // 格式化时间的辅助函数
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },
        //随机数
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        //视频结束执行下一个函数随机播放
        playNextCommand() {
            // 在这里执行下一个命令或操作
            const myMusic=useCounterStore()
            this.allmusic=myMusic.$state.musics
            const videoTime = this.$refs.musicPlayer;
            if (videoTime.duration == videoTime.currentTime) {
                const ss = this.random(1, this.allmusic.length)
                const d = this.allmusic[ss]
                this.current = this.allmusic[ss]
                this.arIds = [d.id, d.title, d.description, d.imageUrl, d.album]
                console.log(this.arIds)
                setTimeout(() => {
                    this.getMusicPlay()
                }, 110);
            }
        },
        //播放上一首或下一首
        next(a) {
            const myMusic=useCounterStore()
            this.allmusic=myMusic.$state.musics
            var arr = new Array(...this.allmusic)
            const musicPlayer = this.$refs.musicPlayer;
            musicPlayer.pause();
            this.stop = false
            var index = arr.findIndex((item) => {
                return item.id == this.arIds[0];
            });
            let num = index + a
            if(num>=this.allmusic.length){
                num=0
            }else if(num<0){
                num=this.allmusic.length
                console.log(this.allmusic.length)

            }else{
                const d = this.allmusic[num]
                this.arIds = [d.id, d.title, d.description, d.imageUrl, d.album]
                setTimeout(() => {
                    this.getMusicPlay()
                }, 110);
            }
        },
        getVidDur() {
            this.playNextCommand()
        },

        //音乐收藏与发送数据
        Collection() {
            const [id, title, album, imageUrl, description,] = this.arIds;
            // 创建对象
            const myObject = {
                id,
                title,
                description,
                imageUrl,
                album
            }
            const myStore = useCounterStore()
            myStore.increment(myObject);
            this.postNodeSql()

        },
        //存储数据
        postNodeSql() {
            const [id, title, description, imageUrl, album] = this.arIds;
            // 构建请求数据对象
            const requestData = {
                id, title, description, imageUrl, album
            };
            axios.post('http://127.0.0.1:3000/musics', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // 请求成功时的处理
                    console.log(response.data);
                })
                .catch(error => {
                    // 请求失败时的处理
                    console.error(error);
                    this.$message.error("音乐数据发送失败");
                });
        },
        // 音乐播放与暂停
        togglePlay() {
            this.stop = !this.stop;
            const musicPlayer = this.$refs.musicPlayer;
            const ss = [this.$refs.musicPlayer]
            // console.log(ss)
            if (musicPlayer) {
                // 根据 stop 的值来播放或暂停音乐
                if (this.stop) {
                    musicPlayer.play();
                } else {
                    musicPlayer.pause();
                }
            } else {
                this.$message.error('找不到音乐播放源');
            }
        },
        Follection() {
            this.$Bus.on("musicids", (data) => {
                this.arIds = data
                console.log(data)
                this.getMusicPlay()
            })
        },
        //接收音乐id
        MusicId() {
            this.$Bus.on("musicid", (data) => {
                console.log(data)
                this.arIds = data
                console.log(data)

                this.getMusicPlay()
            })
        },
        //根据id搜素歌曲
        getMusicPlay() {
            var config = {
                method: 'get',
                url: `/music/api/song/enhance/player/url/v1?encodeType=flac&ids=[${this.arIds[0]}]&level=lossless`,
            };
            axios(config
            )
                .then((response) => {
                    this.play = response.data.data[0].url; // 使用箭头函数来确保正确的上下文
                    setTimeout(() => {
                        this.MusicTime()
                    }, 2000)
                    setTimeout(() => {
                const musicPlayer = this.$refs.musicPlayer;
                musicPlayer.play();
                if(response.data.data[0].url==null){
                    this.$message.error('vip歌曲，api不支持');
                    this.stop = false;

                }else{
                    this.stop = true;

                }

            }, 2000);
                    // console.log(this.play);
                })
                .catch(function (error) {
                    this.$message.error('音乐播放失败，请刷新页面');
                });
           

        },
    },
    watch:{
        
    },
    beforeUnmount() {
        this.$Bus.off("musicid");
        this.$Bus.off("musicids");
        this.$Bus.off("collection")
        this.$Bus.off("rendoms")
        // console.log("组件销毁")
    }
}
</script>
<template>
    <div class="music-start">
        <div class="music-start-stop">
            <div class="music-play-icon">
                <img class="music-previous-song next" @click="next(-1)" src="../assets/svg/下一首.svg" alt="">
                <div @click="togglePlay">
                    <img class="music-previous-song play" src="../assets/svg/播放2.svg" alt="" v-show="!stop">
                    <img src="../assets/svg/暂停.svg" alt="" class="play" v-show="stop">
                </div>

                <img class="next" @click="next(1)" src="../assets/svg/下一首.svg" alt="">
            </div>
            <div class="musci-detailed-all">
                <div class="music-name-new-jpg"><img :src="arIds[3]" alt=""></div>
                <div class="musci-detailed">
                    <div class="music-detailed-folderadd">
                        <span class="musci-detailed-name">{{ arIds[1] }}</span>
                        <el-icon class="elicon folderadd" :size="15" @click="Collection">
                            <FolderAdd />
                        </el-icon>
                    </div>
                    <span class="musci-time-name">
                        <span class="music-time-zreo">{{currentTime}}</span>
                        {{ arIds[2] }}
                        <span class="time-total">{{duration}}</span>
                    </span>
                    <div class="progress-bar-wrapper" >
                    <div class="progress-bar"  @click="clicktime">
                        <div class="bar-inner"  ref="progressBar">
                            <div class="progress"  ref="progress"></div>
                                <div  class="progress-btn-wrapper" ref="progressBtn">
                                    <div  class="progress-btn"
                                    @mousedown="startTracking"
                                    @mousemove="drag"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <video  ref="musicPlayer" @canplay="getVidDur()" :src="play"></video>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
.time-total{
    float: right;
}
.music-time-zreo{
    float: left;
}
        .progress-bar-wrapper {
            flex: 1;
            width: 100%;
            margin-left: 5px;
        }
        .bar-inner {
            position: relative;
            top: 13px;
            height: 4px;
            background: #666666;
        }
        .progress {
            height: 100%;
            width: 2px;
            background-color: #7a1bd8;
        }
        .progress-btn-wrapper {
            position: absolute;
            top: -10px;
            left: 0;
            width: 100%;
            height: 30px;
        }
        .progress-btn {
            position: relative;
            top: 7px;
            box-sizing: border-box;
            width: 2px;
            height: 7px;
            z-index: 999;
            background: #fbfbfb;
        }
        .progress-bar {
            height: 30px;
            cursor: pointer;
        }
        .progress-bar:hover .progress-btn{
            position: relative;
            top: 7px;
            /* left: 7px; */
            box-sizing: border-box;
            width: 10px;
            height: 10px;
            /* border: 3px solid #fff; */
            border-radius: 50%;
            z-index: 999;
            background: #fbfbfb;
        }

.music-start {
    width: 100%;
    height: 60px;
    position: fixed;
    color: #666666;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    background-color: rgb(56, 61, 63);

}
.music-start-stop {
    /* filter: brightness(90%) contrast(90%); */
    width: 100%;
    display: flex;
    height: 60px;
    color: rgb(221, 218, 214);
    position: fixed;
    bottom: 0;
    /* background-color: red; */
    justify-content: center;
    align-items: center;
}
.music-name-new-jpg {
    width: 60px;
    flex-shrink:0;
    height: 60px;
    margin-right: -10px;
    /* border-radius: 5px; */
}

.music-name-new-jpg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 或者 object-fit: contain; */
}

.music-play-icon img {
    height: 35px;
    color: #f0ebeb;
}

.music-play-icon .next {
    height: 30px;
}

.music-previous-song {
    rotate: 180deg;
    color: #f0f0f0;
}

.music-start-stop {
    display: flex;
}
.music-play-icon .next {
    height: 30px;
}

.folderadd {
    /* float: right; */
    position: absolute;
    right: 0;
}
.music-detailed-folderadd {
    display: flex;
    width: 100%;
    height: 20px;
    margin-top: 10px;
    overflow: hidden;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;

}
.musci-detailed-name {
    font-size: 12px;
    color: rgb(251, 251, 252);
    text-align: center;
}
.musci-time-name {
    font-size: 12px;
    margin-top: -3px;
    color: #969494;
    margin-bottom: -5px;

}

.musci-detailed-all {
    display: flex;
    width: 70%;
    align-items: center;
    flex-shrink:0;
    /* justify-content: center; */
}
.play {
    margin-right: 20px;
    margin-left: 20px;
    rotate: 360deg;
    /* margin-left: 15px; */
}

.music-play-icon {
    display: flex;
    margin-right: 5%;
    align-items: center;
}

.music-play-icon img {
    height: 35px;
    color: #b3b3b3;

}
.musci-detailed {
    display: flex;
    width: 80%;
    margin-left: 10px;
    margin-top: -3px;
    flex-direction: column;
    /* justify-content: center; */
    text-align: center;
}


</style>