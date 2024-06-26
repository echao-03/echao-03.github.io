import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene();
// Camera settings
const fov = 90;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 2;
camera.position.y = 5;
controls.update();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Creating textured ground
const planeSize = 40;

const flat = new THREE.TextureLoader();
const texture = flat.load('imgs/green_grass.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.colorSpace = THREE.SRGBColorSpace;
const repeats = planeSize / 16;
texture.repeat.set(repeats, repeats);


const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
mesh.translateZ(-1);
scene.add(mesh);



const color = 0xFFFFFF;
const intensity = 0.01;
const light = new THREE.AmbientLight(color, intensity);
light.position.set(17, 14, -10);
scene.add(light);



const loader = new THREE.TextureLoader();

const bg_loader = new THREE.TextureLoader();
const bg_texture = loader.load(
    'imgs/star_bg.jpg',
    () => {
        bg_texture.mapping = THREE.EquirectangularReflectionMapping;
        bg_texture.colorSpace = THREE.SRGBColorSpace;
        scene.background = bg_texture;
    });



const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/rain.wav', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});

const cubeWidth = 1;
const cubeHeight = 1;
const cubeDepth = 1;





const streetMainGeometry = new THREE.BoxGeometry(3, 0.5, 40);
const streetMainMaterial = new THREE.MeshBasicMaterial({ color: 0x222423 });
const streetMain = new THREE.Mesh(streetMainGeometry, streetMainMaterial);
streetMain.position.y = -1;
scene.add(streetMain);

const streetSideGemoetry1 = new THREE.BoxGeometry(1.3, 0.5, 40);
const streetSideMaterial1 = new THREE.MeshPhongMaterial({ map: loadColorTexture('imgs/cement_2.jpg') });
const streetSide1 = new THREE.Mesh(streetSideGemoetry1, streetSideMaterial1);
streetSide1.position.y = -0.8;
streetSide1.position.x = -2;
scene.add(streetSide1);


const streetSideGemoetry2 = new THREE.BoxGeometry(1.3, 0.5, 40);
const streetSideMaterial2 = new THREE.MeshPhongMaterial({ map: loadColorTexture('imgs/cement_2.jpg') });
const streetSide2 = new THREE.Mesh(streetSideGemoetry2, streetSideMaterial2);
streetSide2.position.y = -0.8;
streetSide2.position.x = 2;
scene.add(streetSide2);

const woodStepGeometry1 = new THREE.BoxGeometry(0.4, 0.2, 1);
const woodStepMaterial1 = new THREE.MeshPhongMaterial({ map: loadColorTexture('imgs/wood_1.jpg') });
const woodStep1 = new THREE.Mesh(woodStepGeometry1, woodStepMaterial1);
woodStep1.position.y = -1;
woodStep1.position.x = 5;
woodStep1.position.z = -1.4;
scene.add(woodStep1);

const woodStepGeometry2 = new THREE.BoxGeometry(0.4, 0.2, 1);
const woodStepMaterial2 = new THREE.MeshPhongMaterial({ map: loadColorTexture('imgs/wood_1.jpg') });
const woodStep2 = new THREE.Mesh(woodStepGeometry2, woodStepMaterial2);
woodStep2.position.y = -1;
woodStep2.position.x = 4;
woodStep2.position.z = -1.4;
scene.add(woodStep2);

const woodStepGeometry3 = new THREE.BoxGeometry(0.4, 0.2, 1);
const woodStepMaterial3 = new THREE.MeshPhongMaterial({ map: loadColorTexture('imgs/wood_1.jpg') });
const woodStep3 = new THREE.Mesh(woodStepGeometry3, woodStepMaterial3);
woodStep3.position.y = -1;
woodStep3.position.x = -5;
woodStep3.position.z = -0.6;
scene.add(woodStep3);

const woodStepGeometry4 = new THREE.BoxGeometry(0.4, 0.2, 1);
const woodStepMaterial4 = new THREE.MeshPhongMaterial({ map: loadColorTexture('imgs/wood_1.jpg') });
const woodStep4 = new THREE.Mesh(woodStepGeometry4, woodStepMaterial4);
woodStep4.position.y = -1;
woodStep4.position.x = -4;
woodStep4.position.z = -0.6;
scene.add(woodStep4);

const rainCount = 1000;
const rain_pos = [];

const cloud_pos = [];
const car_pos = [];

const rainMaterial = new THREE.PointsMaterial({
    color: 0x233c59,
    size: 0.1,
    transparent: true,
});

for (let i = 0; i < rainCount; i++) {
    const rainGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.05);
    let rainMain = new THREE.Mesh(rainGeometry, rainMaterial);
    let plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
    let plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
    let randomXValue = (Math.random() * 20) * plusOrMinus1;
    let randomYValue = (Math.random() * 20);
    let randomZValue = (Math.random() * 20) * plusOrMinus2;

    rainMain.position.x = randomXValue;
    rainMain.position.y = randomYValue;
    rainMain.position.z = randomZValue;

    rainMain.rotation.x = 25;

    rain_pos.push(rainMain);
    scene.add(rainMain);


}

