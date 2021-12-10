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
        <el-form-item :label="textType ? '邮箱：' : 'ID或者注册邮箱：'" prop="email">
          <el-input v-model="form.email">
            <template #append v-if="textType">
              <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="authCode" v-if="textType">
          <el-input v-model="form.authCode"></el-input>
        </el-form-item>
        <el-form-item label="名字：(取一个意难平的名字叭)" prop="name" v-if="textType">
          <el-input v-model="form.name"></el-input>
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
export default {
  name: 'Login',
  setup() {
    const textType = ref(true)
    const refForm = ref(null)
    // const textValue = ref('注册')
    const form = reactive({
      email: '',
      authCode: '',
      name: '',
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
      authCode: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        }
      ],
      name: [
        {
          required: true,
          message: '请输入名字',
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
          console.log(VueUse);
          console.log(form);
          console.log(Interface);
          alert('submit!')
        } else {
          return false
        }
      })
    }
    const resetForm = _ => {
      refForm.value.resetFields()
    }
    const toLoginHandle = _ => {
      textType.value = !textType.value
    }
    const textValue = computed(_ => textType.value ? '注册' : '登录')
    const resetPassWordHandle = _ => {

    }
    return {
      textType,
      form,
      rules,
      submitForm,
      resetForm,
      refForm,
      textValue,
      toLoginHandle,
      resetPassWordHandle
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
