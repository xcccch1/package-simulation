<template>
    <div style="width: 500px; height: 500px;" id="threejs"></div>
</template>

<script>
import ThreeJs from "@/js/three";
let app, scene, camera, renderer;

export default {
  name: "HelloWorld",
  data() {
    return {
      num: 0,
    };
  },
  created() {
    this.init();
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
        const mesh1 = app.create_mesh(1, 1, 1);
        mesh1.position.set(index, 0, 0);
        app.scene.add(mesh1);
      }
    },
  },
  mounted() {
    this.init();
  },
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

.box{
  display: flex;
}
</style>
