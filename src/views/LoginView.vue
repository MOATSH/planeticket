<template>
    <div class="full-screen-container">
        <h1 style="text-align: center;">机票元数据分析</h1>
        <div class="login-container">
            <el-input v-model="userName" style="width: 500px;" placeholder="请输入用户名" class="login-input" />
            <el-input v-model="password" style="width: 500px;" show-password placeholder="请输入密码" class="login-input" />
            <el-button type="success" class="login-button">登录</el-button>
            <el-link type="success" @click="straightUse" class="straight-use-link">暂不登录，直接使用</el-link>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ElButton, ElInput, ElLink } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let userName = ref('');
let password = ref('');
const router = useRouter();

function straightUse() {
    const backgroundBody = document.getElementById("background-body");
    if (backgroundBody !== null) {
        backgroundBody.style.backgroundImage = 'none';
        backgroundBody.style.backgroundColor = 'whitesmoke';
    } else {
        console.log("Element with ID 'background-body' not found.");
    }
    router.push({ path: '/home' });
}
</script>

<style scoped>
.full-screen-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 300px;
}

.login-input {
    margin-bottom: 10px;
}

.login-button {
    margin-bottom: 10px;
}
</style>
