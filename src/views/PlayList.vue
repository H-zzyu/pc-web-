<script >

import { useRouter } from 'vue-router'; // 导入 useRouter 函数
// import PlayMusic from "../components/PlayMusic.vue"
// import MusicName from '../components/MusicName.vue'
// import MusicSearch from './MusicSearch.vue'
export default {
    data() {
        return {

            music: {},
            text: "",
        }
    },
    mounted() {
        // this.$Bus.on("text", this.handleText);
    },
    methods: {
        musciname() {
            this.$router.push('/musicsearch');
            // console.log(this.text)
           
            setTimeout(() => {
                this.$Bus.emit("text", this.text)
            }, 500);
        },
    },
    beforeUnmount() {
        this.$Bus.off("text");
        // console.log("组件销毁")
    },
}

</script>
<template>
    <div class="play-box">

        <div class="play">
            <div class="music-seach">
                <router-link to="/musicname" class="router-link">
                    <el-icon class="elicon" :size="25">
                        <ArrowLeft />
                    </el-icon>
                </router-link>
                <el-icon class="elicon" :size="25">
                    <ArrowRight />
                </el-icon>
                <!-- <router-link to="/musicsearch"> -->
                    <input type="text" class="search-name" v-model="text" @keyup.enter="musciname">
                <!-- </router-link> -->

            </div>
            <router-view></router-view>
            <!-- <MusicSearch></MusicSearch> -->
            <PlayMusic></PlayMusic>
        </div>
    </div>
</template>
<style scoped>
.music-seach {
    display: flex;
    /* align-items: center; */
    border: 0;
    padding: 0;
    justify-content: between;
}
.search-name{
    height: 25px;
}

.router-link {
    text-decoration: none;
    color: inherit;
}

.music-seach input {
    color: #000;
    /* background-color: #333; */
    outline: none;
    margin-left: 15px;
}

h2 {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.play-box {
    margin-top: 10px;
    width: 80%;
    margin: 0 auto;
    /* background-color: brown; */
}

.play {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: inline-block;
    box-shadow: 3px;
    /* background-color: rgb(131, 255, 127); */
}
</style>