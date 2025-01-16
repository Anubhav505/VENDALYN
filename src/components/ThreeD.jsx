"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default function ThreeD() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const container = document.getElementById("three-container");
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const aspectRatio = containerWidth / containerHeight;

    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 1, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);

    // Set the background color to black
    scene.background = new THREE.Color(0x000000);

    // Load HDR environment texture
    const hdrLoader = new RGBELoader();
    hdrLoader.load(
      "/models/hdr.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      },
      undefined,
      (error) => {
        console.error("Error loading HDR texture:", error);
      }
    );

    // Add purple ambient light
    const ambientLight = new THREE.AmbientLight(0x800080, 2);
    scene.add(ambientLight);

    // Load leaf texture (leaf image must be in public/models folder)
    const leafTexture = new THREE.TextureLoader().load("/models/leaf.png");
    leafTexture.minFilter = THREE.LinearFilter; // Set texture filtering for better quality
    leafTexture.magFilter = THREE.LinearFilter;

    // Create leaves as meshes along the light rays
    const leafGroup = new THREE.Group();
    scene.add(leafGroup);

    const numberOfLeaves = 100; // Number of leaves in the scene
    for (let i = 0; i < numberOfLeaves; i++) {
      // Create a plane geometry for the leaf
      const leafGeometry = new THREE.PlaneGeometry(0.5, 0.5); // Size of each leaf
      const leafMaterial = new THREE.MeshStandardMaterial({
        map: leafTexture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide, // Both sides of the leaf are visible
      });

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

      // Randomize position along light rays
      leaf.position.set(
        (Math.random() - 0.5) * 10, // X position
        (Math.random() - 0.5) * 10, // Y position
        (Math.random() - 0.5) * 10 // Z position
      );

      // Randomize rotation for natural effect
      leaf.rotation.x = Math.random() * Math.PI;
      leaf.rotation.y = Math.random() * Math.PI;
      leaf.rotation.z = Math.random() * Math.PI;

      // Add some randomness to the scale for variety
      const scaleFactor = Math.random() * 0.5 + 0.5;
      leaf.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Add the leaf to the group
      leafGroup.add(leaf);
    }

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/scene.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(10, 10, 10); // Increase the size of the model

        const boundingBox = new THREE.Box3().setFromObject(model);
        const center = boundingBox.getCenter(new THREE.Vector3());
        model.position.set(-center.x, -center.y, -center.z);

        modelGroup.add(model);
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the GLB model", error);
      }
    );

    // Set up camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.enableZoom = false;

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      modelGroup.rotation.y -= 0.3 * delta;
      leafGroup.rotation.y += 0.01; // Slight rotation for dynamic effect
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resizing
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
