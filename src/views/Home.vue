<script setup>
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
const count = ref(0)

</script>
<template>
<div>
<Navigation></Navigation>

</div>
</template>
<style >
iframe {
  width: 0;
  height: 0px;
  max-width: 100%; /* 防止超过父容器宽度 */
  border: none; /* 去除iframe边框 */
  display: none;
}
</style>