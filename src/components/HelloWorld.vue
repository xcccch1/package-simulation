<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <div style="width: 70%;" id="threejs"></div>
    <el-form :model="box_data" style="width: 30%;">
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
  </div>
</template>

<script>
import ThreeJs from "@/js/three";
import * as THREE from 'three'
import jzx_img from '@/image/jzx.jpg'
import xz_img from '@/image/xz.jpg'
let app, scene, camera, renderer, jzx;

export default {
  name: "HelloWorld",
  data() {
    return {
      box_data: {
        x: '',
        y: '',
        z: '',
        shape: '',
        jzx:{
          l:0,
          w:0,
          h:0
        } 
      }
    };
  },
  created() { },
  mounted() {
    this.init();
    this.create_jzx()
    this.create_goods()
  },
  methods: {
    async init() {
      app = new ThreeJs("threejs");
      app.initThree();
      app.initHelper();
      app.initController();
      renderer = app.renderer;
      scene = app.scene;
      camera = app.camera;
      app.render(() => {
        renderer.render(scene, camera);
      });
    },
    create_goods() {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
      const textureLoader = new THREE.TextureLoader()
      const plasterTexture = textureLoader.load(xz_img)
      const materia = new THREE.MeshBasicMaterial({
        transparent: false,
        map: plasterTexture
      })
      const mesh = new THREE.Mesh(geometry, materia);
      mesh.position.x = 0.25
      mesh.position.y = 0.25
      mesh.position.z = 0.25
      app.scene.add(mesh)
      return mesh
    },
    create_jzx() {
      const geometry = new THREE.BoxGeometry(5, 2, 2)
      const textureLoader = new THREE.TextureLoader()
      const plasterTexture = textureLoader.load(jzx_img)
      const jMmaterial = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 0.4,//透明度
        map: plasterTexture
      })
      jzx = new THREE.Mesh(geometry, jMmaterial);
      jzx.position.x = 2.5
      jzx.position.y = 1
      jzx.position.z = 1
      app.scene.add(jzx)
    },
    randomHexColor() { //随机生成十六进制颜色
      var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
      while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
      }
      return '#' + hex; //返回‘#'开头16进制颜色
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* 防止出现滚动条 */
}
</style>
