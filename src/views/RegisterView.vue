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
    <el-dialog v-model="dialogTableVisible" width="800" align-center>
        <div>
            <h1>{{ message }}</h1>
        </div>
    </el-dialog>
</template>

<script setup lang='ts'>
import axios from 'axios';
import { ElButton, ElInput, ElLink } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let userName = ref('');
let password = ref('');
let dialogTableVisible = ref(false)
let message = ref('')
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

async function register() {
    let ret = (await axios.get(`http://127.0.0.1/api/userInfo/register?userName=${userName.value}&password=${password.value}`)).data
    if (ret == true) {
        message.value = '注册成功'
        dialogTableVisible.value = true
        setTimeout(() => {
            router.push({ path: '/' })
        }, 1000)
    }
    else {
        message.value = '注册失败'
        dialogTableVisible.value = true
    }
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
