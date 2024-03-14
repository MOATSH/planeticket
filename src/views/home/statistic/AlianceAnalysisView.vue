<template>
    <div>
        <ul class="infinite-list">
            <li>
                <el-divider />
                <h3>航空联盟表</h3>
                <el-table :data="tableData" style="width: 90%">
                    <el-table-column prop="allianceName" label="航空联盟名称" />
                    <el-table-column prop="airlineCount" label="航空联盟公司数量" />
                </el-table>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="AlianceAnalysisView">
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

let tableData = ref([])

onMounted(async () => {
    tableData.value = (await axios.get('http://127.0.0.1:80/api/airlineAllianceInfo/list')).data
})
</script>

<style></style>