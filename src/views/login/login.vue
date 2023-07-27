<script lang="ts" setup>
import Captcha from '@/components/Captcha/Captcha.vue'
const router = useRouter()
import { crypto } from '@/utils/crypto'
import { Lock, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const systemNameCn = import.meta.env.VITE_APP_NAME_CN
const systemNameEn = import.meta.env.VITE_APP_NAME_EN

const loginFormRef = ref<FormInstance>()

const CaptchaRef = ref<InstanceType<typeof Captcha>>()

const loginData = reactive({
  username: '',
  password: '',
  code: ''
})

const loading = ref(false)

const handleLogin = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        const params = {
          username: loginData.username,
          password: crypto.encryptByDES(loginData.password),
          appKey: 'gm-uums'
        }
        await userStore.loginAction(params)
        router.push('/')
      } catch (error) {
        console.log(error)
        CaptchaRef.value?.refreshCode()
      } finally {
        loading.value = false
      }
    }
  })
}

const validateVerifyCode = (rule: any, value: any, callback: any) => {
  if (!value) return callback(new Error('请输入验证码'))

  if (CaptchaRef.value?.verify(value)) {
    callback()
  } else {
    return callback(new Error('请输入正确的验证码'))
  }
}

const rules = reactive<FormRules<typeof loginData>>({
  username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
  code: [{ validator: validateVerifyCode, trigger: 'blur' }]
})
</script>

<template>
  <div class="login">
    <div class="header">
      <h2>{{ systemNameCn }}</h2>
      <!-- <p>{{ systemNameEn }}</p> -->
    </div>
    <div class="main">
      <el-card class="main-box-card">
        <template #header>
          <div class="card-header">登录/LOGIN</div>
        </template>
        <el-form
          status-icon
          class="login-form"
          ref="loginFormRef"
          :model="loginData"
          :rules="rules"
          size="large"
        >
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入用户名"
              v-model="loginData.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginData.password"
              placeholder="请输入密码"
              type="password"
              @keyup.enter="handleLogin"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              :prefix-icon="Lock"
              v-model="loginData.code"
              placeholder="请输入验证码"
              type="password"
              @keyup.enter="handleLogin"
            >
              <template #append>
                <Captcha ref="CaptchaRef" />
              </template>
            </el-input>
          </el-form-item>
          <div class="submit-box">
            <el-button :loading="loading" @click="handleLogin"> 登 录 </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;

  .header {
    height: 80px;
    padding: 25px 45px;

    h2 {
      margin: 0;
      font-size: 24px;
    }

    p {
      margin: 0;
      font-size: 16px;
    }
  }

  .main {
    position: relative;
    background: url('@/assets/images/login-bg.png') no-repeat;
    height: calc(100% - 80px);
    background-size: cover;

    .main-box-card {
      position: absolute;
      right: 13%;
      top: 20%;
      width: 465px;
      .card-header {
        font-size: 20px;
        color: #17aeed;
        text-align: center;
      }

      :deep(.el-input-group__append) {
        width: 112px;
        height: 40px;
        padding: 0;
        cursor: pointer;
      }

      .submit-box {
        text-align: center;
        button {
          width: 197px;
          height: 49px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 700;
          color: #fff;
          background: #2e629c;
          border-radius: 25px;
        }
      }
    }
  }
}
</style>
