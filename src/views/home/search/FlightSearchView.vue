<template>
    <div style="background-color: whitesmoke;">
        <ul class="infinite-list">
            <li>
                <div id="input">
                    <el-date-picker v-model="dateValue" type="date" placeholder="请选择您的出发日期" size=default />
                    <el-select v-model="departureCityValue" placeholder="请选择您的出发地点" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-select v-model="destCityValue" placeholder="请选择您的目的地点" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-button :icon="Search" @click="searchButton" circle></el-button>
                </div>
            </li>
            <el-divider />
            <li>
                <div class="result">
                    <el-dropdown class="dropdown-item">
                        <span class="el-dropdown-link">
                            机票总价
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="sortResults('totalFare', 'asc')">升序</el-dropdown-item>
                                <el-dropdown-item @click="sortResults('totalFare', 'desc')">降序</el-dropdown-item>
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
                                <el-dropdown-item @click="sortResults('totalDistance', 'asc')">升序</el-dropdown-item>
                                <el-dropdown-item @click="sortResults('totalDistance', 'desc')">降序</el-dropdown-item>
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
                                <el-dropdown-item @click="sortResults('travelDuration', 'asc')">升序</el-dropdown-item>
                                <el-dropdown-item @click="sortResults('travelDuration', 'desc')">降序</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </li>
            <el-divider />
            <li>
                <h3>直达航班</h3>
                <el-scrollbar height="450px" style="width: 99%;">
                    <TicketInfo v-for="segements in searchResult.straight" :segments="segements" />
                </el-scrollbar>
            </li>
            <el-divider />
            <li>
                <h3>智能拼接</h3>
                <el-scrollbar height="450px" style="width: 99%;">
                    <TicketInfo v-for=" segements in searchResult.unStraight" :segments="segements" />
                </el-scrollbar>
            </li>
            <el-divider />
            <li>
                <h3>智能推荐</h3>
                <el-scrollbar height="450px" style="width: 99%;">
                    <TicketInfo v-for="segements in searchResult.recommend" :segments="segements" />
                </el-scrollbar>
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
import axios from 'axios';

let dateValue = ref('2022-06-01T00:00:00')
let destCityValue = ref('')
let departureCityValue = ref('')
let searchResult = ref({
    "straight": [
    ],
    "unStraight": [
    ],
    "recommend": [
    ]
})
const options = [
    { "value": "ATLANTA", "label": "ATLANTA" },
    { "value": "BOSTON", "label": "BOSTON" },
    { "value": "CHARLOTTE", "label": "CHARLOTTE" },
    { "value": "DENVER", "label": "DENVER" },
    { "value": "DALLAS", "label": "DALLAS" },
    { "value": "DETROIT", "label": "DETROIT" },
    { "value": "NEW YORK", "label": "NEW YORK" },
    { "value": "WASHINGTON", "label": "WASHINGTON" },
    { "value": "LOS ANGELES", "label": "LOS ANGELES" },
    { "value": "MIAMI", "label": "MIAMI" },
    { "value": "OAKLAND", "label": "OAKLAND" },
    { "value": "CHICAGO", "label": "CHICAGO" },
    { "value": "PHILADELPHIA", "label": "PHILADELPHIA" },
    { "value": "SAN FRANCISCO", "label": "SAN FRANCISCO" }
]

async function searchButton() {
    searchResult.value = (await axios.post('http://127.0.0.1:80/api/flightInfo/search', {
        "departureCity": departureCityValue.value,
        "destCity": destCityValue.value,
        "date": convertDateToYYYYMMDD(dateValue.value)
    })).data
}

function convertDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear(); // 使用 getUTCFullYear 确保时间不受时区影响
    const month = date.getUTCMonth() + 1; // getMonth 返回的是0-11，所以要加1
    const day = date.getUTCDate();

    // 将月份和日期格式化为两位数
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    // 拼接成 YYYY-MM-DD 格式
    return `${year}-${formattedMonth}-${formattedDay}`;
}

function durationToMinutes(duration: string): number {
    const matches = duration.match(/(\d+)小时(\d+)分钟/)
    if (matches) {
        const hours = parseInt(matches[1], 10)
        const minutes = parseInt(matches[2], 10)
        return hours * 60 + minutes
    }
    return 0
}

function sortResults(property: string, order: 'asc' | 'desc') {
    const calculateSum = (flights) => {
        return flights.reduce((sum, flight) => {
            if (property === 'totalFare') {
                return sum + parseFloat(flight.totalFare)
            } else if (property === 'totalDistance') {
                return sum + parseInt(flight.totalDistance, 10)
            } else if (property === 'travelDuration') {
                return sum + durationToMinutes(flight.travelDuration)
            }
            return sum
        }, 0)
    }

    const sorter = (a, b) => {
        const sumA = calculateSum(a)
        const sumB = calculateSum(b)
        if (order === 'asc') return sumA - sumB
        else return sumB - sumA
    }

    // 应用排序
    ['straight', 'unStraight', 'recommend'].forEach(category => {
        if (searchResult.value[category]) {
            searchResult.value[category].sort(sorter)
        }
    })
}
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

#input {
    display: flex;
    align-items: center;
    gap: 50px;
}
</style>