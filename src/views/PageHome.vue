<script >
import { ref } from 'vue'
import Temperature from '../components/Temperature.vue';
import  CalendarDay  from '../components/CalendarDay.vue';
import { useCounterStore } from '@/stores/counter.js'; // 替换为实际的存储路径
import axios from 'axios'
export default {
    data() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),

            oneday:
                {forward: "我有时候在想，我是真的不太需要其他人，还是因为跟他们在一起时没法做自己，所以才保持距离。我们的交谈就像是平行而毫无交集的自言自语。",
                content_id:"4157",
                img_url:"http://image.wufazhuce.com/FuSzih6tky1HuEmtWi9M_EVcslr8",
                words_info:"西里尔·佩德罗萨《春分秋分》",
                post_date:"2023-10-07 06:00:00"}
            ,
            anyone:[
            ],
            totalPage: [], // 所有分页的数据
            pageSize: 5, // 每页显示数量
            pageNum: 1,  // 共几页=所有数据/每页现实数量     
            dataShow: [], // 当前显示的数据  
            currentPage: 0 // 默认当前显示第一页
        }
    },
    mounted(){
        this.getPotoshop()
        setTimeout(()=>{
            this.getOneday()
        },10)        
    },
    methods: {
        nextPage() {
              if (this.currentPage === this.pageNum - 1) return ;
              this.dataShow = this.totalPage[++this.currentPage];
            },
            // 上一页
            prePage() {
              if (this.currentPage === 0) return ;
              this.dataShow = this.totalPage[--this.currentPage];
            },
            // 点击页码
            page(i){
                this.currentPage = i
                this.dataShow = this.totalPage[i-1];
            },
            //分页
        pagination(){
            this.pageNum = Math.ceil(this.anyone.length / this.pageSize) || 1;//计算有多少页数据，默认为1

            // 循环页面
            for (let i = 0; i < this.pageNum; i++) {
            // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
            // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为2， 则第一页是1-2条，即slice(0,2)，第二页是3-4条，即slice(3,4)以此类推
            this.totalPage[i] = this.anyone.slice(this.pageSize * i, this.pageSize * (i + 1))
            }

            // 获取到数据后默认显示第一页内容
            this.dataShow = this.totalPage[this.currentPage];
        },
        //数据存储到state
        statelike(){
          
        },
       //读取每日一看
        getPotoshop() {
            const stateLike=useCounterStore()
            // console.log(stateLike.$state.likes)
            if(stateLike.$state.oneday==""){
                this.url = `/oneday/api/channel/one/${this.year}-${this.month}-${this.day}/0?channel=huawei&sign=bfa53632d940904abc5a1a1d7227d987&version=5.3.0&uuid=10a858231dd4b31e0a9099a14803a0dd8&platform=androi`

            axios.get(this.url)
                .then(response => {
                    const ss=response.data.data.content_list[0]
                    this.oneday=ss; // 获取响应数据
                    stateLike.$state.oneday=response.data.data.content_list[0]
                    // console.log(this.oneday);
                    this.postNodeSql()
                }).catch(error => {
                    // 处理错误
                    this.$message.error('请求api接口失败');
                });
            }else{
                this.oneday=stateLike.$state.oneday
            }
            
        },
        //取数据
        getOneday(){
            if(this.$)
            axios.get('http://127.0.0.1:3000/like', {
                 headers: {
                    'Cache-Control': 'max-age=3600' // 缓存1小时
                    }
                })
                .then(response => {
                // 请求成功时的处理
                // console.log(response.data);
                this.anyone=response.data
                this.anyone.reverse()
                this.pagination()

                })
                .catch(error => {
                // 请求失败时的处理
                    
                });
        },
        //存储数据
        postNodeSql() {
      // 从 Vuex store 获取数据
      const forward = this.oneday.forward;
      const words_info =this.oneday.words_info;
      const url = this.oneday.img_url;
      const id = this.oneday.content_id;
      const time=this.oneday.post_date;
      // 构建请求数据对象
      const requestData = {
        forward,
        words_info,
        url,
        id,
        time
      };

      axios.post('http://127.0.0.1:3000/likes', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // 请求成功时的处理
          console.log("请求成功")
        //   console.log(response.data);
        })
        .catch(error => {
          // 请求失败时的处理
        //   console.error(error);
        });
    },

    }
}

</script>
<template>
    <div class="poetry-box">
        <div class="poetry">
            <div class="">
                
                <h2>全部</h2>
                <!-- <div class="poetry-item">
                    <div class="poetry-one-box">
                        <img class="poetry-one-jpg" src="http://image.wufazhuce.com/Fg4EEKzdtdI2gNGbmfNqEWAtXPuO" alt="">
                    </div>
                    <div class="poetry-one-text">
                        <div class="poetry-one-tall">
                            <span>我宁愿做自己，做卑微的自己，也不愿做别人，无论那会多么快乐。----
                                <span>《美丽新世界》
                                </span>
                            </span>
                        </div>
                        <div class="poetry-one-time"><span>2023-11-05</span></div>
                    </div>
                </div> -->

                <div class="poetry-item" v-for="item in dataShow" key="item.id">
                    <div class="poetry-one-box">
                        <img class="poetry-one-jpg" :src="item.url" alt="">
                    </div>
                    <div class="poetry-one-text">
                        <div class="poetry-one-tall">
                            <span>{{item.forward}}----
                                <span>{{item.words_info}}
                                </span>
                            </span>
                        </div>
                        <div class="poetry-one-time"><span>{{item.time}}</span></div>
                    </div>
                </div>
            </div>
            
        </div>
        <div>
            <input type="button" value="上一页" @click="prePage">
        <span v-for="i in pageNum" @click="page(i)" :style="{cursor: 'pointer', margin:'10px'}">{{ i }}</span>
        <input type="button" value="下一页" @click="nextPage"></div>
        <div class="cls">
            <Temperature></Temperature>
            <CalendarDay></CalendarDay>
        </div>
    </div>
</template>
<style scoped>
.poetry-one-time{
    color: #201c1c;
}
.cls{
    float: right;
    position: fixed;
    top: 6%;
    right: 6%;;
    /* display: inline-block; */
    width: 18%;
    /* height: 200px; */
    /* background-color: red; */
}

h2 {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.poetry-box {
    width: 80%;
    margin: 0 auto;
    /* background-color: brown; */
}

.poetry .poetry-one-text {
    
    /* white-space: nowrap; */
    line-height: 1.2; /* 设置文本行高 */
    font-size: 18px;
    
    color: rgb(221, 216, 216);
}

.poetry-one-text span {
    text-align: center;
}

.poetry-one-tall {
    display: flex;
     overflow: hidden;
  text-overflow: ellipsis;

    height: 85px;
    margin-top: 20px;
    margin-right: 20px;
    align-items: center;
}

.poetry {
    /* margin: 0 auto; */
    margin-top: 30px;
    width: 80%;
    border-radius: 5px;
    display: inline-block;
    box-shadow: 3px;
    background-color: #454444;
}

.poetry-item .poetry-one-time {
    position: relative;
    left: 10px;
       overflow: hidden;
    top: 5px;
}

.poetry-item {
    display: flex;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    /* align-items: center; */
}

.poetry-item .poetry-one-box {
    /* overflow: hidden; */
    height: 120px;
    display: inline-block;
    /* width: 180px; */
    border-radius: 6px;
    margin: 10px;
    /* background-color: red; */
}

.poetry-one-box .poetry-one-jpg {
    border-radius: 6px;
    display: inline-block;
    height: 120px;
    width: 160px;

}
</style>