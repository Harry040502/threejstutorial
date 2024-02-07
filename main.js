import * as THREE from "three"
import "./style.css"

const scene = new THREE.Scene()

//create a sphere

const geometry = new THREE.SphereGeometry(3, 64, 64)
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
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(10, 10, 10)
scene.add(light)

//Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)



//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene, camera)

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
  mesh.position.x +=.01
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()