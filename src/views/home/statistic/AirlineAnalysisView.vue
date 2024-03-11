<template>
    <div>
        <ul class="infinite-list">
            <li>
                <el-divider />
                <h3>航空公司表</h3>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="airlineName" label="航空公司名称" width="350" />
                    <el-table-column prop="country" label="所属国家" width="350" />
                    <el-table-column prop="alianceName" label="所属航空联盟" />
                </el-table>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="AirlineAnalysisView">
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

<style></style>