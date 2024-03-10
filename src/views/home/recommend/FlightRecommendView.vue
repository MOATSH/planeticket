<template>
    <div>
        <ul class="infinite-list">
            <li>
                <div id="input">
                    <el-date-picker v-model="dateValue" type="date" placeholder="请选择您的出发日期" size=default />
                    <el-select v-model="destValue" placeholder="请选择您的出发地点" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-button :icon="Search" circle></el-button>
                </div>
            </li>
            <li>
                <el-divider />
                <h3>地图</h3>
                <map-container :dataset="dataset" />
            </li>
            <li>
                <el-divider />
                <h3>票价预测</h3>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="时间" width="350" />
                    <el-table-column prop="name" label="地点" width="350" />
                    <el-table-column prop="address" label="预测最低票价" />
                </el-table>
            </li>
            <li>
                <el-divider />
                <h3>没有其他数据了~</h3>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="FlightRecommendView">
import MapContainer from '@/component/MapContainer.vue'
import { ref } from 'vue'
import {
    Search
} from '@element-plus/icons-vue'

const dateValue = ref('')

const destValue = ref('')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]

let dataset = [
    {
        "title": "Los Angeles",
        "longitude": -118.4085,
        "latitude": 33.9416,
    },
    {
        "title": "New York",
        "longitude": -73.7781,
        "latitude": 40.6413,
    },
    {
        "title": "Toronto",
        "longitude": -79.6248,
        "latitude": 43.6777,
    },
    {
        "title": "Vancouver",
        "longitude": -123.1847,
        "latitude": 49.1951,
    },
    {
        "title": "Atlanta",
        "longitude": -84.4277,
        "latitude": 33.6407,
    }
]
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
]
</script>

<style>
#input {
    display: flex;
    align-items: center;
    gap: 50px;
}
</style>