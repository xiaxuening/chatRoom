<template>
  <div class="particles-js-box">
    <div id="particles-js"></div>
  </div>
</template>

<script>
import { watch, computed, onMounted, ref} from 'vue'
import particles from './particles.config'
export default {
  name: 'particles',
  setup() {
    // console.log(particlesJS);
    onMounted(() => {
      particlesJS('particles-js', particles)
      document.body.style.overflow = 'hidden'
    })
    return {

     };
  },
};
</script>

<style scoped lang="stylus" >
.particles-js-box
  position fixed
  top 0
  left 0
  z-index 1
  height 100%

  #particles-js
    background-color #000
</style>
