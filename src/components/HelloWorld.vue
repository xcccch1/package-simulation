<template>
    <div style="width: 100%;height: 100%;" id="threejs"></div>
</template>

<script>
import ThreeJs from "@/js/three";
let app, scene, camera, renderer;

export default {
  name: "HelloWorld",
  props:['box_data'],
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.init();
    this.create_mesh()
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
    create_mesh() {
      for (let index = 0; index < 10; index++) {
        const mesh = app.create_mesh(this.box_data.x,this.box_data.y,this.box_data.z,this.box_data.shape);
        mesh.position.set(index, 0, 0);
        app.scene.add(mesh);
      }
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
  overflow: hidden; /* 防止出现滚动条 */
}
</style>
