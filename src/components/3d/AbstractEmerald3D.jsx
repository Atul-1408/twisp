import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AbstractEmerald3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const abstractGroup = new THREE.Group();
    scene.add(abstractGroup);

    // 1. ABSTRACT EMERALD GLASS RIBBON / TORUS KNOT
    const ribbonGeo = new THREE.TorusKnotGeometry(1.25, 0.38, 128, 32, 2, 3);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x10B981,
      emissive: 0x063B2B,
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.9,
      thickness: 1.4,
      ior: 1.55,
      transparent: true,
      opacity: 0.94,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, glassMat);
    abstractGroup.add(ribbon);

    // 2. INNER REFLECTIVE CORE
    const innerGeo = new THREE.IcosahedronGeometry(0.65, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xB8F2D5,
      emissive: 0x087F5B,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    abstractGroup.add(innerCore);

    // 3. FLOATING ORBITAL PARTICLES
    const particleCount = 28;
    const particleGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x34D399 });
    const particleGroup = new THREE.Group();
    abstractGroup.add(particleGroup);

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      const theta = (i / particleCount) * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const radius = 1.9 + (Math.random() - 0.5) * 0.4;
      p.position.set(
        radius * Math.cos(theta) * Math.cos(phi),
        radius * Math.sin(phi),
        radius * Math.sin(theta) * Math.cos(phi)
      );
      particleGroup.add(p);
    }

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x063B2B, 2.2);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x10B981, 4.5, 10);
    light1.position.set(3, 4, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xB8F2D5, 3.0, 10);
    light2.position.set(-3, -3, 2);
    scene.add(light2);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.15;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        abstractGroup.rotation.y = elapsed * 0.25 + mouseX;
        abstractGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.3 + mouseY;
        innerCore.rotation.y = -elapsed * 0.35;
        particleGroup.rotation.y = elapsed * 0.15;
        abstractGroup.position.y = Math.sin(elapsed * 0.8) * 0.08;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ribbonGeo.dispose();
      glassMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '380px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Interactive 3D Abstract Emerald Glass Sculpture"
      role="img"
    />
  );
}
