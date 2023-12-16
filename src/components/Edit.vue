<script >
export default{
    data(){
        return{
            main:{},
            rotate:0,
            img:[],
            picture:[],
            full:true,
            index:0,
            zooms:60
        }
    },
    mounted() {
    this.getMain()
    this.getArr()
    this.getshow()
    this.getZoom()
  },
   methods: {
    //edit编辑main
    Edit(){
        this.main.tabindex="1"
    },
    //控制edit显示与隐藏
    getshow(){
        this.$Bus.on("keyesc",(data)=>{
            this.full=data
        })
    },
    //接收缩放值
    getZoom(){
        this.$Bus.on("zoom",(data)=>{
            this.zooms=data
        })
    },
    //控制缩放
    Shrink(){
        if (this.main.style.transform === 'rotate(0deg)') {
            this.zooms -= 10;
            this.main.style.transform = `scale(${ this.zooms/100})`;         
        } else {
        this.zooms -= 10;
            this.main.style.transform = `scale(${ this.zooms/100})`;
}
    },
    Magnify(){
        if (this.main.style.transform === 'rotate(0deg)') {
            this.zooms += 10;
            this.main.style.transform = `scale(${ this.zooms/100})`;         
        } else {
        this.zooms += 10;
            this.main.style.transform = `scale(${ this.zooms/100})`;
}
    },
    //全屏
    Screen(){
        this.full=false
        this.$refs.all.classList.add('rotate-animation')
        this.$Bus.emit("show",true)
    },
    //获取图片列表对象
    getArr(){
        this.$Bus.on("send-img",(data)=>{
            this.index=data[1]
            this.picture=data[0]
            this.img=this.picture[this.index]
            this.rotate=0
            this.main.style.zoom=0.6
            this.zooms=100
            this.main.style.transform = `rotate(0deg)`
            // console.log(this.img) 
            
        })
    },
    //获取父组件的main的dom
   getMain(){
    this.$Bus.on('send-element', (data)=>{
        this.main=data
    });
   },
   //对main进行旋转
   Rotation(){
    this.main.classList.add('rotate-animation');
    this.rotate+=90
    this.main.style.transform = `rotate(${this.rotate}deg)`;
   },
   //对列表进行删除，然后影响main
   Deletes(){
        this.picture.splice(this.img, 1); // 从索引2开始删除一个元素
       },
  },
  beforeUnmount() {
    this.$Bus.off("send-element",)
    this.$Bus.off("show")
    this.$Bus.off("musicid");
    this.$Bus.off("keyesc");
  },

}
</script>
<template>
    <div class="low">
<div class="picture-edit" v-show="full" ref="all">
    <div class="picture-edit-main">
        <el-icon class="elicon" :size="20" @click="Edit"><EditPen /></el-icon>
        <el-icon class="elicon after" :size="20" @click="Rotation"><RefreshRight /></el-icon>
        <el-icon class="elicon after" :size="20" @click="Deletes"><Delete /></el-icon>
    </div>
    <div class="picture-edit-auxiliary">
        <el-icon class="elicon after" :size="20" @click="Screen"><FullScreen /></el-icon>
        <el-icon class="elicon after" :size="20" @click="Shrink"><ZoomOut /></el-icon>
        <el-icon class="elicon after" :size="20" @click="Magnify"><ZoomIn /></el-icon>
        <span>{{zooms}}%</span>
    </div>
    <div ref="receivedElement"></div>
</div>
</div>
</template>
<style scoped>
.after:hover{
    /* box-shadow: 1px 1px 1px red; */
    /* zoom: 1.1; */
    transform:scale(1.1)
}

.picture-edit{
    position: absolute;
    width: 100%;
    color: #ffffff;
    padding-top: 10px;
    z-index: 999;
    background-color: #1b212b;
}
.rotate-animation {
    transition: transform 1s ease-in-out; /* 添加 transform 过渡效果，持续时间为0.5秒 */
}
.picture-edit-auxiliary{
    float: right;
    display: flex;
    align-items: center;
    margin-right:10%;
}
.picture-edit-auxiliary .elicon {
    margin-right: 20px;
}
.picture-edit-main{
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translate(-50%);
}
.picture-edit-main .elicon{
    margin-right: 20px;
}
</style>