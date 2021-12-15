<template>
  <el-main
    :style="{'background': bgColor, color}"
  >
    <div class="col music-box">
      <section class="music-music"></section>
      <section class="music-opt">
        <div class="progress">
          <div class="progress-item"></div>
        </div>
        <div class="lyric">
          <h4>{{lyricName}}</h4>
          <p>{{user}}</p>
        </div>
        <div class="control">
          <el-button-group>
            <el-button type="text" @click="play = !play"><i :class="['iconfont', play ? 'icon-bofang': 'icon-zanting']"></i></el-button>
            <el-button type="text"><i class=" iconfont icon-qiege"></i></el-button>
            <el-button type="text"><i class=" iconfont icon-shoucang"></i></el-button>
            <el-button type="text"><i class=" iconfont icon-suiji"></i></el-button>
          </el-button-group>
        </div>
        <div class="tool">
          <el-button-group>
            <el-button type="text" @click="choosHandel"><i class=" iconfont icon-yinlemusic215"></i>点歌</el-button>
            <el-button type="text"><i class=" iconfont icon-right-1"></i>已点</el-button>
            <el-button type="text"><i class=" iconfont icon-shoucang1"></i>歌单</el-button>
            <el-button type="text"><i class=" iconfont icon-wenhao"></i>反馈</el-button>
          </el-button-group>
        </div>
      </section>
    </div>
    <div class="col chat-box">
      <section class="chat-content">
        <header class="chat-header-opt">
          <section class="col-box col-box-1">
            <span class="id-box">房间名字</span>
            <span class="name-box">【{{roomInfo.name}}】</span>
            <span class="icon-box">
              <i class="iconfont icon-erji"></i>
              <el-button type="text" class="color-btn"><i class="iconfont icon-fenxiang"></i></el-button>
            </span>
          </section>
          <section class="col-box col-box-2">
            <span class="icon-box">
              <el-button type="text" class="color-btn"><i class="iconfont icon-logo"></i>开源</el-button>
              <el-button type="text" class="color-btn"><i class="iconfont icon-icon-test"></i>管理</el-button>
              <el-button type="text" class="color-btn"><i class="iconfont icon-renyuan-"></i>在线({{Math.round(output)}})</el-button>
              <el-button type="text" class="color-btn"><i class="iconfont icon-wode"></i>我的</el-button>
            </span>
          </section>
        </header>
        <main class="chat-content-box">
          <div>

          </div>
          <div class="chat-item-box">
            <ul>
              <li
                v-for="({creator, content, createDate, ...item}, index) in data" :key="index"
                :class="['li-item', creator === userInfo.id ? 'right' : 'left']"
              >
                <section class="user-info">
                  <p class="user-name">
                    <span class="icon-box">
                      <i class=" iconfont icon-svip1 color2"></i>
                    </span>
                    <span>{{setUserName(creator)}}</span>
                  </p>
                  <p class="level">
                    <i class=" iconfont icon-taiyang color3"></i>
                    <i class=" iconfont icon-taiyang color3"></i>
                    <i class=" iconfont icon-taiyang color3"></i>
                  </p>
                  <p class="message">{{content}}</p>
                  <p class="time">{{$dayjs(createDate).format('YYYY-MM-DD HH-mm-ss')}}</p>
                </section>
                <section class="avatar">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <el-avatar shape="square" :size="50">
                        <div
                        :style="{
                          width: '100%',
                          height: '100%',
                          'background-size': '200px',
                          'background-image': setUrl(creator),
                          'background-position': setPosition(creator)
                        }">
                        </div>
                      </el-avatar>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <!-- <el-dropdown-item ><i class="iconfont icon-aite"></i>{{sex === 1 ? '他' : '她'}}</el-dropdown-item> -->
                        <el-dropdown-item ><i class="iconfont icon-home"></i> 查看主页</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </section>
              </li>
              <!-- <li class="li-item left" >
                <section class="avatar">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <el-avatar shape="square" :size="50" :src="avatar">{{username}}</el-avatar>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item ><i class="iconfont icon-aite"></i>{{sex === 1 ? '他' : '她'}}</el-dropdown-item>
                        <el-dropdown-item ><i class="iconfont icon-home"></i> 查看主页</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </section>
                <section class="user-info">
                  <p class="user-name">
                    <span class="icon-box">
                      <i class=" iconfont icon-svip color1"></i>
                    </span>
                    <span>你的懵懵懂</span>
                  </p>
                  <p class="level">
                    <i class=" iconfont icon-xingxing color3"></i>
                  </p>
                  <p class="message">您哈鸭</p>
                  <p class="time">2021-12-12</p>
                </section>
              </li> -->
              <!-- <li class="li-item right">
                <section class="user-info">
                  <p class="user-name">
                    <span class="icon-box">
                      <i class=" iconfont icon-svip1 color2"></i>
                    </span>
                    <span>{{userInfo.nickName}}</span>
                  </p>
                  <p class="level">
                    <i class=" iconfont icon-taiyang color3"></i>
                    <i class=" iconfont icon-taiyang color3"></i>
                    <i class=" iconfont icon-taiyang color3"></i>
                  </p>
                  <p class="message">miim</p>
                  <p class="time"></p>
                </section>
                <section class="avatar">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <el-avatar shape="square" :size="50" :src="avatar" ></el-avatar>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item ><i class="iconfont icon-aite"></i>{{sex === 1 ? '他' : '她'}}</el-dropdown-item>
                        <el-dropdown-item ><i class="iconfont icon-home"></i> 查看主页</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </section>
              </li>
              <li class="li-item center">{{data.length}}</li> -->
            </ul>
          </div>
        </main>
      </section>
      <section class="chat-input">
        <div class="chat-input-tool">
          <el-button type="text"><i class="iconfont icon-Happy-Wink"></i>表情</el-button>
          <el-button type="text"><i class="iconfont icon-5jietu-1"></i>截图</el-button>
        </div>
        <div class="chat-input-value">
          <el-input
            v-model="textarea"
            type="textarea"
            placeholder="Please input"
            @keyup.enter.native="inputHandle($event)"
          />
        </div>
      </section>
    </div>
  </el-main>
  <el-drawer
    v-model="drawer"
    title="I like listening to music."
    :direction="direction"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTransition, TransitionPresets } from '@vueuse/core'
