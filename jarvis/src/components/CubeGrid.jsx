import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CubeGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Create cube function
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
      cubeLines.renderOrder = 1;

      scene.add(cubeLines);
      scene.add(cubeMesh);
    };

    // Create cubes
    for (let x = -2; x <= 2; x += 1) {
      for (let y = -2; y <= 2; y += 1) {
        for (let z = -2; z <= 2; z += 1) {
          createCube(x, y, z);
        }
      }
    }

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      30
    );
    camera.position.z = 10;

    // Renderer setup
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Controls setup
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      // Dispose of resources when component unmounts
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <canvas ref={canvasRef} />
      <div className="card">
        <button type="button">Click me!</button>
      </div>
    </div>
  );
};

export default CubeGrid;