<template>
    <div>
        <ul class="infinite-list">
            <li>
                <el-divider />
                <h3>机型信息表</h3>
                <el-table :data="tableData" style="width: 90%" height="800">
                    <el-table-column prop="aircraftTypeName" label="机型名称" />
                    <el-table-column prop="manufacturer" label="制造商" />
                </el-table>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="AircraftAnalysisView">
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
let tableData = ref([])

onMounted(async () => {
    tableData.value = (await axios.get('http://8.137.118.233:80/api/aircraftTypeInfo/list')).data
})
</script>

<style></style>