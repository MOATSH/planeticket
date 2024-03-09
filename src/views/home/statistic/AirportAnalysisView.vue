<template>
    <div>
        <map-container :dataset="dataset"/>
    </div>
</template>

<script setup lang='ts'>
import MapContainer from '@/component/MapContainer.vue';
let dataset = [
    {
        "title": "Los Angeles International Airport",
        "longitude": -118.4085,
        "latitude": 33.9416
    },
    {
        "title": "John F. Kennedy International Airport",
        "longitude": -73.7781,
        "latitude": 40.6413
    },
    {
        "title": "Toronto Pearson International Airport",
        "longitude": -79.6248,
        "latitude": 43.6777
    },
    {
        "title": "Vancouver International Airport",
        "longitude": -123.1847,
        "latitude": 49.1951
    },
    {
        "title": "Hartsfield-Jackson Atlanta International Airport",
        "longitude": -84.4277,
        "latitude": 33.6407
    }
]
</script>

<style scoped></style>
