<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')

const greetingsImgList:string[] = [
  '../../assets/dashboard/morning.png',
  '../../assets/dashboard/morning.png',
  '../../assets/dashboard/morning.png'
]

const greetingsImg = ref<string>(
  new URL(`../../assets/dashboard/morning.png`, import.meta.url).href
);
const greetingsMessage1 = ref<string>('Good,Morning!')
const greetingsMessage2 = ref<string>('Have a great day!')


/**
 * 获取当前时间 判断早中晚
 * @returns number 0早 1中 2晚 
 */
const getTimeState = ():number=>{
  const nowHours = new Date().getHours();
  let state = 0;
  if(nowHours >= 0 && nowHours <= 10){
    state = 0;
  }else if(nowHours > 10 && nowHours <= 14){
    state = 1;
  }else{
    state = 2;
  }
  return state
}


/**
 * 获取图片url
 * @returns string 图片URL
 */
const getImageUrl = (imageUrl: string):string=>{
  return new URL(imageUrl, import.meta.url).href
}

/**
 * 获取当前时间下对应的图片url
 * @returns string 图片url
 */
const getCurrentImageUrl = ():string => {
  const state = getTimeState()
  return getImageUrl(greetingsImgList[state])
}

</script>

<template>
  <div class="greetings-container">
    <div class="greetings-context-wrap">
      <p class="greetings-context-1">{{ greetingsMessage1 }}</p>
      <p class="greetings-context-2">{{ greetingsMessage2 }}</p>
    </div>
    <img :src="getCurrentImageUrl()" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.greetings-container{
  display: flex;
  align-items: center;
  .greetings-context-wrap{
    .greetings-context{
      &-1{
        font-size: $fontTwoSize;
        font-weight: bold;
      }
      &-2{
        font-size: $fontNormalSize;
      }
    }
  }
  img{
    width: 127px;
    height: 80px;
  }
}
</style>
