<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Catfish from '../package/index'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const ambientLight = new THREE.AmbientLight(0xffffff)
const directionalLight = new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(1, 1, 1)
scene.add(ambientLight, directionalLight)

let humans = new THREE.Group()
scene.add(humans)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(0, 10, 10)


const loader = new GLTFLoader()
loader.load('./human.glb', gltf => {
  const mesh = gltf.scene.children[0]
  for (let i = 0; i < 1000; i++) {
    const clone = mesh.clone()
    clone.geometry = clone.geometry.clone()
    clone.material = clone.material.clone()
    humans.add(clone)
  }
  renderer.setAnimationLoop(animate)
})


const animate = () => {
  controls.update()
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize)

const dispose = () => {
  Catfish.dispose(humans)
  humans = null
  // Catfish.exit(renderer)
}
</script>

<template>
  <div id="button-dispose" @click="dispose">dispose</div>
</template>

<style scoped>
#button-dispose {
  padding: 1vw;
  position: fixed;
  top: 1vw;
  left: 1vw;
  background: #ccc;
  cursor: pointer;
}
</style>
