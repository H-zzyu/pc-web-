<script>

import { ref } from 'vue'
import { getLunar } from 'chinese-lunar-calendar'

export default {
        data(){
            return {
		getLunarDay: '',
        sunday:"",
		year: new Date().getFullYear(),
      	month: new Date().getMonth() + 1,
      	date: new Date().getDate(),
        day : new Date().getDate(),
        weekArr : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    }
    },
    mounted() {
	// 获取农历
    this.getLunarDay = getLunar(this.year, this.month, this.date)
    // console.log(this.getLunarDay)
    this.handleChange()
  },
  methods: {
        handleChange() {
            const getWeek = new Date(this.year, this.month - 1, this.date).getDay()
            this.sunday = this.weekArr[getWeek]
        }
    }
};

</script>
<template>
    <div class="calendar">
    <div class="calendar-right-float">
        <div>
            <div class="calender-box">
              <span class="calender-day-time">{{year}}-{{month}}-<span class="calender-day">{{  day}}</span></span >
              <span class="calender-day-sunday">{{sunday}}</span>
              
              <span class="calender-lunar">农历{{ getLunarDay.lunarYear }}</span>
              <span>{{ getLunarDay.dateStr }}</span>
              <span>{{ getLunarDay.zodiac }}</span>
            </div>
        </div>
    </div>
    </div>
</template>
<style scoped>
.calendar{
    display: inline-block;
    width: 80%;
    white-space: nowrap
}
.calendar-right-float{
    /* margin-top: 240px; */
    /* margin-right: -14%; */
    top: 0;
    border-radius: 5px;
    box-shadow: 3px;
    width: 100%;
    height: 200px;
    float: right;
    display: inline-block;
    /* margin-right: 100px; */
    /* align-self: flex-start; */
    background-color: rgb(72, 65, 78);
    padding: 10px;
}
.calender-box{
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.calender-day-time{
    font-size: 22px;

}
.calender-day-sunday{
    font-size: 22px;
    margin-bottom: 10px;
}
.calender-day{
    color: aqua;
}
.calender-lunar{
    margin-top: 5px;
}</style>