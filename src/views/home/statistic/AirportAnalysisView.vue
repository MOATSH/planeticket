<template>
    <div>
        <ul class="infinite-list">
            <li>
                <el-divider />
                <h3>机场信息表</h3>
                <el-table :data="tableData" style="width: 98%" height="500">
                    <el-table-column prop="title" label="机场名称" width="350" />
                    <el-table-column prop="cityName" label="所在城市" width="350" />
                    <el-table-column prop="airportCode" label="机场三字码" width="350" />
                    <el-table-column prop="longitude" label="经度" />
                    <el-table-column prop="latitude" label="维度" />
                </el-table>
            </li>
            <li>
                <el-divider />
                <h3>分布图</h3>
                <map-container :dataset="dataset" />
            </li>
            <li>
                <el-divider />
                <h3>没有其他数据了~</h3>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="AirportAnalysisView">
import MapContainer from '@/component/MapContainer.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface AirportInfo {
    title: string;
    longitude: number;
    latitude: number;
    cityName: string;
    airportCode: string;
}

let tableData = ref([])
let dataset: AirportInfo[]; // 假设API返回的是一个数组
const request = new XMLHttpRequest();
try {
    request.open('GET', 'http://127.0.0.1:80/api/airportInfo/list', false); // 同步请求
    request.send(); // 发送请求

    if (request.status >= 200 && request.status < 300) {
        // 请求成功，解析响应文本为 JSON
        dataset = JSON.parse(request.responseText);
    } else {
        // 请求失败，处理错误（例如：可以抛出异常或者记录错误信息）
        console.error('Request failed with status:', request.status);
    }
} catch (error) {
    // 捕获请求过程中的异常（如网络错误等）
    console.error('Request failed:', error);
}

onMounted(async() => {
    tableData.value = (await axios.get('http://127.0.0.1:80/api/airportInfo/list')).data
})
</script>

<style scoped></style>