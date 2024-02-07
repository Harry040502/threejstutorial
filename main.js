import * as THREE from "three"
import gsap from "gsap"
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

//create a sphere

const geometry = new THREE.TorusKnotGeometry( 4.123, 0.1, 260, 20, 17, 20); 
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light2 = new THREE.PointLight(0xffffff, 70, 100, 1.7)
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light.position.set(0, 10, 10)
light2.position.set(0, -10, -10)
light.intensity = 1000
light2.intensity = 1000
scene.add(light)
scene.add(light2)

//Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 40
scene.add(camera)

//renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 1
//resize
window.addEventListener('resize', () => {
  //update sizes
  console.log(window.innerHeight)
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})


const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline stuff
const tl = gsap.timeline({default: {duration: 1 }})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z: 1, x:1, y:1})
tl.fromTo('nav', { y: '-100%'}, {y: "0%" })
tl.fromTo('.title', {opacity: 0}, {opacity: 1 })

//Mouse animation

let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
      rgb = [
        Math.round((e.pageX / sizes.width) * 255), 
        Math.round((e.pageY / sizes.height) * 255), 
        150,
      ]
    //Animation
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})