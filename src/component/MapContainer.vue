<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';

// 定义接收的props，包含了地图点的数据
const props = defineProps<{
    dataset: Array<{
        price: string;
        longitude: number;
        latitude: number;
        cityName: string
    }>;
    clickMap: Function;
    departure: string;
}>();

let map: any = null;

onMounted(() => {
    AMapLoader.load({
        key: "0f8fea153eb991f7567e7602b34ab81b",
        version: "2.0", // 指定要加载的 JSAPI 的版本
        plugins: [], // 如果需要插件，这里配置
    })
        .then((AMap) => {
            let center;
            if (props.dataset && props.dataset.length > 0) {
                center = [-98.35, 39.50];
            } else {
                // 如果 dataset 为空，使用默认坐标
                center = [-98.35, 39.50];
            }
            map = new AMap.Map("container", {
                viewMode: "3D",
                zoom: 6, // 根据需要调整初始缩放级别
                center: center
            });

            props.dataset.forEach((item) => {
                if (item.price !== undefined) { // 确保price不是undefined
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(item.longitude, item.latitude),
                        content: `<div class="custom-content-marker"><h6 style="background-color: red; color: white">${item.price}$</h6><img style="width: 18px; height: 18px;" src="/maplocation.svg"></div>`
                    });
                    map.add(marker);
                }
                else {
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(item.longitude, item.latitude),
                        content: `<div class="custom-content-marker"><img style="width: 18px; height: 18px;" src="/maplocation.svg"></div>`
                    });
                    map.add(marker);
                }
            });
        })
        .catch((e) => {
            console.error("地图加载失败:", e);
        });
});

onUnmounted(() => {
    if (map) {
        map.destroy(); // 组件卸载时销毁地图
    }
});

watch(() => props.dataset, (newVal, oldVal) => {
    if (map) {
        map.destroy(); // 先销毁地图
    }
    AMapLoader.load({
        key: "0f8fea153eb991f7567e7602b34ab81b",
        version: "2.0", // 指定要加载的 JSAPI 的版本
        plugins: [], // 如果需要插件，这里配置
    })
        .then((AMap) => {
            let center;
            if (props.dataset && props.dataset.length > 0) {
                center = [-98.35, 39.50];
            } else {
                // 如果 dataset 为空，使用默认坐标
                center = [-98.35, 39.50];
            }
            map = new AMap.Map("container", {
                viewMode: "3D",
                zoom: 6, // 根据需要调整初始缩放级别
                center: center
            });

            props.dataset.forEach((item) => {
                if (item.price !== undefined) { // 确保price不是undefined
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(item.longitude, item.latitude),
                        content: `<div class="custom-content-marker"><img style="width: 18px; height: 18px;" src="/maplocation.svg"><a style="background-color: red; color: white">${item.price}$</a></div>`
                    });
                    // 监听点击事件
                    marker.on('click', () => {
                        // 在这里调用 props.clickMap，并传递需要的数据
                        props.clickMap(item.cityName);
                    });
                    map.add(marker);
                }
                else {
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(item.longitude, item.latitude),
                        content: `<div class="custom-content-marker"><img style="width: 18px; height: 18px;" src="/maplocation.svg"></div>`
                    });
                    map.add(marker);
                }
            });
            const request = new XMLHttpRequest();
            let cityInfo = {}
            try {
                request.open('GET', `http://127.0.0.1:80/api/cityInfo/getSingle?cityName=${props.departure}`, false); // 同步请求
                request.send(); // 发送请求

                if (request.status >= 200 && request.status < 300) {
                    // 请求成功，解析响应文本为 JSON
                    cityInfo = JSON.parse(request.responseText);
                } else {
                    // 请求失败，处理错误（例如：可以抛出异常或者记录错误信息）
                    console.error('Request failed with status:', request.status);
                }
            } catch (error) {
                // 捕获请求过程中的异常（如网络错误等）
                console.error('Request failed:', error);
            }
            const marker = new AMap.Marker({
                position: new AMap.LngLat(cityInfo.longitude, cityInfo.latitude),
                content: `<div class="custom-content-marker"><h>${cityInfo.cityName}</h><img style="width: 18px; height: 18px;" src="/star.svg"></div>`
            });
            map.add(marker);
        })
        .catch((e) => {
            console.error("地图加载失败:", e);
        });
}, {
    deep: true
});
</script>

<style scoped>
#container {
    width: 90%;
    height: 800px;
}
</style>