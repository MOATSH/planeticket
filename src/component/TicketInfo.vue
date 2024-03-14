<template>
    <div class="timeline">
        <div class="segment" v-for="(segment, index) in segments" :key="index">
            <!-- Departure City and Date -->
            <div class="city-box">
                <div class="city-name">{{ segment.departureCity }} ({{ segment.dePartureAirport }})</div>
                <div class="date">{{ segment.departureDate }}</div>
            </div>
            <!-- Travel Info: Fare, Distance, Duration -->
            <div v-if="segment.totalFare && segment.totalDistance && segment.travelDuration" class="travel-info">
                <span class="price">{{ segment.totalFare }}</span>
                <span class="distance">{{ segment.totalDistance }}</span>
                <span class="duration">{{ segment.travelDuration }}</span>
                <!-- Arrow or Line -->
                <span class="arrow">-----></span>
            </div>
            <!-- Destination City and Date -->
            <div v-if="index === segments.length - 1" class="city-box">
                <div class="city-name">{{ segment.destCity }} ({{ segment.destAirport }})</div>
                <div class="date">{{ segment.arrivalDate }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';

type Segment = {
    departureCity: string;
    dePartureAirport: string;
    destCity: string;
    destAirport: string;
    departureDate: string;
    arrivalDate: string;
    totalFare?: string;
    totalDistance?: string;
    travelDuration?: string;
};

defineProps({
    segments: {
        type: Array as PropType<Segment[]>,
        default: () => []
    }
});
</script>

<style scoped>
.timeline {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 16px;
    border: 1px solid #ccc;
    overflow-x: auto;
    width: 90%;
}

.segment {
    display: flex;
    align-items: center;
}

.city-box {
    text-align: center;
    margin-right: 20px;
    padding: 10px;
    border: 1px solid #ccc;
}

.city-name {
    font-weight: bold;
    margin-bottom: 4px;
}

.date {
    color: grey;
    margin-top: 4px;
}

.travel-info {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.price,
.distance,
.duration {
    margin-right: 10px;
    padding: 2px 10px;
    border: 1px solid #ccc;
    white-space: nowrap;
}

.arrow {
    font-size: 24px;
    margin: 0 20px;
}
</style>