import * as Interface from '../data/home'
export default {
  name: 'Home',
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const bgColor = ref('#000')
    const color = ref('#fff')
    const drawer = ref(false)
    const direction = 'ltr'
    const textarea = ref('')
    const info = ref('')
    const squareUrl = '../assets/logo.png'
    const lyricObj = reactive({
      lyricName: '带我去很有的地方(Live)',
      user: '黄晓明',
      play: true
    })
    const count = ref(0)
    const userInfo = ref({})
    const roomInfo= ref({})
    const roomUserList= ref([])
    const roomMsgList = reactive({
      data: []
    })
    const wsMessage = ref({})
    const handleOpen = () => {
      console.log('WebSocket open');
    }
    const handleClose = () => {
      console.log('WebSocket close');
    }
    const handleError = () => {
      console.log('WebSocket error');
    }
    const handleMessage = (res) => {
      console.log('WebSocket message', JSON.parse(res.data))
      wsMessage.value = JSON.parse(res.data)
      if (wsMessage.value.type === 'msg') {
        roomMsgList.data.push(JSON.parse(res.data))
      }
      if (wsMessage.value.type === 'online') {
        count.value = JSON.parse(res.data).data.count
      }
    }
    const token = localStorage.getItem('user_token')
    const choosHandel = _ => {
      drawer.value = true
    }
    const inputHandle = (e) => {
      if (e.key == "Enter" || e.code == "Enter" || e.keyCode == 13) {
        e.returnValue = false;
        info.value = textarea.value.replace(/\n/g, '')
        textarea.value = ''
        Interface.sendRoomMsgInterfacer(
          {
            content: info.value.replace(/\n/g, ''),
            roomId: roomInfo.value.id,
            creator: userInfo.value.id
          }
        ).then(res => {
          console.log(res);
        })
        return false;
      }
    }
    const extractColorByName = (name) => {
      var temp = [];
      temp.push("#");
      for (let index = 0; index < name.length; index++) {
        temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
      }
      return temp.slice(0, 5).join('').slice(0, 4);
    }
    const getRoomMsgListAndgetRoomUserList = async roomId => {
      roomMsgList.data = await Interface.getRoomMsgListInterfacer({roomId})
      roomUserList.value = await Interface.getRoomUserListInterfacer(roomId)
    }
    const init = async _ => {
      const user = localStorage.getItem('user_token')
      if (!user) {
        router.push({
          name: 'Login'
        })
        return
      }
      Promise.all([
        Interface.initRoomInterfacer(),
        Interface.userInfoInterfacer()
      ]).then(([roomData, userData]) => {
        const ws = new WebSocket(`ws:${process.env.VUE_APP_ROBOT_HOST}/mws?userId=${userData.id}&roomId=${roomData.id}&token=`)
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
        userInfo.value = userData
        roomInfo.value = roomData
        getRoomMsgListAndgetRoomUserList(roomData.id)
      })
    }
    const setUserName = userId => {
      const curUser = roomUserList?.value?.find(item => item.id === userId) ?? {}
      return curUser?.nickName
    }
    const setPosition = userId => {
      const curUser = roomUserList?.value?.find(item => item.id === userId) ?? {}
      let positionX = 0
      let positionY = 0
      if (curUser.headUrl) return `${positionX} ${positionY}`
      const remainder = Number(curUser.id?.slice(0, curUser.id.length - 2)) % 16
      if ([0, 1, 2, 3].includes(remainder)) {
        return `${remainder % 4 * 50}px 0`
      }
      if ([4, 5, 6, 7].includes(remainder)) {
        return `${remainder % 4 * 50}px 50px`
      }
      if ([8, 9, 10, 11].includes(remainder)) {
        return `${remainder % 4 * 50}px 100px`
      }
      if ([12, 13, 14, 15].includes(remainder)) {
        return `${remainder % 4 * 50}px 150px`
      }
    }
    const setUrl = userId => {
      const curUser = roomUserList?.value?.find(item => item.id === userId) ?? {}
      if (curUser.headUrl)  return `url(${curUser.headUrl})`
      return `url(${require('../assets/img/article.png')})`
    }
    const output = useTransition(count, {
      duration: 3000,
      transition: TransitionPresets.easeOutExpo,
    })

    // const userName = computed(_ => {})
    onMounted(init)
    return {
      bgColor,
      color,
      drawer,
      direction,
      choosHandel,
      textarea,
      inputHandle,
      info,
      squareUrl,
      userInfo,
      roomInfo,
      wsMessage,
      extractColorByName,
      setUserName,
      setPosition,
      setUrl,
      count,
      output,
      ...toRefs(lyricObj),
      ...toRefs(roomMsgList),
    }
  }
}
</script>
<style scoped lang="stylus">
  .el-main
    width 100%
    height 100%
    display flex

    .col
      height 100%
      border: 1px solid #aaa
      border-radius 10px

    .music-box
      width 480px
      margin-right 20px
      display flex
      flex-direction column

      .music-music
        flex 1

      .music-opt
        width 100%
        height 200px
        border-top: 1px solid #555

        .progress
          position relative
          height 2px
          width 100%

          .progress-item
            width 200px
            position absolute
            top 0
            left 0
            bottom 0
            right 0
            border-radius 10px
            background linear-gradient(270deg,#4493d7,#fff)

        .lyric
          padding 20px

          p
            color: #aaa
            padding-top 8px

        .control
          .el-button-group
            width 100%
            display flex

          .el-button
            flex 1

          .iconfont
            font-size 30px

          .icon-zanting, .icon-bofang
            font-size 34px
          .icon-suiji
            font-size 26px

      .tool
        width 100%

        .el-button-group
          width 100%
          display flex
          padding-left 10px

          .el-button
            padding 0 5px


    .chat-box
      flex 1
      display flex
      flex-direction column

      .chat-input
        height 150px
        border-top 1px solid #333
        display flex
        flex-direction column

        .chat-input-tool
          height 30px
          padding-left 10px

          .el-button
            color #fff

            &:hover
              color #409eff

        .chat-input-value
          flex 1
          // padding 0px 10px

          .el-textarea
            height 100%


      .chat-content
        flex 1
        padding 10px
        position relative
        display flex
        flex-direction column
        overflow hidden

        .chat-header-opt
          display flex
          flex-direction row
          justify-content space-between
          width 100%
          left 0
          position absolute
          padding 0 10px 10px 10px
          border-bottom 1px solid #202020

          .col-box
            height 32px
            display inline-flex
            flex-direction row
            align-items center

          .id-box
            border 1px solid orangered
            padding 0 4px
            border-radius 4px
            color orangered
            margin-right 2px

          .icon-box
            color orangered
            .color-btn
              color orangered

        .chat-content-box
          flex 1
          padding 43px 10px 10px 10px
          overflow hidden

          .chat-item-box
            height 100%
            overflow auto

            ul
              height 100%
              padding 20px 0
              .li-item
                width 100%
                display flex
                font-family 'Gotham-Book'


                .user-info
                  .user-name
                    font-size 12px
                    // margin-bottom 10px
                    margin-top -10px

                  .message
                    border-radius 4px
                    padding 8px
                    position relative
                    height 36px

                  .time
                    font-size 12px
                    padding 10px 0

                  .level
                    // padding 10px 0

              .left
                .avatar
                  margin-right 20px

                .message
                  background cadetblue
                  &::before
                    content ''
                    position absolute
                    top -6px
                    left -13px
                    width 15px
                    height 15px
                    border-width 0
                    border-style solid
                    border-color transparent
                    border-bottom-width 12px
                    border-bottom-color cadetblue
                    border-radius 0 0 0 15px
                    color #E5E5E5

              .right
                justify-content flex-end
                .user-info
                  margin-right 20px

                  .user-name, .leve, .time, .level
                    text-align right

                  .message
                    background #409eff
                    &::before
                      content ''
                      position absolute
                      right -15px
                      top -6px
                      left calc(100% - 2px)
                      width 15px
                      height 15px
                      border-width 0
                      border-style solid
                      border-color transparent
                      border-bottom-width 12px
                      border-bottom-color #409eff
                      border-radius 0 0 15px 0

              .center
                justify-content center




</style>
<style lang="stylus">
.chat-input
  .chat-input-value
    .el-textarea__inner
      height 100%
      border none
      border-radius inherit
      background transparent
      color #fff
      resize none
      outline none

</style>
