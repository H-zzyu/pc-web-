// stores/counter.js

import { createPinia, defineStore } from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)
export const useCounterStore = defineStore('myStore', {
    state: () => ({
        arIds: [],
        likes:"",
        musics:"",
        weathers:"",
        weather24h:"",
        address:"",
        oneday:""
      }),
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    // 添加 arIds 的 mutation
    increment(newData) {
        const hasId = newData && newData.id;
        const isNewIdUnique = hasId && this.arIds.every(existingData => existingData.id !== newData.id);
        if (hasId && isNewIdUnique) {
          // 如果有ID且是唯一的，则执行更新操作
          this.arIds.push(newData);
        } else {
          // 如果没有ID或者ID已存在，则不执行更新操作
          console.log('没有ID或者ID已存在，不执行更新操作');
        }
      },
      like(data){
        this.likes=data
      },
      musics(data){
        this.musics=data
      },
      address(data){
        this.address=data
      },
      weathers(data){
        this.weathers=data
      },
      oneday(data){
        this.oneday=data
      }
  },
})