import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 560;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 6.2);
    camera.lookAt(0, 0.4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Main Studio Group for Parallax & Floating
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. ARCHITECTURAL PLATFORM / PEDESTAL
    const platformGeo = new THREE.CylinderGeometry(2.5, 2.7, 0.28, 48);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x052B20,
      roughness: 0.6,
      metalness: 0.15,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0, -0.9, 0);
    platform.receiveShadow = true;
    mainGroup.add(platform);

    // Subtle platform trim ring
    const ringGeo = new THREE.TorusGeometry(2.52, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x10B981,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x063B2B,
      emissiveIntensity: 0.4
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.76;
    mainGroup.add(ring);

    // 2. STUDIO LAPTOP MOCKUP
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.35, 0.05, 0.2);
    laptopGroup.rotation.y = THREE.MathUtils.degToRad(18);
    laptopGroup.rotation.x = THREE.MathUtils.degToRad(4);
    mainGroup.add(laptopGroup);

    // Laptop Base (Chassis)
    const baseGeo = new THREE.BoxGeometry(2.6, 0.07, 1.8);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x15221F,
      metalness: 0.85,
      roughness: 0.25,
    });
    const laptopBase = new THREE.Mesh(baseGeo, metalMat);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    laptopGroup.add(laptopBase);

    // Keyboard recess & trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.85, 0.01, 0.55);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x1A2A26,
      metalness: 0.7,
      roughness: 0.4,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.04, 0.45);
    laptopGroup.add(trackpad);

    const keyboardGeo = new THREE.BoxGeometry(2.3, 0.01, 0.95);
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x0E1815,
      roughness: 0.6,
    });
    const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboard.position.set(0, 0.04, -0.3);
    laptopGroup.add(keyboard);

    // Laptop Display Lid
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.04, -0.88);
    lidGroup.rotation.x = THREE.MathUtils.degToRad(-108); // Tilted open angle
    laptopGroup.add(lidGroup);

    const lidGeo = new THREE.BoxGeometry(2.6, 1.7, 0.05);
    const lidMesh = new THREE.Mesh(lidGeo, metalMat);
    lidMesh.position.set(0, 0.85, 0);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Generate Dynamic Canvas Texture for Laptop Screen (Twisp Live UI)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      // Dark emerald background
      const grad = ctx.createLinearGradient(0, 0, 1024, 640);
      grad.addColorStop(0, '#041A13');
      grad.addColorStop(1, '#083325');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 640);

      // Top Browser Header
      ctx.fillStyle = '#0B291F';
      ctx.fillRect(0, 0, 1024, 52);
      ctx.fillStyle = '#EF4444';
      ctx.beginPath(); ctx.arc(36, 26, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath(); ctx.arc(58, 26, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#10B981';
      ctx.beginPath(); ctx.arc(80, 26, 6, 0, Math.PI * 2); ctx.fill();

      // Browser URL bar
      ctx.fillStyle = '#061D15';
      ctx.roundRect(140, 12, 480, 28, 6);
      ctx.fill();
      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 12px "Space Grotesk", sans-serif';
      ctx.fillText('🔒 https://twisp.studio', 160, 30);

      // Draw TWISP Brand Logo in header
      const logoImg = new Image();
      logoImg.src = '/assets/twisp-logo-white.png';
      logoImg.onload = () => {
        ctx.drawImage(logoImg, 880, 14, 85, 24);
        screenTexture.needsUpdate = true;
      };

      // Web Page Hero Content
      ctx.fillStyle = '#10B981';
      ctx.font = '600 14px "Space Grotesk", sans-serif';
      ctx.fillText('DIGITAL DESIGN & DEVELOPMENT STUDIO', 80, 120);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 44px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Websites built to', 80, 180);
      ctx.fillText('move your business', 80, 235);
      ctx.fillStyle = '#34D399';
      ctx.fillText('forward.', 80, 290);

      // Supporting copy
      ctx.fillStyle = '#94A3B8';
      ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Strategy, design and development for businesses ready to grow.', 80, 340);

      // CTA Button
      ctx.fillStyle = '#10B981';
      ctx.roundRect(80, 380, 220, 52, 8);
      ctx.fill();
      ctx.fillStyle = '#03130E';
      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Get a Free Quote →', 112, 412);

      // Studio Badges
      ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.roundRect(80, 470, 380, 44, 8);
      ctx.fill();
      ctx.fillStyle = '#A7F3D0';
      ctx.font = '500 14px "Space Grotesk", sans-serif';
      ctx.fillText('Strategy  •  Design  •  Development  •  Growth', 105, 498);

      // Right-side card mockup inside screen
      ctx.fillStyle = '#062E22';
      ctx.roundRect(620, 100, 340, 460, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#10B981';
      ctx.roundRect(650, 130, 80, 24, 12);
      ctx.fill();
      ctx.fillStyle = '#041A13';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('FEATURED', 662, 146);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Curated Web Systems', 650, 190);

      // Graph line
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(650, 380);
      ctx.bezierCurveTo(700, 360, 750, 280, 800, 310);
      ctx.bezierCurveTo(850, 330, 900, 220, 930, 240);
      ctx.stroke();
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const screenGeo = new THREE.PlaneGeometry(2.45, 1.55);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.85, 0.027);
    lidGroup.add(screenMesh);

    // 3. PHYSICAL EMERALD GLASS CUBE / PRISM (Refractive & Glowing)
    const prismGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x10B981,
      emissive: 0x063B2B,
      emissiveIntensity: 0.25,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.54,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const prism = new THREE.Mesh(prismGeo, glassMat);
    prism.position.set(1.4, 0.25, 0.35);
    prism.rotation.set(THREE.MathUtils.degToRad(25), THREE.MathUtils.degToRad(35), THREE.MathUtils.degToRad(15));
    prism.castShadow = true;
    mainGroup.add(prism);

    // Interior floating core inside emerald cube
    const coreGeo = new THREE.OctahedronGeometry(0.28);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xB8F2D5,
      emissive: 0x10B981,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    prism.add(core);

    // 4. ARCHITECTURAL GEOMETRIC SPHERE / ACCENT
    const sphereGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x087F5B,
      metalness: 0.7,
      roughness: 0.3,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(1.7, -0.45, -0.6);
    sphere.castShadow = true;
    mainGroup.add(sphere);

    // Soft cylindrical column accent
    const colGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 24);
    const colMat = new THREE.MeshStandardMaterial({
      color: 0x0F3D2F,
      metalness: 0.3,
      roughness: 0.5,
    });
    const col = new THREE.Mesh(colGeo, colMat);
    col.position.set(-1.6, -0.45, -0.4);
    col.castShadow = true;
    mainGroup.add(col);

    // 5. STUDIO LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0x063B2B, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xE6FFFA, 2.8);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const emeraldRimLight = new THREE.PointLight(0x10B981, 4.2, 8);
    emeraldRimLight.position.set(2, 2.5, -2);
    scene.add(emeraldRimLight);

    const fillLight = new THREE.DirectionalLight(0x087F5B, 1.5);
    fillLight.position.set(-4, 3, 2);
    scene.add(fillLight);

    // Mouse Interaction for subtle studio parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.15;
      targetY = y * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth parallax damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Floating motion
        mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.06;
        mainGroup.rotation.y = mouseX;
        mainGroup.rotation.x = -mouseY;

        // Slow emerald prism rotation
        prism.rotation.y += 0.004;
        prism.rotation.x = THREE.MathUtils.degToRad(25) + Math.sin(elapsedTime * 0.6) * 0.05;
        core.rotation.y += 0.01;
        core.rotation.z += 0.008;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      platformGeo.dispose();
      platformMat.dispose();
      baseGeo.dispose();
      metalMat.dispose();
      lidGeo.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      prismGeo.dispose();
      glassMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      colGeo.dispose();
      colMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="hero-3d-wrapper"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '440px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab'
      }}
      aria-label="Interactive 3D Studio Laptop and Emerald Glass Composition"
      role="img"
    />
  );
}
