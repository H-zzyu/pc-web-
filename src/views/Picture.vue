<script>

import Edit from "../components/Edit.vue"
export default {
    data() {
        return {
            windowWidth: 0,
            windowHeight: 0,
            dynamicWidth: '100%',
            dynamicHeight: '0',
            isfalse:true,
            isfalses:false,
            zoomLevel: 100, // 初始缩放级别为100%
            img: [
                "src/assets/img/null-4ef717171e8bcc97.jpg",
                "src/assets/img/null-7ace07466e13aab2.jpg",
                "src/assets/img/58839867_p0.png",
                "src/assets/img/1671011407548.png",
                "src/assets/img/null5c83b3ee58088d57.jpg",
                "src/assets/img/null7f5add5d33f9a3f5.jpg",
                "src/assets/img/null41824ac144f2d3b5.jpg",                
            ],
            carousel: {
                current: 0,
            },
        };
    },
    created(){
    },
    mounted(){
        
        this.edge()
        window.addEventListener('resize', this.setmain);
        setTimeout(() => {
            this.getImageDimensions();
        }, 100); // 2000毫秒（即2秒）
        this.setsize()
        setTimeout(() => {
            this.setwindows()
        }, 100); 
        this.sendElement()
        this.setArr()
        this.Show()
        this.Zoom()
    },
    methods: {
        Zoom(){
            this.$Bus.emit("zoom",this.zoomLevel)
        },
        // 键盘事件esc控制显示与隐藏
        Keyesc(){
            this.isfalses=false
            this.$Bus.emit("keyesc",true)
        },
        //控制图片缩放
        handleWheel(event) {
    // 检测滚轮方向，更新缩放级别
            this.zoomLevel += event.deltaY > 0 ? -10 : 10;
            // 防止缩放级别过小或过大
            this.zoomLevel = Math.max(10, Math.min(200, this.zoomLevel));
            // 阻止默认滚轮事件，以防止整个页面滚动
            event.preventDefault();
            this.Zoom()
        },
        //接收值让list隐藏
        Show(){
            this.$Bus.on("show",(data)=>{
                this.isfalses=data
             })
        },
        //发送iMg数组元素个edit
        setArr(){
            this.$Bus.emit('send-img', [this.img,this.carousel.current]);
        },
        //发送main的DOM元素给edit
        sendElement() {
            this.$Bus.emit('send-element', this.$refs.main);
    },
    //切换图片左
        handleAfterClickLeft(){
            this.carousel.current = this.carousel.current-1;
            const imglength=0
            if(this.carousel.current<imglength){
                this.carousel.current=imglength
            }
            this.img.className = 'color-border'
            event.stopPropagation(); // 阻止mouseenter事件冒泡
            setTimeout(() => {
                this.setwindows()
            }, 100);
            this.setArr()
            this.zoomLevel=100
        },
        //切换图片左
        handleAfterClickRight(){
            this.carousel.current = this.carousel.current+1;
            const imglength=this.img.length-1
            if(this.carousel.current>imglength){
                this.carousel.current=imglength
            }
            this.img.className = 'color-border'
            event.stopPropagation(); // 阻止mouseenter事件冒泡
            setTimeout(() => {
                this.setwindows()
            }, 100);
            this.setArr()
            this.zoomLevel=100
        },
        show(){
            this.isfalse=!this.isfalse;
        },
        //获取窗口大小，让新窗口适应主图片的位置
        setmain(){
            this.windowWidth=window.innerWidth
            this.windowHeight= window.innerHeight
            this.setsize()
        },
        //给主图片的盒子增加宽度，让主图片展示的位置
        setsize(){
            const size= this.$refs.picturebig
            // console.log(this.windowHeight)
            size.style.height=this.windowHeight-90+"px"
            // console.log(size.style.height)
        },
        //获取最大的图片，用来适应主窗口
        setwindows(){
            const ss=this.$refs.picturebig
            // console.log(size)//不是数组无法打印所有属性
            const mainjpg=this.$refs.main
            //图片的宽度因为缩放了*.6
            // console.log(mainjpg.scrollHeight*0.6,mainjpg.scrollWidth*0.6)
        if (mainjpg.scrollHeight*0.6 >= ss.clientHeight) {
            mainjpg.style.height="1200px"
            mainjpg.style.width='auto'
            // console.log(456)
          } else if(mainjpg.scrollWidth*0.6 >= ss.clientWidth){
            mainjpg.style.height='auto'
            mainjpg.style.width='100%'
            // console.log(123)
        }else{
            mainjpg.style.height='auto'
            mainjpg.style.width='auto'
        }
        },
        //获取图片列表，并给图片增加宽度和高度，更好的图片展示
        getImageDimensions() {
      const image = this.$refs.imageRef;
      //是属性的时候会打印出该对象的所有属性的
    //   console.log(image)
      image.forEach((images, index) => {
        // naturalHeight
        // naturalWidth
        if (images.naturalHeight >= images.naturalWidth) {
            images.style.height='100%'
            images.style.width='auto'
          } else {
            images.style.height='auto'
            images.style.width='100%'    
        }
      })  
        },
        //点击切换图片
        handleAfterClick(index) {
            this.carousel.current = index;
            this.img.className = 'color-border'
            setTimeout(() => {
                this.setwindows()
            }, 100);
            this.setArr()
            this.zoomLevel=100
        },
        //窗口的大小
        edge(){
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            console.log("windowWidth: " + this.windowWidth, "windowHeight: " + this.windowHeight)
        }
    },
    computed: {
    showImg() {
      return this.img[this.carousel.current];
        },
    },
    beforeUnmount() {
        this.$Bus.off("send-element")
        this.$Bus.off("send-img")
        this.$Bus.off("show")
        this.$Bus.off("keyesc")
  },
    beforeDestroy() {
    // 在组件销毁前移除窗口大小变化的监听器
        window.removeEventListener('resize',this.setmain);
    },
};
</script>
<template>
    <div class="picture-box" 
    @keyup.left="handleAfterClickLeft"
     @keyup.right="handleAfterClickRight"
     @wheel="handleMouseWheel"
     @keyup.esc="Keyesc"
     tabindex="0"

    >
        <Edit ref="main"></Edit>
        <div class="picture" ref="picturebig" >
            <div class="picture-main" @click="show">
                <div class="picture-left-right" 
                
                @click="handleAfterClickLeft"
                >
                    <el-icon class="icon" :size="35" 
                    ><ArrowLeft /></el-icon>
                </div>
                <img :src="showImg" alt="" ref="main" @wheel="handleWheel" :style="{ transform: `scale(${zoomLevel/100})` }" />
                <div class="picture-left-right c"
                
                @click="handleAfterClickRight"
                >
                    <el-icon class="icon" :size="35" ><ArrowRight /></el-icon>
                </div>
            </div>
            <transition name="fade">
                <div class="picture-all-list " v-show="isfalses? false: isfalse">
                    <div class="a">
                        <div v-for="(item, index) in img" :key="index"                             :class="{ 'color-border': index === carousel.current }"
                         id="picture-list">
                            <img :src="item" 
                            alt="Image"
                            ref="imageRef"
                            @click="handleAfterClick(index)" 
                            />
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<style scoped>
h2 {
    /* padding: 10px; */
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.picture-left-right{
    display: flex;
    align-items: center;
    width: 100px;
    /* background-color: red; */
    height: 100%;
    z-index: 999;
}
.picture-left-right .icon{
    display: none;
}

.picture-left-right:hover .icon{
    display: block;
}

.picture-all-list{
    position: fixed;
    bottom: 20px;
    display: flex;
    height: 100px;
    justify-content: center; 
    align-items: center; /* 垂直方向居中 */
    width: 60%;
    overflow-x: auto; /* 添加横向滚动条 */
    /* background-color: aquamarine; */
    &::-webkit-scrollbar {
    display: none;
  }
}
.c{
    justify-content: flex-end; /* 将子元素沿主轴末尾对齐 */
}

.icon-show {
    opacity: 1;
    transition: opacity 0.3s ease; /* 添加过渡效果 */
}
.a{
    /* position: fixed; */
    /* bottom: 20px; */
    display: flex;
    height: 80px;
    justify-content: center; 
    align-items: center; /* 垂直方向居中 */
    border-radius: 10px;
    background-color: #2c2e33;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.color-border {
  border: 3px solid #9bc9d1; /* 这里可以设置边框样式 */
  border-radius: 10px;
}
#picture-list{
   /* flex: 1; */
   width: 64px;
   margin-left: 5px;
   height: 64px;
   overflow: hidden;
   margin-right: 5px;
    border-radius: 10px;
   background-color: #3b363e;
   display: flex;
   justify-content: center;
   align-items: center;
}
.picture-list img{
 height: 100%;
 width: 100%;
}

.picture-box {
    position: relative;
    width: 80%;
    outline: none; /* 去掉默认的焦点样式（例如边框） */
    margin: 0 auto;
    /* background-color: brown; */
}
.picture {
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* background-color: rgb(131, 255, 127); */
}

h1{
  text-align: center;
  margin-top:30px ;
}
.picture-main{
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    width: 100%;
    height: 100%;
    /* background-color: red; */
    /* margin: 0 auto; */
}

.picture-main img{
    overflow: hidden;
    zoom: 0.6;
}
.after:hover{
    box-shadow: 10px;
    
}
</style>