<template>
    <div style="background-color: whitesmoke;">
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
                <h3>直达航班</h3>
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
                <el-scrollbar height="600px" style="width: 98%;">
                    <TicketInfo v-for="segements in searchResult.straight" :segments="segements" />
                </el-scrollbar>
            </li>
            <el-divider />
            <li>
                <h3>智能拼接</h3>
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
                <el-scrollbar height="600px" style="width: 98%;">
                    <TicketInfo v-for=" segements in searchResult.unStraight" :segments="segements" />
                </el-scrollbar>
            </li>
            <el-divider />
            <li>
                <h3>智能推荐</h3>
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
                <el-scrollbar height="600px" style="width: 98%;">
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

const dateValue = ref('')
const destValue = ref('')
let searchResult = ref({
    "straight": [
        [
            {
                "departureCity": "New York",
                "dePartureAirport": "JFK",
                "destCity": "London",
                "destAirport": "LHR",
                "departureDate": "2024-04-01",
                "totalFare": "500",
                "totalDistance": "3450 miles",
                "travelDuration": "7 hours",
                "arrivalDate": "2024-04-02"
            }
        ],
        [
            {
                "departureCity": "Tokyo",
                "dePartureAirport": "NRT",
                "destCity": "San Francisco",
                "destAirport": "SFO",
                "departureDate": "2024-04-03",
                "totalFare": "600",
                "totalDistance": "5500 miles",
                "travelDuration": "11 hours",
                "arrivalDate": "2024-04-03"
            }
        ]
    ],
    "unStraight": [
        [
            {
                "departureCity": "Berlin",
                "dePartureAirport": "TXL",
                "destCity": "Moscow",
                "destAirport": "SVO",
                "departureDate": "2024-04-05",
                "totalFare": "300",
                "totalDistance": "1600 miles",
                "travelDuration": "3 hours",
                "arrivalDate": "2024-04-05"
            },
            {
                "departureCity": "Moscow",
                "dePartureAirport": "SVO",
                "destCity": "Dubai",
                "destAirport": "DXB",
                "departureDate": "2024-04-06",
                "totalFare": "400",
                "totalDistance": "2200 miles",
                "travelDuration": "5 hours",
                "arrivalDate": "2024-04-06"
            }
        ],
        [
            {
                "departureCity": "Sydney",
                "dePartureAirport": "SYD",
                "destCity": "Singapore",
                "destAirport": "SIN",
                "departureDate": "2024-04-08",
                "totalFare": "450",
                "totalDistance": "3900 miles",
                "travelDuration": "8 hours",
                "arrivalDate": "2024-04-08"
            },
            {
                "departureCity": "Singapore",
                "dePartureAirport": "SIN",
                "destCity": "Bangkok",
                "destAirport": "BKK",
                "departureDate": "2024-04-09",
                "totalFare": "250",
                "totalDistance": "850 miles",
                "travelDuration": "2.5 hours",
                "arrivalDate": "2024-04-09"
            }
        ]
    ],
    "recommend": [
        [
            {
                "departureCity": "Los Angeles",
                "dePartureAirport": "LAX",
                "destCity": "Paris",
                "destAirport": "CDG",
                "departureDate": "2024-04-10",
                "totalFare": "700",
                "totalDistance": "5660 miles",
                "travelDuration": "12 hours",
                "arrivalDate": "2024-04-11"
            }
        ],
        [
            {
                "departureCity": "Miami",
                "dePartureAirport": "MIA",
                "destCity": "Madrid",
                "destAirport": "MAD",
                "departureDate": "2024-04-14",
                "totalFare": "550",
                "totalDistance": "4400 miles",
                "travelDuration": "10 hours",
                "arrivalDate": "2024-04-15"
            },
            {
                "departureCity": "Madrid",
                "dePartureAirport": "MAD",
                "destCity": "Rome",
                "destAirport": "FCO",
                "departureDate": "2024-04-16",
                "totalFare": "200",
                "totalDistance": "1100 miles",
                "travelDuration": "2 hours",
                "arrivalDate": "2024-04-16"
            }
        ]
    ]
}

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

#input {
    display: flex;
    align-items: center;
    gap: 50px;
}
</style>