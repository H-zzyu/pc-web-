<script>
import vueDanmaku from "vue3-danmaku";
import { ref } from "vue";
export default {
    components: {
        vueDanmaku,
    },
    data() {
        return {
            text: "",
            time: 0,
            size: 20,
            barrage:false,
            color: [
                "FFFFFF",
                "9B9B9B",
                "222222",
                "CC0273",
                "89D5FF",
                "4266BE",
                "019899",
                "00CD00",
                "A0EE00",
                "FFFF00",
                "FFD302",
                "FFAA02",
                "FF7204",
                "FE0302",
            ],
            select: "#9B9B9B",

            danmus: [
                {
                    msg: "danmu1",
                    time: new Date().getFullYear(),
                    picture: "user",
                    Numbers:0,
                    likes:{
                        uid:1,
                        is:true,
                    },
                    secondary: [
                        {
                            msg: "danmu1",
                            time: new Date().getFullYear(),
                            picture: "user",
                            Numbers:0,
                            likes:{
                                uid:1,
                                is:true,
                            },
                                },
                    ],
                },
                {
                    msg: "danmu1",
                    time: new Date().getFullYear(),
                    picture: "user",
                    Numbers:0,
                    likes:{
                        uid:1,
                        is:true,
                    },
                    secondary: [],
                },
                
            ],
        };
    },
    mounted() {
     },
    methods: {
        //点赞
        numlikes(index){
            if(this.danmus[index].likes.is){
                this.danmus[index].Numbers++
            }else{
                this.danmus[index].Numbers--
            }
            this.danmus[index].likes.is=!this.danmus[index].likes.is
        },
        //内部点赞
        internal(index,indexs){
            if(this.danmus[index].secondary[indexs].likes.is){
                this.danmus[index].secondary[indexs].Numbers++
            }else{
                this.danmus[index].secondary[indexs].Numbers--
            }
            this.danmus[index].secondary[indexs].likes.is=!this.danmus[index].secondary[indexs].likes.is
        },
        //去除重复
        wait(id){
            let map=new Map();
            let result=new Array()
            for(let i=0;i<this.likes.length;i++){
                if(map.has(this.likes[i])){
                    map.set(this.likes[i], true);  // 后面的true 代表该 key 值在原始数组中重复了，false反之
                }else{
                    map.set(this.likes[i], false);  
                    result.push(this.likes[i]);
                }
            }
        },
        //创建虚拟dom
        createdom(index) {
            const virtual=this.$refs.virtual[index]
            this.barrage = !this.barrage;
            //创建头像dom
            var imgElement = document.createElement('img');
            imgElement.style.height = '30px';
            imgElement.style.border = '2px solid #ffffff';
            imgElement.style.marginRight = '10px';
            imgElement.style.borderRadius = '50%';
            imgElement.setAttribute('src', 'src/assets/photo.jpg');
            //创建留言dom
            var textareaElement = document.createElement('textarea');
            // textareaElement.value.classList.add('barrage-msg-photo');
            textareaElement.setAttribute('rows', '3');
            textareaElement.classList.add('barrage-msg-photo');
            textareaElement.style.marginRight = '10px';
            textareaElement.style.width = '90%';
            textareaElement.style.height = '57px';
            textareaElement.style.borderRadius = '5px';
            textareaElement.style.outline = 'none';
            textareaElement.style.padding = '5px';
            textareaElement.style.color = '#fff';
            textareaElement.style.backgroundColor = '#252628';
            //创建发送dom
            setTimeout(()=>{
                textareaElement.focus();
            },100)
            var buttonElement = document.createElement('button');
            buttonElement.classList.add('barrage-publish');
            if (buttonElement) {
                buttonElement.addEventListener('click',()=> this.reply(index));
            }
            buttonElement.textContent = '发布';
            buttonElement.style.height = '57px';
            buttonElement.style.border = '0';
            buttonElement.style.width = '57px';
            buttonElement.style.borderRadius = '5px';
            buttonElement.style.backgroundColor = '#00b5e5';
            buttonElement.style.flexShrink = '0';
           
            if (this.barrage) {
                virtual.appendChild(imgElement);
                virtual.appendChild(textareaElement);
                virtual.appendChild(buttonElement);
            } else {
                virtual.innerHTML = '';
            }
       
        },
        //二级评论
        reply(index) {
            const virtual=this.$refs.virtual[index]
            const send = virtual.querySelector('textarea');
            virtual.removeChild(virtual.firstChild); 
            const ss = new Date();
            const year = ss.getFullYear();
            const month = ss.getMonth() + 1;
            const date = ss.getDate();
            const house = ss.getHours();
            const minutes = ss.getMinutes();
            const time =
                year + "-" + month + "-" + date + " " + house + ":" + minutes;
            const msg = send.value;
            const Numbers=0
            const likes= {
                                uid:1,
                                is:true,
                            }
            const picture = "user";
            if (send.value === "") {
                console.log("数据不能为空");
            } else {
                this.danmus[index].secondary.push({ picture, msg, time, Numbers, likes });
                virtual.innerHTML = '';
                this.barrage = !this.barrage;
            }
        },
        //获取时间
        gettime() { },
        handleMouseOver() {
            this.$refs.set.style.display = "block";
        },
        handleMouseOut() {
            this.$refs.set.style.display = "none";
        },
        setZize(s) {
            this.size = s;
        },
        send() {
            const ss = new Date();
            const year = ss.getFullYear();
            const month = ss.getMonth() + 1;
            const date = ss.getDate();
            const house = ss.getHours();
            const minutes = ss.getMinutes();
            const time =
                year + "-" + month + "-" + date + " " + house + ":" + minutes;
            const msg = this.text;
            const picture = "user";
            const Numbers=0
            const likes= {
                                uid:1,
                                is:true,
                            }
            if (this.text === "") {
                console.log("数据不能为空");
            } else {
                this.danmus.push({ picture, msg, time, Numbers, likes  });
                setTimeout(() => {
                    this.rgbToHex((this.$refs.barrage.style.color = this.select));
                }, 100);
                setTimeout(() => {
                    this.$refs.barrage.style.fontSize = this.size + "px";
                }, 100);
                this.text = "";
            }
            // const arr=new Array({this.text,this.time})
        },
        //rgb 转16进制
        rgbToHex(rgb) {
            const rgbArray = rgb.match(/\d+/g);
            const hexArray = rgbArray.map((value) => {
                const hex = Number(value).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            });
            return "#" + hexArray.join("");
        },
        selectColor(index) {
            const rgbColor = this.$refs.colors[index].style.backgroundColor;
            // 将 RGB 转换为十六进制
            const hexColor = this.rgbToHex(rgbColor);
            // 输出结果
            this.select = hexColor;
        },
    },
};
</script>
<template>
    <div class="poetry-box">
        <div class="poetry">
            <div class="poetry-item">
                <vue-danmaku class="danmu" v-model:danmus="danmus" randomChannel useSlot style="height: 400px; width: 100%">
                    <template v-slot:dm="{ danmu, index }">
                        <span ref="barrage">{{ danmu.msg }}</span>
                    </template>
                </vue-danmaku>
            </div>

            <div class="barrage-send-big">
                <div class="barrage-send">
                    <div class="barrage-font-style" ref="set" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
                        <div class="barrage-font-style-size">
                            <h5>字号</h5>
                            <div class="barrage-set-font-button">
                                <button @click="setZize(14)">小</button>
                                <button @click="setZize(20)">标准</button>
                                <button @click="setZize(32)">大</button>
                            </div>
                        </div>
                        <div class="barrage-color-style">
                            <h5>颜色</h5>
                            <div class="barrage-color-input">
                                <input type="text" v-model="select" />
                                <div class="barrage-color-value" :style="{ backgroundColor: select }"></div>
                            </div>
                            <div class="barrage-color-big">
                                <div v-for="(item, index) in color" :key="index">
                                    <div class="barrage-select-color" ref="colors" @click="selectColor(index)"
                                        :style="{ backgroundColor: '#' + item }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="barrage-size-color" @mouseover="handleMouseOver" @mouseout="handleMouseOut">A</span>
                    <input class="barrage-send-input" type="text" v-model="text" placeholder="发个友善的弹幕见证一下" />
                    <button class="barrage-send-button" @click="send">发送</button>
                </div>
            </div>
            <div class="barrage-mesage">
                <div v-for="(item, index) in danmus" class="barrage-mesage-content">
                    <div class="comment-photo-name-time">
                        <div class="barrage-name-picture">
                            <img src="../assets/photo.jpg" alt="" />
                        </div>
                        <div class="index-item">
                            <span class="red">{{ item.picture }}</span>
                            <span class="comment-value">{{ item.msg }}</span>
                            <div class="comment-reply">
                                <span class="comment-time">{{ item.time }}</span>
                                <div class="comment-like">
                                    <img @click="numlikes(index)" src="../assets/svg/赞.svg" alt="" srcset="" />                           
                                    <span class="comment-time">{{ item.Numbers==0?" ": item.Numbers}}</span>
                                </div>
                                <img @click="createdom(index)" src="../assets/svg/回复.svg" alt="" srcset="" />
                            </div>
                            <div v-for="(items, indexs) in item.secondary">
                                <div class="">
                                    <div class="comment-photo-name-time-half">
                                        <div class="barrage-name-picture-half">
                                            <img class="ss" src="../assets/photo.jpg" alt="" />
                                            <div class="index-item-half">
                                                <span class="red">{{ items.picture }}</span>
                                                <span class="ee">{{ items.msg }}</span>
                                            </div>
                                        </div>
                                        <div class="dd">
                                            <span class="comment-time-half">{{ items.time }}</span>
                                            <div class="comment-like">
                                                <img class="size" @click="internal(index,indexs)" src="../assets/svg/赞.svg"  alt="" srcset=""/>                           
                                                <span class="comment-time">{{ items.Numbers==0?" ": items.Numbers}}</span>
                                            </div>
                                            <img @click="createdom(index)" class="size" src="../assets/svg/回复.svg" alt="" srcset="" />
                                        </div>
                                    </div>
                                    <div>
                                       
                                    </div>

                                </div>
                                
                            </div>
                            <div class="barrage-msg" ref="virtual">
                                    <!-- <img class="barrage-msg-photo" src="../assets/photo.jpg" alt="">
                                    <textarea name="" id=""  rows="3"></textarea>
                                    <button class="barrage-publish">发布</button> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.comment-like{
    /* top: 0; */
    display: flex;
    width: 10px;
    margin-right: 20px;
align-items: center;
}
.barrage-msg-photo {
    height: 30px;
    border: 2px solid #ffffff;
    margin-right: 10px;
    border-radius: 50%;
}

