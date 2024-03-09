<template>
    <div>
        <map-container :dataset="dataset"/>
    </div>
</template>

<script setup lang='ts' name="CityAnalysisView">
import MapContainer from '@/component/MapContainer.vue'
let dataset = [
    {
        "title": "Los Angeles",
        "longitude": -118.4085,
        "latitude": 33.9416,
    },
    {
        "title": "New York",
        "longitude": -73.7781,
        "latitude": 40.6413,
    },
    {
        "title": "Toronto",
        "longitude": -79.6248,
        "latitude": 43.6777,
    },
    {
        "title": "Vancouver",
        "longitude": -123.1847,
        "latitude": 49.1951,
    },
    {
        "title": "Atlanta",
        "longitude": -84.4277,
        "latitude": 33.6407,
    }
]
</script>

<style scoped>
</style>