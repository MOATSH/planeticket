<template>
    <div class="top-container">
        <h2></h2>
        <h1>机票元数据分析</h1>
        <div class="input-container">
            <el-input v-model="userName" placeholder="请输入用户名" class="login-input" />
            <el-input v-model="password" show-password placeholder="请输入密码" class="login-input" />
        </div>
        <div class="login-container">
            <el-button type="primary" class="register-button" @click="register">注册</el-button>
            <el-button type="success" class="login-button" @click="toLogin">去登陆</el-button>
            <el-link type="success" @click="straightUse" class="straight-use-link">暂不注册，直接使用</el-link>
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

function toLogin() {
    router.push({ path: '/' })
}

function register() {
    
}
</script>

<style scoped>
.top-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

.input-container,
.login-container {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
}

.login-container {
    flex-direction: row;
    gap: 30px;
}

.login-input {
    margin-bottom: 30px;
}

h1 {
    height: 20%;
}

h2 {
    height: 20%;
}
</style>
