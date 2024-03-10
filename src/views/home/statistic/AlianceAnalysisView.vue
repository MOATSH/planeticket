<template>
    <div>
        <ul class="infinite-list">
            <li>
                <el-divider />
                <h3>航空联盟表</h3>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="航空联盟名称" width="350" />
                    <el-table-column prop="name" label="联盟航空公司" width="350" />
                    <el-table-column prop="address" label="航空联盟公司数量" />
                </el-table>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="AlianceAnalysisView">
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