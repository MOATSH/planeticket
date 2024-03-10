<template>
    <div>
        <ul class="infinite-list">
            <li>
                <el-divider />
                <h3>机型信息表</h3>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="机型名称" width="350" />
                    <el-table-column prop="name" label="制造商" width="350" />
                    <el-table-column prop="address" label="所使用航空公司" />
                </el-table>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="AircraftAnalysisView">
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