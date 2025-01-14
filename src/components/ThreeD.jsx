"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ThreeD() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const container = document.getElementById("three-container");
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const isMobile = window.innerWidth < 768;

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 60 : 75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, isMobile ? 8 : 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.physicallyCorrectLights = true;
    renderer.setClearColor(0x000000, 1); // Transparent background
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, -5);
    scene.add(pointLight);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/scene.glb",
      (gltf) => {
        const model = gltf.scene;

        // Increase the scale factor to make the model a bit larger
        const scaleFactor = isMobile ? 0.4 : 0.4; // Increased scale for both mobile and desktop
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Center the model
        const boundingBox = new THREE.Box3().setFromObject(model);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());

        model.position.set(
          -center.x,
          -center.y, // Keep the model centered
          -center.z
        );

        modelGroup.add(model);
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the GLB model", error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.enableZoom = false;
    controls.enableRotate = true;

    // Create a clock to manage frame time
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      // Calculate the time elapsed since the last frame
      const delta = clock.getDelta(); // Time in seconds

      // Set a consistent rotation speed for the model
      const rotationSpeed = 0.4; // Adjust this value to control the rotation speed
      modelGroup.rotation.y -= rotationSpeed * delta; // Apply rotation to the model only

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener("resize", () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      renderer.setSize(containerWidth, containerHeight);
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      if (renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return null; // This component doesn't render any DOM element directly
}
