<template>
  <div style="width: 100%;height: 100%;display: flex;">
    <div style="width: 70%;" id="threejs"></div>
    <el-form :model="box_data" style="width: 30%;">
      <el-form-item label="长">
        <el-input v-model="box_data.jzx.l"></el-input>
      </el-form-item>
      <el-form-item label="宽">
        <el-input v-model="box_data.jzx.w"></el-input>
      </el-form-item>
      <el-form-item label="高">
        <el-input v-model="box_data.jzx.h"></el-input>
      </el-form-item>
      <el-form-item label="长">
        <el-input v-model="box_data.xz.l"></el-input>
      </el-form-item>
      <el-form-item label="宽">
        <el-input v-model="box_data.xz.w"></el-input>
      </el-form-item>
      <el-form-item label="高">
        <el-input v-model="box_data.xz.h"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitdata(box_data)">提交</el-button>
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
        xz: {
          l: 0,
          w: 0,
          h: 0
        },
        jzx: {
          l: 0,
          w: 0,
          h: 0
        }
      },
      mesh_num:0
    };
  },
  created() { },
  mounted() {
    this.init();
    console.log(this.box_data);
    // const geometry = new THREE.BoxGeometry(1.1,0.19,0.8)
    // const materia = new THREE.MeshBasicMaterial({
    //   color:this.randomHexColor()
    // })
    // const mesh = new THREE.Mesh(geometry, materia)
    // app.scene.add(mesh)
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
    // 创建内部商品
    create_goods(l, w, h) {
      const geometry = new THREE.BoxGeometry(l, w, h)
      const textureLoader = new THREE.TextureLoader()
      const plasterTexture = textureLoader.load(xz_img)
      const materia = new THREE.MeshBasicMaterial({
        transparent: false,
        map: plasterTexture
      })
      const mesh = new THREE.Mesh(geometry, materia);
      return mesh
    },
    // 创建外部箱体
    create_jzx(l, w, h) {
      const geometry = new THREE.BoxGeometry(l, w, h)
      const textureLoader = new THREE.TextureLoader()
      const plasterTexture = textureLoader.load(jzx_img)
      const jMmaterial = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 0.2,//透明度
        map: plasterTexture
      })
      jzx = new THREE.Mesh(geometry, jMmaterial);
      jzx.position.set(l / 2, w / 2, h / 2)
      app.scene.add(jzx)
    },
    submitdata(box_data) {
      this.rm_mesh()
      // 创建外部箱体
      this.create_jzx(jzx.l, jzx.h, jzx.w)
      // 创建内部箱体
      const { jzx, xz } = box_data
      if (xz.l > jzx.l || xz.w > jzx.w || xz.h > jzx.h) {
        this.$message.error("尺寸错误，无法装入！")
        this.box_data = { jzx: { l: 0, w: 0, h: 0 }, xz: { l: 0, w: 0, h: 0 } }
        return
      } else {
        let group = new THREE.Group();
        // 内部箱子初始初始位置
        let position = { x: xz.l / 2, y: xz.h / 2, z: xz.w / 2 }
        // x向数量，x = l
        const xz_x = parseInt(jzx.l / xz.l)
        // z向数量，z = w
        const xz_z = parseInt(jzx.w / xz.w)
        // y向数量，y = h
        const xz_y = parseInt(jzx.h / xz.h)

        for (let index_y = 0; index_y < xz_y; index_y++) {
          for (let index_z = 0; index_z < xz_z; index_z++) {
            for (let index_x = 0; index_x < xz_x; index_x++) {
              const mesh = this.create_goods(xz.l, xz.h, xz.w)
              mesh.position.set(position.x, position.y, position.z)
              group.add(mesh)
              position.x += xz.l * 1
              if (index_x == xz_x - 1) {
                position.z += xz.w * 1
                position.x = xz.l / 2
              }
              this.mesh_num++
            }
            if (index_z == xz_z - 1) {
              position.y += xz.h *1
              position.z = xz.w / 2
              position.x = xz.l / 2
            }
          }
        }
        app.scene.add(group)
      }
    },
    // 更新前清除mesh
    rm_mesh() {
      // scene.children.forEach(mesh => {
      //   scene.remove(mesh)
      // });
      for (let index = 2; index < scene.children.length; index++) {
        const mesh = scene.children[index];
        scene.remove(mesh)
      }
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