function loadColorTexture(path) {
    const texture = loader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

const mtlLoader_1 = new MTLLoader();
mtlLoader_1.load('models/NormalCar2.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/NormalCar2.obj', (root) => {

        root.translateY(-0.7);
        scene.add(root);
        // scene.updateMatrixWorld(true);
        // let position = new THREE.Vector3();
        // position.setFromMatrixPosition(root.matrixWorld);
        // const light1 = new THREE.SpotLight(0xffffff, 1, 7, 0.32);
        // light1.castShadow = true;
        // light1.position.set(root.position.x + 0.5, root.position.y + 0.5, root.position.z + 1.65);
        // scene.add(light1);

        // // Add a helper to visualize the spotlight
        // // const helper1 = new THREE.SpotLightHelper(light1, 1);
        // // scene.add(helper1);

        // // Create and add the target object for the spotlight
        // const targetObject1 = new THREE.Object3D();
        // targetObject1.position.set(3, 2, 0); // Adjust as needed
        // scene.add(targetObject1);
        // light1.target = targetObject1;


        // console.log(light1);
        car_pos.push(root);

    });

});

const mtlLoader_3 = new MTLLoader();
mtlLoader_3.load('models/street_lamp.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/street_lamp.obj', (root) => {
        root.translateZ(-3);
        root.translateY(0.65);
        root.translateX(-1.5);
        scene.add(root);
        scene.updateMatrixWorld(true);
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(root.matrixWorld);

        const light = new THREE.PointLight(0xd6be87, 0.3, 100);
        light.position.set(-1, 2, -3);
        scene.add(light);
    });

});

const mtlLoader_4 = new MTLLoader();
mtlLoader_4.load('models/street_lamp.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/street_lamp.obj', (root) => {
        root.translateZ(8);
        root.translateY(0.65);
        root.translateX(1.5);
        root.rotateY(2.9);
        scene.add(root);
        scene.updateMatrixWorld(true);
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(root.matrixWorld);
        const light = new THREE.PointLight(0xd6be87, 0.3);
        light.position.set(root.position.x - .5, root.position.y + 1.35, root.position.z);
        scene.add(light);
    });

});

const mtlLoader_5 = new MTLLoader();
mtlLoader_5.load('models/house_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/house_1.obj', (root) => {
        root.translateZ(-1);
        root.translateX(8);
        root.translateY(2.4);
        root.rotateY(1.55);
        root.scale.set(6, 6, 6);
        scene.add(root);
    });

});

const mtlLoader_6 = new MTLLoader();
mtlLoader_6.load('models/bush_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/bush_1.obj', (root) => {
        root.translateZ(1);
        root.translateX(4.5);
        root.translateY(-0.8);
        root.rotateY(1.55);
        root.scale.set(12, 12, 12);
        scene.add(root);
    });

});

const mtlLoader_7 = new MTLLoader();
mtlLoader_7.load('models/bush_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/bush_1.obj', (root) => {
        root.translateZ(-4);
        root.translateX(4.5);
        root.translateY(-0.8);
        root.rotateY(1.55);
        root.scale.set(12, 12, 12);
        scene.add(root);
    });

});

const mtlLoader_8 = new MTLLoader();
mtlLoader_8.load('models/tree_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/tree_1.obj', (root) => {
        root.translateZ(-8);
        root.translateX(4.5);
        root.translateY(3);
        root.rotateY(1.55);
        root.scale.set(4, 4, 4);
        scene.add(root);
    });

});

const mtlLoader_9 = new MTLLoader();
mtlLoader_9.load('models/house_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/house_1.obj', (root) => {
        root.translateZ(-1);
        root.translateX(-8);
        root.translateY(2.4);
        root.rotateY(4.7);
        root.scale.set(6, 6, 6);
        scene.add(root);
    });

});

const mtlLoader_10 = new MTLLoader();
mtlLoader_10.load('models/tree_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/tree_1.obj', (root) => {
        root.translateZ(8);
        root.translateX(-4.5);
        root.translateY(3);
        root.rotateY(1.55);
        root.scale.set(4, 4, 4);
        scene.add(root);
    });

});

