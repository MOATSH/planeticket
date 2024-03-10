<template>
    <div>
        <ul class="infinite-list">
            <li>
                <div id="input">
                    <el-date-picker v-model="dateValue" type="date" placeholder="请选择您的出发日期" size=default />
                    <el-select v-model="destValue" placeholder="请选择您的出发地点" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-select v-model="destValue" placeholder="请选择您的目的地点" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-button :icon="Search" circle></el-button>
                </div>
            </li>
            <li>
                <el-divider />
                <h3>没有其他数据了~</h3>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="FlightSearchView">
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
</script>

<style>
</style>