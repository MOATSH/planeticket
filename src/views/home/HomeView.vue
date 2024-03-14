<template>
    <div id="top" style="background-color: #333333; display: flex; align-items: center; color: white;">
        <el-tabs v-model="activeTab" class="demo-tabs" style="margin-right: 60px; width: 1600px;">
            <el-tab-pane label="维度数据" name="analysis"></el-tab-pane>
            <el-tab-pane label="机票查询" name="search"></el-tab-pane>
            <el-tab-pane label="航班推荐" name="recommend"></el-tab-pane>
        </el-tabs>
        <h2 style="margin-right: 60px;">机票元数据分析</h2>
        <el-icon size="45">
            <TrendCharts />
        </el-icon>
    </div>

    <component :is="currentComponent"></component>
    <div class="footer"
        style="background-color: white; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
            <el-space direction="vertical">
                <el-text>
                    <el-icon>
                        <ElementPlus />
                    </el-icon>
                    机票元数据分析
                </el-text>
                <el-row>
                    <el-text>Rate</el-text>
                    <el-rate v-model="rateValue" clearable />
                </el-row>
            </el-space>
        </div>
        <div style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);">
            <el-text>
                联系我们: xxx@gmail.com
                <el-icon>
                    <Bell />
                </el-icon>
            </el-text>
        </div>
    </div>

</template>
<script lang="ts" setup name="Home">
import { ref, computed, type DefineComponent, onMounted } from 'vue'
import StatisticView from './statistic/StatisticView.vue';
import FlightRecommendView from './recommend/FlightRecommendView.vue';
import FlightSearchView from './search/FlightSearchView.vue';
import { Bell, ElementPlus } from '@element-plus/icons-vue'

const activeTab = ref('analysis'); // 默认选中的标签页
const rateValue = ref(0)
interface ComponentsMap {
    [key: string]: DefineComponent<any, any, any, any, any, any, any, any, any, any>;
}

// 根据当前选中的标签页名称映射到对应的组件
const componentsMap: ComponentsMap = {
    analysis: StatisticView,
    search: FlightSearchView,
    recommend: FlightRecommendView
};

// 计算属性，根据当前选中的标签页动态返回对应的组件
const currentComponent = computed(() => componentsMap[activeTab.value]);

function handleTabClick(tab: any) {
    activeTab.value = tab.name; // 更新当前选中的标签页
}

onMounted(() => {
    const backgroundBody = document.getElementById("background-body");
    if (backgroundBody !== null) {
        backgroundBody.style.backgroundImage = 'none';
        backgroundBody.style.backgroundColor = 'white';
    } else {
        console.log("Element with ID 'background-body' not found.");
    }
})
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

#top .el-tabs__item {
    color: white !important;
}
</style>