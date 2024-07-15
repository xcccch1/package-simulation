import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer"

export default class ThreeJs {
    constructor(id) {
        this.id = id
        this.dom = document.getElementById(id)
    }

    initThree() {
        //这个初始化的是场景
        this.scene = new THREE.Scene();
        this.width = this.dom.offsetWidth;
        this.height = this.dom.offsetHeight;
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);

        this.camera.position.set(10, 10, 10);
        this.camera.lookAt(0, 0, 0);

        // ------------------------------------------------------------------------
        // this.geometry = new THREE.BoxGeometry(1, 1, 1);
        // this.material = new THREE.MeshBasicMaterial({
        //     color: 0xff0000,//0xff0000设置材质颜色为红色
        // });
        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.mesh.position.set(0.5, 0.5, 0.5)
        // ------------------------------------------------------------------------

        //追加webGL的渲染器，他是用来调用浏览器的GPU，去进行实时渲染（前提浏览器已经支持GPU）
        //antialias:是否开启锯齿，alpha：是否开启透明，logarithmicDepthBuffer：是否开启对数深度缓存
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true })
            // 设置渲染器的像素比
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //渲染器的输出颜色
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        //设置渲染器的大小
        this.renderer.setSize(this.width, this.height);
        //将渲染器的dom元素，添加至我们div的dom元素中
        this.dom.append(this.renderer.domElement);

        // 监听浏览器大小，去更新相机的矩阵
        window.addEventListener('resize', () => {
            // 更新相机的宽高比
            this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
            this.camera.updateProjectionMatrix();
            //更新渲染器的大小
            this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
            if (this.cssRenderer) {
                this.cssRenderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
            }
        })
    }

    initHelper(helperSize = 1000) {
        this.scene.add(new THREE.AxesHelper(helperSize));
    }

    render(callback) {
        callback();
        requestAnimationFrame(() => this.render(callback));
    }

    initController(enableZoom = true, autoRotate = false, enableDamping = false, dampingFactor = 0, minDistance = 1, maxDistance = 1000, minAzimuthAngle = 0) {
        let width = this.dom.offsetWidth;
        let height = this.dom.offsetHeight;
        //这个Renderer是用来运行3维指标，相当于一个html页面去嵌入至模型中。
        this.labelRenderer = new CSS3DRenderer();
        this.labelRenderer.setSize(width, height);
        //用来调整html页面的样式，让他围绕模型点位时，不会有偏移。
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = 0;
        this.labelRenderer.domElement.style.pointerEvents = "none";
        this.dom.appendChild(this.labelRenderer.domElement);


        this.controller = new OrbitControls(this.camera, this.renderer.domElement);
        //设置控制器是否可以缩放
        this.controller.enableZoom = enableZoom;
        //设置是否可以旋转
        this.controller.autoRotate = autoRotate;
        //设置控制器阻尼效果，让控制器有真实的效果，
        this.controller.enableDamping = enableDamping;
        //设置阻尼控制器的系数
        this.controller.dampingFactor = dampingFactor;
        //设置控制器放大的最小距离
        this.controller.minDistance = minDistance;
        //设置控制器缩小的最大距离
        this.controller.maxDistance = maxDistance;
        //设置控制器最小旋转角度
        this.controller.minAzimuthAngle = minAzimuthAngle;
    }


    create_mesh(x, y, z,shape) {
        const geometry = this.select_shape(x,y,z,shape)
        const materia = new THREE.MeshBasicMaterial({
            color: this.randomHexColor(), //0xff0000设置材质颜色为红色
        });
        const mesh = new THREE.Mesh(geometry, materia);
        return mesh
    }

    select_shape(x,y,z,shape){
        if(shape == 'BoxGeometry'){
            return new THREE.BoxGeometry(x, y, z);
        }else if(shape == 'SphereGeometry'){
            return new THREE.SphereGeometry(x, y, z);
        }
    }


    randomHexColor() { //随机生成十六进制颜色
        var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
        while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
            hex = '0' + hex;
        }
        return '#' + hex; //返回‘#'开头16进制颜色
    }
}