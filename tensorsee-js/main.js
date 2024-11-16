import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
const white = new THREE.Color(0xffffff);
const scene = new THREE.Scene({ background: white });
scene.background = new THREE.Color(0xffffff);

const createCube = (x, y, z) => {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
  const cubeLineMaterial = new THREE.LineBasicMaterial({ 
    color: 0x000000,
    linewidth: 2,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 1
  });
  const cubeLines = new THREE.LineSegments(cubeEdges, cubeLineMaterial);
  const cubeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.5
  });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cubeMesh.position.set(x, y, z);
  cubeLines.position.set(x, y, z);
  cubeLines.renderOrder = 1; // Ensure lines are rendered last

  scene.add(cubeLines);
  scene.add(cubeMesh);
};

// Create multiple cubes
for (let x = -2; x <= 2; x += 1) {
  for (let y = -2; y <= 2; y += 1) {
    for (let z = -2; z <= 2; z += 1) {
      createCube(x, y, z);
    }
  }
}

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);
camera.position.z = 10;
scene.add(camera);

const canvas = document.querySelector('canvas.three-js');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
renderer.setSize(window.innerWidth, window.innerHeight);

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();

document.querySelector('#app').innerHTML = `
  <div>
    <h3>Multiple Cubes Example</h3>
    <div class="card">
      <button id="counter" type="button">Click me!</button>
    </div>
  </div>
`;