.barrage-msg {
    display: flex;
    width: 90%;
    margin-top: 20px;
    /* background-color: red; */
}
.barrage-msg img{
    border: 5px solid red;
}

textarea {
    /* display: inline-block; */
    margin-right: 10px;
    width: 90%;
    border-radius: 5px;
    outline: none;
    padding: 5px;
    color: #fff;
    background-color: #252628;
}

.barrage-publish {
    height: 57px;
    border: 0;
    width: 57px;
    border-radius: 5px;
    background-color: #00b5e5;
    flex-shrink: 0;
}

.ee {
    font-size: 18px;
}

.red {
    color: #fb6b96;
}

.dd {
    display: flex;
    margin-left: 40px;
    align-items: center;
}

.comment-photo-name-time-half {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.comment-photo-name-time-half .ss {
    width: 30px;
    border-radius: 50%;
    border: 2px solid #ffffff;
}

.comment-time-half {
    font-size: 14px;
    /* margin-left: 45px; */
}

.index-item-half {
    display: flex;
    margin-top: -4px;
    /* font-size: 20px; */
    justify-content: center;
    align-items: center;
}

.index-item-half span {
    margin-left: 10px;
}

.barrage-name-picture-half {
    display: flex;
    height: 30px;
    flex-shrink: 0;
}

.size {
    height: 14px;
    margin-left: 20px;
    /* filter: drop-shadow(rgb(247, 20, 20) 10px 0); */
}

.rotation {
    rotate: 180deg;
}

.comment-value {
    font-size: 18px;
    color: #ecebea;
    /* background: red;   */
    width: 100%;
    word-break: break-all;
    white-space: normal;
}

.comment-reply img {
    width: 14px;
}

.comment-reply >*{
    margin-right: 20px;
}

.comment-reply {
    margin: 7px;
    display: flex;
}

.comment-photo-name-time {
    display: flex;
    width: 100%;
}

.barrage-mesage {
    margin-top: 30px;
    background: #1b1d1e;
}

.comment-time {
    color: #7c7d81;
    font-size: 14px;
}

.barrage-mesage-content {
    font-size: 22px;
    margin-top: 10px;
    border-bottom: 1px solid #000;
}

.barrage-name-picture {
    border-radius: 50%;
    height: 40px;
    margin-left: 5px;
    border: 2px solid #fff;
    width: 40px;
    overflow: hidden;
    margin-right: 10px;
    z-index: 999;
    flex-shrink: 0;
    /* display: inline-block; */
}

.barrage-name-picture img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.index-item {
    /* background: #00b5e5; */
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex-shrink: 0;
}

.barrage-color-big {
    display: flex;
    flex-wrap: wrap;
    margin-right: 9px;
    margin-left: 10px;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
}

h5 {
    margin-left: 15px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.barrage-select-color {
    width: 20px;
    height: 20px;
    margin: 4px;
    border-radius: 1px;
}

.barrage-select-color:hover {
    border: 1px solid #ffffff;
    box-shadow: 10px #ffffff;
}

.barrage-color-value {
    margin-right: 15px;
    height: 20px;

    background-color: #000000;
    width: 25%;
}

.barrage-color-input {
    display: flex;
    width: 100%;

    align-items: center;
}

.barrage-color-input input {
    margin-left: 15px;
    width: 60%;
    font-size: 14px;
    color: #ffffff;
    border: none;
    box-shadow: none;
    outline: none;
    border-radius: 1px;
    margin-right: 5px;
}

.barrage-font-style {
    position: absolute;
    margin-top: -192px;
    transform: translate(-50%);
    height: 192px;
    width: 216px;
    border-radius: 2px;
    background-color: skyblue;
}

.barrage-font-style * {
    color: #000;
}

.barrage-send {
    /* position: absolute; */
    z-index: 111;
    width: 60%;
    display: flex;
    font-size: 16px;
}

.barrage-font-style-size {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.barrage-set-font-button {
    margin-right: 5px;
    margin-left: 15px;
    display: flex;
}

.barrage-set-font-button button {
    flex: 1;
    margin-right: 10px;
}

.barrage-size-color {
    position: absolute;
    z-index: 999;
    line-height: 30px;
    margin-left: 7px;
    font-size: 14px;
    color: #c5fa5c;
    text-decoration: underline;
    /* display: inline-block; */
}

.barrage-font-style {
    display: none;
}

.barrage-send .barrage-send-input {
    height: 32px;
    border-radius: 8px 0 0 8px;
    width: 80%;
    color: #ffffff;
    border: none;
    box-shadow: none;
    outline: none;
    padding-left: 25px;

    font-size: 12px;
    background-color: #252628;
    border: 1px solid #48494b;
    border-right: 0;
}

.barrage-send .barrage-send-button {
    height: 32px;
    width: 20%;
    border: 1px solid #48494b;
    border-left: 0;
    border-radius: 0px 8px 8px 0px;
    background-color: #00b5e5;
}

.poetry-box {
    max-width: 60%;
    min-width: 400px;
    margin: 0 auto;
    background: #1b1d1e;
}

.poetry {
    margin-top: 30px;
    width: 100%;
    border-radius: 5px;
    box-shadow: 3px;
}

.barrage-send-big {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
}

.poetry-item {
    display: flex;
    left: 0;
    /* position: absolute; */
    width: 100%;
    background-color: #48494b;
    /* align-items: center; */
}
</style>
