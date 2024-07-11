<template>
  <div id="app">
    <HelloWorld/>
    <!-- <BoxData></BoxData> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BoxData from './components/BoxData.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BoxData
  }
}
</script>

<style>
</style>
