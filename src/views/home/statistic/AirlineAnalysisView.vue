<template>
    <div>
        <ul class="infinite-list">
            <li>
                <el-divider />
                <h3>航空公司表</h3>
                <el-table :data="tableData" style="width: 90%">
                    <el-table-column prop="airlineName" label="航空公司名称" />
                    <el-table-column prop="country" label="所属国家" />
                    <el-table-column prop="allianceName" label="所属航空联盟" />
                </el-table>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="AirlineAnalysisView">
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

let tableData = ref([])

onMounted(async () => {
    tableData.value = (await axios.get('http://127.0.0.1:80/api/airlineInfo/list')).data
})
</script>

<style></style>