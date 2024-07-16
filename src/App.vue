<template>
  <div id="app">
    <HelloWorld></HelloWorld>
    <!-- <el-container>
      <el-main>
        <HelloWorld :box_data="box_data"/>
      </el-main>
      <el-aside style="width:20%;">
        <el-form :model="box_data">
          <el-form-item label="长">
            <el-input v-model="box_data.x"></el-input>
          </el-form-item>
          <el-form-item label="宽">
            <el-input v-model="box_data.y"></el-input>
          </el-form-item>
          <el-form-item label="高">
            <el-input v-model="box_data.z"></el-input>
          </el-form-item>
          <el-form-item label="材质">
            <el-select v-model="box_data.shape">
              <el-option label="长方体" value="BoxGeometry"></el-option>
              <el-option label="球体" value="SphereGeometry"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-aside>
    </el-container> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    HelloWorld
  },
  methods: {},
  mounted(){}
}
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
