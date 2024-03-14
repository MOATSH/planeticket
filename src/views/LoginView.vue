<template>
    <div class="top-container">
        <h2></h2>
        <h1>机票元数据分析</h1>
        <div class="input-container">
            <el-input v-model="userName" placeholder="请输入用户名" class="login-input" />
            <el-input v-model="password" show-password placeholder="请输入密码" class="login-input" />
        </div>
        <div class="login-container">
            <el-button type="primary" class="login-button" @click="login">登录</el-button>
            <el-button type="success" class="register-button" @click="toRegister">去注册</el-button>
            <el-link type="success" @click="straightUse" class="straight-use-link">暂不登录，直接使用</el-link>
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="注册账号" width="800">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.gender" placeholder="选择性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="form.age" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" show-password autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户类型" :label-width="formLabelWidth">
                <el-select v-model="form.userType" placeholder="请选择你属于哪种用户">
                    <el-option label="商务旅行者" value="商务旅行者" />
                    <el-option label="旅行发烧友" value="旅行发烧友" />
                    <el-option label="家庭度假者" value="家庭度假者" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="registerConfirm">
                    注册
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import axios from 'axios';
import { ElButton, ElInput, ElLink } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

let userName = ref('')
let password = ref('')
const router = useRouter()
let dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    "name": "",
    "age": 0,
    "gender": "",
    "email": "",
    "userType": "",
    "userName": "",
    "password": ""
})

function straightUse() {
    const backgroundBody = document.getElementById("background-body");
    if (backgroundBody !== null) {
        backgroundBody.style.backgroundImage = 'none';
        backgroundBody.style.backgroundColor = 'whitesmoke';
    } else {
        console.log("Element with ID 'background-body' not found.");
    }
    ElMessage({
        message: '欢迎使用~',
        type: 'success'
    })
    router.push({ path: '/home' });
}

function toRegister() {
    dialogFormVisible.value = true
}

async function login() {
    let ret = await (await axios.get(`http://127.0.0.1:80/api/userInfo/login?userName=${userName.value}&password=${password.value}`)).data
    if (ret == true) {
        ElMessage({
            message: '登录成功，欢迎使用~',
            type: 'success'
        })
        const userInfo = { userName: userName.value };
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        // // 从SessionStorage获取用户信息字符串
        // const userInfoString = sessionStorage.getItem('userInfo');
        // // 将字符串转换回对象
        // const userInfo2 = JSON.parse(userInfoString || '{}');
        // console.log(userInfo2.userName)
        setTimeout(() => {
            const backgroundBody = document.getElementById("background-body");
            if (backgroundBody !== null) {
                backgroundBody.style.backgroundImage = 'none';
                backgroundBody.style.backgroundColor = 'whitesmoke';
            } else {
                console.log("Element with ID 'background-body' not found.");
            }
            router.push({ path: '/home' });
        }, 100)
    }
    else {
        ElMessage.error('登录失败，请重试。')
    }
}

async function registerConfirm() {
    let ret = (await axios.post('http://127.0.0.1:80/api/userInfo/register', {
        "name": form.name,
        "age": form.age,
        "gender": form.gender,
        "email": form.email,
        "userType": form.userType,
        "userName": form.userName,
        "password": form.password
    })).data
    if (ret == true) {
        ElMessage({
            message: '注册成功~',
            type: 'success'
        })
        dialogFormVisible.value = false
    }
    else {
        ElMessage.error('注册失败，请重试。')
    }
}

onMounted(() => {
    const backgroundBody = document.getElementById("background-body");
    if (backgroundBody !== null) {
        backgroundBody.style.backgroundImage = 'url(/background.png)';
    } else {
        console.log("Element with ID 'background-body' not found.");
    }
})
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
