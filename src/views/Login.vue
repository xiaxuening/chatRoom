<template>
  <div class="login-box">
    <section class="word">
      <!-- <p>愿世间的美好</p> -->
      <!-- <p>与你环环相扣</p> -->
      <p>古来表白多白表</p>
      <p>向来情书难书情</p>
      <p>笑谈少年真年少</p>
      <p>常与生人话人生</p>
      <p class="author">
        <span>-- 李九春</span>
      </p>
    </section>
    <section class="login-form">
      <h3>欢迎{{textValue}}</h3>
      <p class="tip">
        <span>{{textType ? '已有账号？' : '未有账号？'}}</span>
        <el-button type="text" @click="toLoginHandle">去{{textType ? '登录' : '注册'}}</el-button>
      </p>
      <el-form
        ref="refForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-form"
        label-position="top"
        size="small"
      >
        <el-form-item label="邮箱：" prop="email" v-if="textType">
          <el-input v-model="form.email">
            <template #append>
              <el-button type="primary" @click="sendCaptchaHandle">发送</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="captcha" v-if="textType">
          <el-input v-model="form.captcha"></el-input>
        </el-form-item>
        <el-form-item :label="textType ? '账号：(取一个意难平的账号叭)' : '账号：'" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="captcha" v-if="!textType">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input v-model="form.captcha">
              </el-input>
            </el-col>
            <el-col :span="6">
              <img :src="captcha" alt="" style="height: 32px; cursor: pointer;" @click="resetCaptchaHandle">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" show-password></el-input>
          <p class="tip" v-if="!textType">
            <el-button type="text" @click="resetPassWordHandle">忘记密码</el-button>
          </p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{textValue}}</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <particles />
  </div>
</template>

<script>
import { watch, computed, onMounted, ref, reactive} from 'vue'
import Particles  from '../components/particles/index'
import * as Interface from '../data/login'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
export default {
  username: 'Login',
  setup() {
    const router = useRouter()
    const textType = ref(true)
    const refForm = ref(null)
    const captcha = ref(null)
    let uuid = Math.floor(Math.random() * 1000) + Date.now()
    const form = reactive({
      email: '',
      captcha: '',
      username: '',
      password: ''
    })
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('请输入6位密码'))
      } else {
        callback()
      }
    }
    const toLoginHandle = _ => {
      textType.value = !textType.value
    }
    const rules = {
      email: [
        {
          required: true,
          message: '请填写邮箱',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请正确填写邮箱',
          trigger: ['blur'],
        },
      ],
      captcha: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        }
      ],
      username: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur',
        }
      ],
      password: [
        {
          required: true,
          validator: checkPassword,
          trigger: 'blur',
        }
      ],
    }
    const submitForm = _ => {
      refForm.value.validate((valid) => {
        if (valid) {
          const url = textType.value ? '/auth/register' : '/auth/oauth/token'
          Interface.loginInterfacer(url, {
            ...form,
            uuid,
            grant_type: 'password'
          }).then((result) => {
            if (!textType.value) {
              localStorage.setItem('user_token', result.access_token)
              router.push({
                name: 'Home'
              })
            }
          })
        } else {
          return false
        }
      })
    }
    const resetForm = _ => {
      refForm.value.resetFields()
    }
    const textValue = computed(_ => textType.value ? '注册' : '登录')
    const resetPassWordHandle = _ => {

    }
    const sendCaptchaHandle = _ => {
      refForm.value.validateField(['email'], error => {
        if (!error) {
          Interface.sendCaptchaInterfacer({
            email: form.email,
            uuid
          }).then((message) => {
            ElMessage({
              message,
              type: 'success'
            })
          })
        }
      })

    }
    watch(textType, (count, prevCount) => {
      if (prevCount) {
        captcha.value = `/auth/captcha?uuid=${uuid}`
      }
    })
    const resetCaptchaHandle = _ => {
      console.log(12345);
      uuid = Math.floor(Math.random() * 1000) + Date.now()
      captcha.value = `/auth/captcha?uuid=${uuid}`
    }
    return {
      textType,
      form,
      captcha,
      rules,
      submitForm,
      resetForm,
      refForm,
      textValue,
      toLoginHandle,
      resetPassWordHandle,
      sendCaptchaHandle,
      resetCaptchaHandle
     }
  },
  components: {
    Particles
  }
};
</script>

<style scoped lang="stylus">
.login-box
  width 100%
  height 100%
  background #000
  color #FFF
  position relative

  .word
    position absolute
    z-index 2
    top 200px
    left 100px
    font-size 18px
    font-family serif

    p
      padding 4px 0

    .author
      font-size 12px
      text-align right

  .login-form
    position absolute
    z-index 2
    width 560px
    right 20px
    top 150px
    padding 20px
    background #9e9e9e24
    border-radius 10px

    h3
      font-size 20px

    .tip
      font-size 12px

      .el-button
        font-size 12px

</style>
<style lang="stylus">
.login-box
  .login-form
    .el-form
      .el-form-item__label
        color #fff
</style>
