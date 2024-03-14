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
            <el-divider />
            <li>
                <div>
                    <el-dropdown class="dropdown-item">
                        <span class="el-dropdown-link">
                            机票总价
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>升序</el-dropdown-item>
                                <el-dropdown-item>降序</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-dropdown class="dropdown-item">
                        <span class="el-dropdown-link">
                            飞行总距离
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>升序</el-dropdown-item>
                                <el-dropdown-item>降序</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-dropdown class="dropdown-item">
                        <span class="el-dropdown-link">
                            飞行总时间
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>升序</el-dropdown-item>
                                <el-dropdown-item>降序</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <ul class="straightList">
                    <TicketInfo :segments="segments" />
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts' name="FlightSearchView">
import { ref } from 'vue'
import TicketInfo from '@/component/TicketInfo.vue'
import {
    Search,
    ArrowDown
} from '@element-plus/icons-vue'

const dateValue = ref('')
const destValue = ref('')
let segments = ref([
    {
        "departureCity": "北京",
        "dePartureAirport": "首都国际机场",
        "destCity": "上海",
        "destAirport": "浦东国际机场",
        "departureDate": "2024-03-20",
        "totalFare": "￥1200",
        "totalDistance": "1210公里",
        "travelDuration": "2小时",
        "arrivalDate": "2024-03-20"
    },
    {
        "departureCity": "纽约",
        "dePartureAirport": "约翰·肯尼迪国际机场",
        "destCity": "洛杉矶",
        "destAirport": "洛杉矶国际机场",
        "departureDate": "2024-03-22",
        "totalFare": "$300",
        "totalDistance": "3940公里",
        "travelDuration": "6小时",
        "arrivalDate": "2024-03-22"
    }
]
)
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

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary) !important;
    display: flex;
    align-items: center;
}

.dropdown-item:not(:last-of-type) {
    margin-right: 50px;
}

.dropdown-item:first-of-type {
    margin-left: 50px;
}
</style>