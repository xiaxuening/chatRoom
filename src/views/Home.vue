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
            <el-button type="text"><i class=" iconfont icon-yinlemusic215"></i>点歌</el-button>
            <el-button type="text"><i class=" iconfont icon-right-1"></i>已点</el-button>
            <el-button type="text"><i class=" iconfont icon-shoucang1"></i>歌单</el-button>
            <el-button type="text"><i class=" iconfont icon-wenhao"></i>反馈</el-button>
          </el-button-group>
        </div>
      </section>
    </div>
    <div class="col chat-box"></div>
  </el-main>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
export default {
  name: 'Home',
  setup(props) {
    const bgColor = ref('#000')
    const color = ref('#fff')
    const lyricObj = reactive({
      lyricName: '带我去很有的地方(Live)',
      user: '黄晓明',
      play: true
    })
    function aa(strings, ...values) {
      console.log(strings);
      console.log(values);
    }
    let a = 1
    let b = 2
    let c = `小明今年`
    const d = aa`${c}${a + b}岁了，该上学了`
    console.log(d);
    return {
      bgColor,
      color,
      ...toRefs(lyricObj)
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


    .chat-box {
      flex 1
      // width 60%
    }

</style>
