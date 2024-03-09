<template>
    <div>
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleTabClick">
            <el-tab-pane label="机场" name="airport"></el-tab-pane>
            <el-tab-pane label="城市" name="city"></el-tab-pane>
            <el-tab-pane label="机型" name="aircraft"></el-tab-pane>
            <el-tab-pane label="航空公司" name="airline"></el-tab-pane>
            <el-tab-pane label="航空联盟" name="aliance"></el-tab-pane>
        </el-tabs>
        <component :is="currentComponent"></component>
    </div>
</template>

<script setup lang="ts" name="StatisticView">
import { ref, computed, type DefineComponent } from 'vue'
import AirPortAnalysisView from './AirportAnalysisView.vue'
import CityAnalysisView from './CityAnalysisView.vue'
import AircraftAnalysisView from './AircraftAnalysisView.vue';
import AirlineAnalysisView from './AirlineAnalysisView.vue';
import AlianceAnalysisView from './AlianceAnalysisView.vue';

const activeTab = ref('airport'); // 默认选中的标签页
interface ComponentsMap {
  [key: string]: DefineComponent<any, any, any, any, any, any, any, any, any, any>;
}

// 根据当前选中的标签页名称映射到对应的组件
const componentsMap: ComponentsMap = {
    airport: AirPortAnalysisView,
    city: CityAnalysisView,
    aircraft: AircraftAnalysisView,
    airline: AirlineAnalysisView,
    aliance: AlianceAnalysisView
};

// 计算属性，根据当前选中的标签页动态返回对应的组件
const currentComponent = computed(() => componentsMap[activeTab.value]);

function handleTabClick(tab: any) {
    activeTab.value = tab.name; // 更新当前选中的标签页
}
</script>

<style>
.demo-tabs>.el-tabs__content {
    padding: 1px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}
</style>