import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' 
import gsap from "gsap";
// Scene
const scene = new THREE.Scene();

// Create our Sphere
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness:1

});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);



// Point Light
const pointLight =  new THREE.PointLight(0xffffff,100, 100, 0.8);;
pointLight.position.set(0, 10, 10)
pointLight.intensity = 25
scene.add(pointLight);
// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 30;
scene.add(camera);




// Render
const canvas =  document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(4)
renderer.debug.checkShaderErrors = true; // Check for shader errors
// Handle window resizing
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(newWidth, newHeight);
});

// Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed =5
const loop = ()=>{
  
  controls.update();
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()
renderer.render(scene, camera);

// timeline 
const t1 = gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
t1.fromTo('nav',{y:"-100%"},{y:"0%"})
t1.fromTo(".title",{opacity:0},{opacity:1})

// Mouse Animation Color

let mouseDown = false
let rgb =[]
window.addEventListener("mousedown",() => (mouseDown = true))
window.addEventListener("mouseup",()=>(mouseDown = false))

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
     rgb = [
        Math.round((e.pageX / window.innerWidth) * 255),
        Math.round((e.pageY / window.innerHeight) * 255),
        150,
     ];

     // Log values for debugging
     console.log("RGB values:", rgb);

     let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
     console.log("New Color:", newColor);

     gsap.to(mesh.material.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
     });
  }
});
