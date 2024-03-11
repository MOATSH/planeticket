<template>
    <div>
        <ul class="infinite-list">
            <li>
                <div id="destination">
                    <el-date-picker v-model="dateValue" type="date" placeholder="请选择您的出发日期" size=default />
                    <el-select v-model="departureCityValue" placeholder="请选择您的出发地点" style="width: 240px">
                        <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <span>
                        <el-text class="mx-1" type="success">查询推荐目的地</el-text>
                        <el-button :icon="Search" circle></el-button>
                    </span>
                </div>
            </li>
            <li>
                <el-divider />
                <h3>地图</h3>
                <map-container :dataset="destResponse.mapInfo" />
            </li>
            <li>
                <el-divider />
                <h3>查看城市机票价格趋势</h3>
                <div id="time">
                    <el-select v-model="destCityValue" placeholder="选择您的目的城市" style="width: 240px">
                        <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <span>
                        <el-text class="mx-1" type="success">查询该目的地的机票价格趋势</el-text>
                        <el-button :icon="Search" circle @click="timeButtonClick"></el-button>
                    </span>
                </div>
            </li>
            <li>
                <el-divider />
                <h3>没有其他数据了~</h3>
            </li>
        </ul>
        <el-dialog v-model="dialogTableVisible">
            <div style="display: flex; gap: 70px">
                <div id="toPriceChart" style="width: 600px; height:400px;"></div>
                <div id="backPriceChart" style="width: 600px; height:400px;"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang='ts' name="FlightRecommendView">
import MapContainer from '@/component/MapContainer.vue'
import { nextTick, ref } from 'vue'
import {
    Search
} from '@element-plus/icons-vue'
import * as echarts from 'echarts';

const dateValue = ref('')
const destCityValue = ref('')
const departureCityValue = ref('')
const dialogTableVisible = ref(false)
let toPriceChart: any = null
let backPriceChart: any = null

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


let destResponse = {
    'mapInfo': [{ 'longitude': -78.136452, 'latitude': 35.319266, 'price': '174.84' },
    { 'longitude': -77.057438, 'latitude': 49.313539, 'price': '256.31' },
    { 'longitude': -105.725863, 'latitude': 40.926889, 'price': '373.48' }]
}

let timeResponse = {
    'departureCity': 'Houston',
    'destCity': 'ChicaGo',
    'priceList': [
        {
            'price': '260.05', 'date': '2024-01-01'
        },
        {
            'price': '976.89', 'date': '2024-02-01'
        },
        {
            'price': '223.89', 'date': '2024-03-01'
        },
        {
            'price': '799.49', 'date': '2024-04-01'
        },
        {
            'price': '722.95', 'date': '2024-05-01'
        },
        {
            'price': '866.84', 'date': '2024-06-01'
        },
        {
            'price': '645.09', 'date': '2024-07-01'
        },
        {
            'price': '953.97', 'date': '2024-08-01'
        },
        {
            'price': '946.73', 'date': '2024-09-01'
        },
        {
            'price': '466.28', 'date': '2024-10-01'
        },
        {
            'price': '282.11', 'date': '2024-11-01'
        },
        {
            'price': '734.99', 'date': '2024-12-01'
        }
    ]
}

function timeButtonClick() {
    dialogTableVisible.value = true;
    // 确保图表在 dialog 可见后初始化

    nextTick(() => {
        if (!toPriceChart) {
            toPriceChart = echarts.init(document.getElementById('toPriceChart'));
        }
        if (departureCityValue.value != '' && destCityValue.value != '') {
            let toTitle = departureCityValue.value + '-->' + destCityValue.value
            toPriceChart.setOption({
                title: { text: toTitle },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: timeResponse.priceList.map(item => item.date)
                },
                yAxis: { type: 'value' },
                series: [{
                    data: timeResponse.priceList.map(item => parseFloat(item.price)),
                    type: 'line'
                }]
            });
            if (!backPriceChart) {
                backPriceChart = echarts.init(document.getElementById('backPriceChart'));
            }
            let backTitle = destCityValue.value + '-->' + departureCityValue.value
            backPriceChart.setOption({
                title: { text: backTitle },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: timeResponse.priceList.map(item => item.date)
                },
                yAxis: { type: 'value' },
                series: [{
                    data: timeResponse.priceList.map(item => parseFloat(item.price)),
                    type: 'line'
                }]
            });
        }
        else {
            toPriceChart.setOption({
                title: { text: '请选择出发城市和目的城市！！！'}
            })
        }
    });
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
</style>