const mtlLoader_11 = new MTLLoader();
mtlLoader_11.load('models/bush_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/bush_1.obj', (root) => {
        root.translateZ(-3.2);
        root.translateX(-4.5);
        root.translateY(-0.8);
        root.rotateY(1.55);
        root.scale.set(12, 12, 12);
        scene.add(root);
    });

});

const mtlLoader_12 = new MTLLoader();
mtlLoader_12.load('models/bush_1.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/bush_1.obj', (root) => {
        root.translateZ(2);
        root.translateX(-4.5);
        root.translateY(-0.8);
        root.rotateY(6);
        root.scale.set(12, 12, 12);
        scene.add(root);
    });

});

const mtlLoader_13 = new MTLLoader();
mtlLoader_13.load('models/clouds.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/clouds.obj', (root) => {
        root.translateZ(2);
        root.translateX(-2.5);
        root.translateY(9);
        root.rotateY(30);
        root.scale.set(12, 12, 12);
        scene.add(root);
        cloud_pos.push(root)
    });

});

const mtlLoader_14 = new MTLLoader();
mtlLoader_14.load('models/street_lamp.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/street_lamp.obj', (root) => {
        root.translateZ(-11.5);
        root.translateY(0.65);
        root.translateX(1.5);
        root.rotateY(2.9);
        scene.add(root);
        scene.updateMatrixWorld(true);
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(root.matrixWorld);
        const light = new THREE.PointLight(0xd6be87, 0.3);
        light.position.set(root.position.x - .5, root.position.y + 1.35, root.position.z);
        scene.add(light);
    });

});

const mtlLoader_15 = new MTLLoader();
mtlLoader_15.load('models/street_lamp.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/street_lamp.obj', (root) => {
        root.translateZ(16);
        root.translateY(0.65);
        root.translateX(-1.5);
        scene.add(root);
        scene.updateMatrixWorld(true);
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(root.matrixWorld);
        const light = new THREE.PointLight(0xd6be87, 0.3);
        light.position.set(root.position.x - .5, root.position.y + 1.35, root.position.z);
        scene.add(light);
    });

});

const mtlLoader_16 = new MTLLoader();
mtlLoader_16.load('models/clouds.mtl', (mtl) => {

    mtl.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('models/clouds.obj', (root) => {
        root.translateZ(11);
        root.translateX(-0.5);
        root.translateY(9);
        root.rotateY(30);
        root.scale.set(12, 12, 12);
        scene.add(root);
        cloud_pos.push(root)
    });

});

const cloud_amt = 90;
for (let i = 0; i < cloud_amt; i++) {
    let mtlLoader_17 = new MTLLoader();
    mtlLoader_17.load('models/clouds.mtl', (mtl) => {
        let plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
        let plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('models/clouds.obj', (root) => {
            root.translateZ((Math.random() * 20) * plusOrMinus1);
            root.translateX((Math.random() * 20) * plusOrMinus2);
            root.translateY((Math.random() * 10) + 8);
            root.rotateY(30);
            root.scale.set(12, 12, 12);
            scene.add(root);
            cloud_pos.push(root)
        });


    });
}

const objects = [];

function objRender(time) {
    time *= 0.001; // convert time to seconds

    objects.forEach((object, ndx) => {

        const speed = 1 + ndx * .1;
        const rot = time * speed;

        object.rotation.y = rot;

    });

    rain_pos.forEach((object, ndx) => {
        if (object.position.y < -1) {
            let plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
            let plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
            object.position.x = (Math.random() * 20) * plusOrMinus1;
            object.position.y = 12
            object.position.z = (Math.random() * 20) * plusOrMinus2;
        }
        let speed = 0.3;
        object.translateY(-speed);

    });

    cloud_pos.forEach((object, ndx) => {
        if (object.position.z < -20) {
            let plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
            object.position.x = ((Math.random() * 20) * plusOrMinus1);
            object.position.z = 20;
            object.position.y = ((Math.random() * 10) + 8);

        }
        let speed = 0.001;
        object.translateX(-speed);

    });

    car_pos.forEach((object, ndx) => {
        if (object.position.z > 20) {
            object.position.z = -20
        }
        let speed = 0.01;
        object.translateZ(speed);
    });

    renderer.render(scene, camera);

    requestAnimationFrame(objRender);
}

function render(time) {

    time *= 0.001; // convert time to seconds
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);



}
requestAnimationFrame(objRender);
requestAnimationFrame(render);
