<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';

// 定义接收的props，包含了地图点的数据
const props = defineProps<{
    dataset: Array<{
        title: string;
        longitude: number;
        latitude: number;
    }>;
}>();

let map: any = null;

onMounted(() => {
    AMapLoader.load({
        key: "0f8fea153eb991f7567e7602b34ab81b",
        version: "2.0", // 指定要加载的 JSAPI 的版本
        plugins: [], // 如果需要插件，这里配置
    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                viewMode: "3D",
                zoom: 4, // 根据需要调整初始缩放级别
                center: [props.dataset[0].longitude, props.dataset[0].latitude], // 根据dataset调整初始中心点，这是北京的经纬度
            });

            // 遍历dataset，为每个位置创建一个标记
            props.dataset.forEach((item) => {
                console.log(item)
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(item.longitude, item.latitude),
                    content: `<div class="custom-content-marker"><img src="/favicon.ico"><h6>${item.title}</h6></div>`
                });
                map.add(marker);
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
</script>

<style scoped>
#container {
    width: 100%;
    height: 800px;
}
</style>