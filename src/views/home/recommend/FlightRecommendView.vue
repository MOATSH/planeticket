<template>
    <div style="background-color: whitesmoke;">
        <ul class="infinite-list">
            <li>
                <div id="destination">
                    <el-date-picker v-model="dateValue" type="date" placeholder="请选择您的出发日期" size=default />
                    <el-select v-model="departureCityValue" placeholder="请选择您的出发城市" style="width: 240px">
                        <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <span>
                        <el-button :icon="Search" circle @click="whereButtonClick"></el-button>
                    </span>
                </div>
            </li>
            <li>
                <el-divider />
                <h3>分布图</h3>
                <map-container :dataset="destResponse.mapInfo" :clickMap="clickMap" :departure="departureCityValue" />
            </li>
            <li>
                <el-divider />
                <h3>查看城市机票价格趋势</h3>
                <div id="time">
                    <el-select v-model="destCityValue" placeholder="选择您的目的城市" style="width: 240px">
                        <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <span>
                        <el-button :icon="Search" circle @click="timeButtonClick"></el-button>
                    </span>
                </div>
            </li>
        </ul>
        <el-dialog v-model="dialogTableVisible" width="1670" align-center style="padding: 30px;">
            <div>
                <div id="toPriceChart"></div>
                <el-divider />
                <div id="backPriceChart"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang='ts' name="FlightRecommendView">
import MapContainer from '@/component/MapContainer.vue'
import { nextTick, reactive, ref, watch } from 'vue'
import {
    Search
} from '@element-plus/icons-vue'
import * as echarts from 'echarts';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const dateValue = ref('2022-06-01T00:00:00')
const destCityValue = ref('')
const departureCityValue = ref('')
const dialogTableVisible = ref(false)
let toPriceChart: any = null
let backPriceChart: any = null
let destResponse = reactive({
    'mapInfo': []
})

const citys = [
    { "value": "ATLANTA", "label": "ATLANTA" },
    { "value": "BOSTON", "label": "BOSTON" },
    { "value": "CHARLOTTE", "label": "CHARLOTTE" },
    { "value": "DENVER", "label": "DENVER" },
    { "value": "DALLAS", "label": "DALLAS" },
    { "value": "DETROIT", "label": "DETROIT" },
    { "value": "NEW YORK", "label": "NEW YORK" },
    { "value": "WASHINGTON", "label": "WASHINGTON" },
    { "value": "LOS ANGELES", "label": "LOS ANGELES" },
    { "value": "MIAMI", "label": "MIAMI" },
    { "value": "OAKLAND", "label": "OAKLAND" },
    { "value": "CHICAGO", "label": "CHICAGO" },
    { "value": "PHILADELPHIA", "label": "PHILADELPHIA" },
    { "value": "SAN FRANCISCO", "label": "SAN FRANCISCO" }
]

let timeToResponse = ref({
    "departureCity": departureCityValue.value,
    "destCity": destCityValue.value,
    priceList: [
        {
            "date": '',
            "price": ''
        }
    ]
})
let timeBackResponse = ref({
    "departureCity": destCityValue.value,
    "destCity": departureCityValue.value,
    priceList: [
        {
            "date": '',
            "price": ''
        }
    ]
})

async function timeButtonClick() {
    if (departureCityValue.value == '' || destCityValue.value == '') {
        ElMessage.error('请选择出发城市和目的城市！')
    }
    else {
        dialogTableVisible.value = true;
        // 确保图表在 dialog 可见后初始化

        nextTick(async () => {
            timeToResponse.value = (await axios.post('http://127.0.0.1/api/flightInfo/recommend/time', {
                "departureCity": departureCityValue.value,
                "destCity": destCityValue.value
            })).data
            timeBackResponse.value = (await axios.post('http://127.0.0.1/api/flightInfo/recommend/time', {
                "departureCity": destCityValue.value,
                "destCity": departureCityValue.value
            })).data

        });
    }
}

watch(timeToResponse, (newValue, oldValue) => {
    if (!toPriceChart) {
        toPriceChart = echarts.init(document.getElementById('toPriceChart'), null, { width: 1600, height: 900 });
    }
    let toTitle = '去程' + newValue.departureCity + '-->' + newValue.destCity
    toPriceChart.setOption({
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            },
            {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0,
                min: 0,
                max: timeToResponse.value.priceList.length - 1
            }
        ],
        title: { text: toTitle, left: 'center' },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: timeToResponse.value.priceList.map((item => item.date)),
            name: '日期'
        },
        yAxis: { type: 'value', 'name': '价格$' },
        series: [{
            data: timeToResponse.value.priceList.map(item => parseFloat(item.price)),
            type: 'line'
        }]
    });
}, { deep: true })
watch(timeBackResponse, (newValue, oldValue) => {
    if (!backPriceChart) {
        backPriceChart = echarts.init(document.getElementById('backPriceChart'), null, { width: 1600, height: 900 });
    }
    let backTitle = '返程' + newValue.departureCity + '-->' + newValue.destCity
    backPriceChart.setOption({
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            },
            {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0,
                min: 0,
                max: timeToResponse.value.priceList.length - 1
            }
        ],
        title: { text: backTitle, left: 'center' },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: timeBackResponse.value.priceList.map(item => item.date),
            name: '日期'
        },
        yAxis: { type: 'value', 'name': '价格$' },
        series: [{
            data: timeBackResponse.value.priceList.map(item => parseFloat(item.price)),
            type: 'line'
        }]
    });
}, { deep: true })

function formatDateToMidnightLocal(dateString: any) {
    let date = new Date(dateString);
    date.setHours(0, 0, 0, 0); // 将时间调整为00:00:00
    // 手动构建格式为 YYYY-MM-DDT00:00:00 的字符串
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() 返回的月份从 0 开始
    const day = date.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00`;
    return formattedDate;
}

async function whereButtonClick() {
    if (departureCityValue.value == '' || dateValue.value == '') {
        ElMessage.error('请选择出发时间和出发城市！')
    }
    let adjustedDate = formatDateToMidnightLocal(dateValue.value); // 使用新的函数调整日期
    let postData = {
        'date': adjustedDate,
        'departureCity': departureCityValue.value
    };
    destResponse.mapInfo = (await axios.post("http://8.137.118.233:80/api/flightInfo/recommend/destination", postData)).data.mapInfo;

}

async function clickMap(value: string) {
    dialogTableVisible.value = true;

    timeToResponse.value = (await axios.post('http://127.0.0.1/api/flightInfo/recommend/time', {
        "departureCity": departureCityValue.value,
        "destCity": value
    })).data
    timeBackResponse.value = (await axios.post('http://127.0.0.1/api/flightInfo/recommend/time', {
        "departureCity": value,
        "destCity": departureCityValue.value
    })).data
}
</script>

<style>
#destination {
    display: flex;
    align-items: center;
    gap: 50px;
}

#time {
    display: flex;
    align-items: center;
    gap: 50px;
}

#toPriceChart,
#backPriceChart {
    width: 1600px;
    height: 900px;
}
</style>