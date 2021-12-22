<template>
  <el-main
    class=""
    :style="{'background': bgColor, color}"
  >
    <div class="col music-box">
      <section class="music-music">
        <div class="lyric-box-bg" :style="{'background-image': `url(${img})`}"></div>
        <div class="lyric-box">
          <ul class="lyric-ul" :style="{transform: `translateY(${translateY}px)`}">
            <li
              class="lyric-item"
              :class="currentRow === index ? 'focus-in-contract-bck' : ''"
              v-for="({content, time}, index) in lyrics"
              :key="index"
              :style="{
                'font-size': currentRow === index ? '16px' : '14px',
                'color': currentRow === index ? '#409eff' : '#fff'
              }"
            >
              {{content}}
            </li>
          </ul>
        </div>
      </section>
      <section class="music-opt">
        <audio
          ref="audio"
          class="dn"
          :src="audioUrl"
          @oaly="onplay"
          @timeupdate="audioTimeUpdate"
          ></audio>
        <div class="progress">
          <div class="progress-item" :style="{'width': `${audioPercent}%`}"></div>
        </div>
        <div class="lyric">
          <section class="col-lyric">
            <div class="lyric-img rotate-center">
              <img :src="authorAvatar" alt="">
            </div>
            <div class="lyric-info">
              <h4>{{songName}}</h4>
              <p>{{authorName}}</p>
            </div>
          </section>
          <section class="col-lyric lyric-opt">
            <el-button-group>
              <el-button type="text" @click="onPause"><i :class="['iconfont', play ? 'icon-bofang': 'icon-zanting']"></i></el-button>
              <el-button type="text" @click="passSongHandle"><i class=" iconfont icon-qiege"></i></el-button>
              <el-button type="text"><i class=" iconfont icon-shoucang"></i></el-button>
            </el-button-group>
          </section>
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
              <el-button type="text" class="color-btn"><i class="iconfont icon-renyuan-"></i>在线({{count}})</el-button>
              <el-button type="text" class="color-btn"><i class="iconfont icon-wode"></i>我的</el-button>
            </span>
          </section>
        </header>
        <main class="chat-content-box" id="divmsg">
          <div class="chat-item-box">
            <ul>
               <section class="text-blur-out">.text-blur-out</section>
              <li
                v-for="({creator, content, createDate, ...item}, index) in data" :key="index"
              >
                <div v-if="creator === userInfo.id" class="right li-item">
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
                </div>
                <div v-else class="left li-item">
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
                </div>
              </li>
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
    <el-input v-model="song" placeholder="Please input music.">
      <template #append>
        <el-button :icon="Search" @click="searchHandle"></el-button>
      </template>
    </el-input>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
        v-infinite-scroll="searchHandle"
        class="list"
        infinite-scroll-disabled="disabled"
      >
        <li v-for="({singerName, songName, ...item}, index) in list" :key="index" class="list-item">
           <el-button type="text" @click="addSongHandle(item)">
             {{songName}} -- {{singerName}}
           </el-button>
        </li>
      </ul>
      <p v-if="loading">Loading...</p>
      <!-- <p v-if="noMore">No more</p> -->
  </div>
  </el-drawer>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTransition, TransitionPresets, useEventListener } from '@vueuse/core'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
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
    const active = ref('')
    const currentRow = ref(0)
    const translateY = ref(0)
    const audioPercent = ref(0)
    const songData = reactive({
      audioUrl: '',
      audio: null,
      lyrics: [],
      songName: '',
      authorName: '',
      authorAvatar: '',
      img: ''
    })
    // const songInfo = reactive({})
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
    const dialogVisible = ref(true)
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
      } else if (wsMessage.value.type === 'online') {
        count.value = JSON.parse(res.data).data.count
      } else if (wsMessage.value.type === 'playSong') {
        console.log(wsMessage.value.data)
        const { data } = JSON.parse(res.data) ?? {}
        console.log(data);
        songData.audioUrl = data.playUrl
        songData.lyrics = data.lyrics ? JSON.parse(data.lyrics) : []
        songData.songName = data.songName
        songData.authorName = data.authorName
        songData.authorAvatar = data.authorAvatar
        songData.img = data.img
        console.log(songData);
        onplay()
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
          boxScroll()
        })
        return false;
      }
    }
    const getRoomMsgListAndgetRoomUserList = async roomId => {
      roomMsgList.data = await Interface.getRoomMsgListInterfacer({roomId})
      roomUserList.value = await Interface.getRoomUserListInterfacer(roomId)
      boxScroll()
      confirm()
    }
    const confirm = _ => {
      ElMessageBox.alert(
        '欢迎来音乐聊天室聊天，即将为你播放音乐!?',
        '温馨提示',
        {
          confirmButtonText: 'OK',
          type: 'warning',
        }
      )
        .then(() => {
          onplay()
        })
    }
    const onplay = _ => {
      lyricObj.play = false
      setTimeout(_ => {
        songData.audio && songData.audio.play()
      }, 1000)
    }
    const onPause = _ => {
      lyricObj.play = !lyricObj.play
      if (lyricObj.play) {
        songData.audio.pause()
      } else {
        songData.audio.play()
      }
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
        Interface.userInfoInterfacer(),
        Interface.initRoomInterfacer()
      ]).then(([userData, roomData]) => {
        if (userData === 401) {
          router.push({
            name: 'Login',
            query: {
              type: '0'
            }
          })
          return
        }
        const ws = new WebSocket(`ws:${process.env.VUE_APP_ROBOT_HOST}/music/mws?userId=${userData.id}&roomId=${roomData.id}&token=`)
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
    const boxScroll = (o) => {
      const div = document.getElementById("divmsg");
      div.scrollTop = div.scrollHeight
    }
    const song = ref('')
    const loading = ref(false)
    const disabled = computed(() => loading.value)
    const searchSong = reactive({
      list: [],
      total: 0
    })
    const searchHandle = async _ => {
      loading.value = true
      const data = await Interface.searchSongInterfacer(
        {
          keyword: song.value
        }
      )
      console.log(data);
      searchSong.list = data.list
      loading.value = false
    }
    const addSongHandle = async ({fileHash, sqfileHash, thirdId}) => {
      const data = await Interface.addSongInterfacer(
        {
          thirdId,
          fileHash,
          roomId: roomInfo.value.id
        }
      )
    }
    const passSongHandle = async ({fileHash, sqfileHash, thirdId}) => {
      const data = await Interface.passSongInterfacer(roomInfo.value.id)
    }
    const audioTimeUpdate = e => {
      audioPercent.value = parseInt(songData.audio.currentTime / songData.audio.duration * 10000) / 100
      songData.lyrics.forEach((item, index) => {
        if (item.time <= songData.audio.currentTime) {
          currentRow.value = index
          if (index > 9) {
             translateY.value = -(index - 9) * 40
          }
        }
      })
    }
    onMounted(init)
    return {
      bgColor,
      loading,
      disabled,
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
      setUserName,
      setPosition,
      setUrl,
      count,
      dialogVisible,
      searchHandle,
      song,
      Search,
      addSongHandle,
      passSongHandle,
      onPause,
      audioTimeUpdate,
      audioPercent,
      active,
      currentRow,
      translateY,
      ...toRefs(lyricObj),
      ...toRefs(roomMsgList),
      ...toRefs(songData),
      ...toRefs(searchSong),
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
        position relative

        .lyric-box-bg
          width 100%
          height 100%
          background-size contain
          opacity 0.15
          position absolute
          top 0
          left 0
          z-index 1

        .lyric-box
          position absolute
          top 0
          left 0
          overflow hidden
          height 100%
          width 100%
          z-index 2

          .lyric-ul
            width 100%

            .lyric-item
              padding 10px 0
              text-align center

      .music-opt
        width 100%
        height 150px
        border-top: 1px solid #555

        .progress
          position relative
          height 2px
          width 100%
          margin-bottom 10px

          .progress-item
            position absolute
            top 0
            left 0
            bottom 0
            right 0
            border-radius 10px
            background linear-gradient(270deg,#4493d7,#fff)

        .lyric
          display flex

          .col-lyric
            flex 1
            display inline-flex
            justify-content space-around

            .lyric-img
              width 100px
              height 100px

              img
                width 100%
                object-fit cover
                border-radius 50%

            .lyric-info
              display inline-flex
              flex-direction column
              justify-content space-around

              h4
                font-size 20px

              p
                color: #aaa

          .lyric-opt
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
        position relative
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
          overflow hidden
          position absolute
          top 43px
          left 0
          height 100%
          width 100%
          padding-bottom 43px
          overflow-y scroll

          .chat-item-box
            // height 100%
            padding 0 18px


            ul
              height 100%
              padding 20px 0
              .li-item
                width 100%
                display flex
                font-family 'Gotham-Book'
                padding 10px 0


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
