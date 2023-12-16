<script>
import axios from 'axios';
import { useCounterStore } from '@/stores/counter'
export default {
    data() {
        return {
            getadress: {
                city: "许昌市",
                province: "河南省"
            },
            forecast_24h: {
                day_weather: "获取失败",
                max_degree: "0",
                min_degree: "0",
                day_wind_direction: "获取失败"
            },
            degree:null,
        }
    },
    mounted() {
        this.GetText();
        setTimeout(() => {
                            this.GetWeather()
        }, 100); 
    },
    methods: {
        GetText() {
            const stateWeather =useCounterStore()
            // console.log(stateWeather.$state.weathers)
            if(stateWeather.$state.weathers==""){
                axios.get("/api/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
                ).then(response => {
                const data = response.data;
                this.gettext = data;
                var regex = /window\._DEFAULT_CITY\s*=\s*({[^}]+})/;
                // 使用正则表达式匹配目标字符串
                var match = this.gettext.match(regex);
                var jsonString = JSON.stringify(match);
                if (match) {
                    // 提取到的目标字符串
                    var targetString = match[1];
                    try {
                        // 使用JSON.parse()将字符串转换为对象
                        this.getadress = JSON.parse(targetString);
                        stateWeather.$state.weathers=this.getadress
                        // console.log(this.getadress);
                    } catch (error) {
                        console.log('无法解析为JSON对象');
                    }
                } else {
                    console.log('未找到目标字符串');
                }
            });
            }else{
                this.getadress=stateWeather.$state.weathers
                // console.log(this.getadress)
            }
        },
        GetWeather() {
            const stateWeather =useCounterStore()
            // console.log(stateWeather.$state.address)
            if(stateWeather.$state.address===""){
                axios.get(`/weathers/weather/common?source=pc&weather_type=observe|forecast_24h|air&province=${this.getadress.province}&city=${this.getadress.city}`, {
                 headers: {
                    'Cache-Control': 'max-age=3600' // 缓存1小时
                    }
                    
                }).then(response => {
                const data = response.data.data.forecast_24h[1]
                this.forecast_24h=data
                this.degree=response.data.data.observe.degree
                stateWeather.$state.address=response.data.data.observe.degree
                stateWeather.$state.weather24h=data
            })
            }else{
                this.degree=stateWeather.$state.address
                this.forecast_24h=stateWeather.$state.weather24h
            }
        }

    },
}
</script>

<template>
    <div class="poetry">
        <div class="poetry-right-float">
            <div class="poetry-temperature">
                <span class="temperature-address">
                    {{ getadress.city }}<el-icon class="elicon" :size="17">
                        <Location />
                    </el-icon>
                </span>
                <span class="temperature-oc">
                    {{ degree }}<span class="temperature-o">o <span
                            class="temperature-c">c</span></span>
                </span>
                <span class="temperature-max-min">
                    {{ forecast_24h.max_degree }}/ {{forecast_24h.min_degree }}<span
                        class="temperature-o o">o<span class="temperature-c c">c</span></span>
                </span>
                <span>
                    {{ forecast_24h.day_weather }}<span class="temperature-clear">
                        {{ forecast_24h.day_wind_direction }}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.poetry {
    /* margin-left: 30px; */
}

.poetry-right-float {
    position: relative;
    /* margin-top: 30px; */
    /* margin-left: 30px; */
    border-radius: 5px;
    box-shadow: 3px;
    white-space: nowrap;
    width: 100%;
    height: 200px;
    float: right;
    display: block;
    background-color: rgb(72, 65, 78);
    /* padding: 10px; */
}

.poetry-temperature {
    display: flex;
    overflow: hidden;
    /* height: 60px; */
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.temperature-address {

    font-size: 20px;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: -10px;
}

.temperature-oc {
    font-size: 70px;
    /* background-color: red; */
    display: block;
}

.temperature-o {
    font-size: 14px;
    position: relative;
    top: 5px;
    vertical-align: top;
    margin-left: -5px;
    margin-top: 100px;
}

.temperature-c {
    font-size: 28px;
    position: relative;
    top: 10px;
    margin-left: -5px;
}

.o {
    font-size: 6px;
    vertical-align: top;
    position: relative;
    top: -7px;
    margin: 0;
    margin-left: 3px;
}

.c {
    font-size: 18px;
    position: relative;
    top: 7px;
    margin: 0;
}

.temperature-max-min {
    margin-top: -10px;
}

.temperature-clear {
    margin-left: 10px;
}</style>