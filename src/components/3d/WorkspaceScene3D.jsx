import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WorkspaceScene3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 520;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0.6, 2.2, 5.8);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const workspaceGroup = new THREE.Group();
    scene.add(workspaceGroup);

    // 1. DESK PLATFORM
    const deskGeo = new THREE.BoxGeometry(4.6, 0.12, 3.0);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x05261C,
      roughness: 0.5,
      metalness: 0.1,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -0.6, 0);
    desk.receiveShadow = true;
    workspaceGroup.add(desk);

    // 2. STUDIO DESKTOP MONITOR
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(-0.35, 0.2, -0.2);
    monitorGroup.rotation.y = THREE.MathUtils.degToRad(8);
    workspaceGroup.add(monitorGroup);

    // Monitor Stand Base & Arm
    const standBaseGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.04, 32);
    const standArmGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.1, 16);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x1E2922,
      metalness: 0.8,
      roughness: 0.2,
    });
    const standBase = new THREE.Mesh(standBaseGeo, standMat);
    standBase.position.y = -0.58;
    standBase.receiveShadow = true;
    monitorGroup.add(standBase);

    const standArm = new THREE.Mesh(standArmGeo, standMat);
    standArm.position.set(0, -0.05, -0.15);
    monitorGroup.add(standArm);

    // Monitor Frame
    const monitorFrameGeo = new THREE.BoxGeometry(2.8, 1.7, 0.06);
    const monitorFrame = new THREE.Mesh(monitorFrameGeo, standMat);
    monitorFrame.position.set(0, 0.45, 0);
    monitorFrame.castShadow = true;
    monitorGroup.add(monitorFrame);

    // Monitor Screen Canvas (TWISP Studio Code & Architecture)
    const monitorCanvas = document.createElement('canvas');
    monitorCanvas.width = 896;
    monitorCanvas.height = 544;
    const mctx = monitorCanvas.getContext('2d');
    if (mctx) {
      mctx.fillStyle = '#062017';
      mctx.fillRect(0, 0, 896, 544);

      // Top Editor bar
      mctx.fillStyle = '#04150F';
      mctx.fillRect(0, 0, 896, 44);
      mctx.fillStyle = '#10B981';
      mctx.font = 'bold 14px "Space Grotesk", monospace';
      mctx.fillText('twisp-studio / src / architecture.config.ts', 24, 27);

      // Code lines & wireframe visualization
      mctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      mctx.fillRect(24, 60, 240, 460); // Sidebar

      mctx.fillStyle = '#A7F3D0';
      mctx.font = '13px "Space Grotesk", monospace';
      mctx.fillText('01  export const studioManifest = {', 280, 90);
      mctx.fillText('02    name: "TWISP Studio",', 280, 120);
      mctx.fillText('03    precision: "High-Performance",', 280, 150);
      mctx.fillText('04    clientFocus: "Bespoke Growth",', 280, 180);
      mctx.fillText('05    principles: [', 280, 210);
      mctx.fillText('06      "Zero AI clichés",', 310, 240);
      mctx.fillText('07      "Tailored Typography",', 310, 270);
      mctx.fillText('08      "Scalable Architecture"', 310, 300);
      mctx.fillText('09    ]', 280, 330);
      mctx.fillText('10  };', 280, 360);

      // Visual layout grid in editor preview
      mctx.fillStyle = '#083827';
      mctx.roundRect(600, 80, 260, 180, 8);
      mctx.fill();
      mctx.strokeStyle = '#10B981';
      mctx.lineWidth = 1.5;
      mctx.stroke();

      mctx.fillStyle = '#34D399';
      mctx.roundRect(620, 100, 120, 20, 4);
      mctx.fill();
      mctx.fillStyle = 'rgba(255,255,255,0.7)';
      mctx.fillRect(620, 130, 220, 8);
      mctx.fillRect(620, 146, 180, 8);

      mctx.fillStyle = '#10B981';
      mctx.roundRect(600, 280, 260, 200, 8);
      mctx.fill();
    }

    const monitorTexture = new THREE.CanvasTexture(monitorCanvas);
    const monitorScreenGeo = new THREE.PlaneGeometry(2.7, 1.6);
    const monitorScreenMat = new THREE.MeshBasicMaterial({ map: monitorTexture });
    const monitorScreen = new THREE.Mesh(monitorScreenGeo, monitorScreenMat);
    monitorScreen.position.set(0, 0.45, 0.032);
    monitorGroup.add(monitorScreen);

    // 3. SMARTPHONE MOCKUP
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(1.4, -0.42, 0.3);
    phoneGroup.rotation.y = THREE.MathUtils.degToRad(-15);
    phoneGroup.rotation.x = THREE.MathUtils.degToRad(-12);
    workspaceGroup.add(phoneGroup);

    const phoneBodyGeo = new THREE.BoxGeometry(0.55, 1.1, 0.04);
    const phoneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x111C19,
      metalness: 0.9,
      roughness: 0.2,
    });
    const phoneBody = new THREE.Mesh(phoneBodyGeo, phoneBodyMat);
    phoneBody.castShadow = true;
    phoneGroup.add(phoneBody);

    const phoneScreenGeo = new THREE.PlaneGeometry(0.5, 1.02);
    const phoneScreenMat = new THREE.MeshStandardMaterial({
      color: 0x10B981,
      emissive: 0x063B2B,
      emissiveIntensity: 0.3,
      roughness: 0.1,
    });
    const phoneScreen = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreen.position.z = 0.022;
    phoneGroup.add(phoneScreen);

    // 4. STUDIO NOTEBOOK & METALLIC PEN
    const notebookGeo = new THREE.BoxGeometry(0.9, 0.05, 1.2);
    const notebookMat = new THREE.MeshStandardMaterial({
      color: 0x0B3325,
      roughness: 0.8,
    });
    const notebook = new THREE.Mesh(notebookGeo, notebookMat);
    notebook.position.set(-1.4, -0.52, 0.4);
    notebook.rotation.y = THREE.MathUtils.degToRad(12);
    notebook.castShadow = true;
    notebook.receiveShadow = true;
    workspaceGroup.add(notebook);

    const penGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.9, 16);
    const penMat = new THREE.MeshStandardMaterial({
      color: 0xB8F2D5,
      metalness: 0.9,
      roughness: 0.2,
    });
    const pen = new THREE.Mesh(penGeo, penMat);
    pen.position.set(-0.85, -0.52, 0.38);
    pen.rotation.z = Math.PI / 2;
    pen.rotation.y = THREE.MathUtils.degToRad(8);
    pen.castShadow = true;
    workspaceGroup.add(pen);

    // 5. EMERALD GLASS PRISM
    const prismGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.6, 6);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x10B981,
      emissive: 0x063B2B,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.52,
      transparent: true,
      opacity: 0.92,
      clearcoat: 1.0,
    });
    const prism = new THREE.Mesh(prismGeo, glassMat);
    prism.position.set(0.9, -0.24, -0.3);
    prism.castShadow = true;
    workspaceGroup.add(prism);

    // 6. MINIMAL STUDIO PLANT ACCENT
    const potGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.35, 24);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x152620, roughness: 0.7 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(-1.7, -0.4, -0.6);
    pot.castShadow = true;
    workspaceGroup.add(pot);

    const leafGeo = new THREE.ConeGeometry(0.18, 0.45, 5);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.3 });
    for (let i = 0; i < 4; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(
        -1.7 + Math.sin((i * Math.PI) / 2) * 0.1,
        -0.12,
        -0.6 + Math.cos((i * Math.PI) / 2) * 0.1
      );
      leaf.rotation.set(0.3 * Math.sin(i), (i * Math.PI) / 2, 0.3 * Math.cos(i));
      workspaceGroup.add(leaf);
    }

    // LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0x063B2B, 1.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xE8FFF5, 2.5);
    mainLight.position.set(4, 6, 4);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0x10B981, 3.5, 6);
    accentLight.position.set(-2, 1.5, 1);
    scene.add(accentLight);

    let mouseX = 0;
    let targetX = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetX = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.12;
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
      mouseX += (targetX - mouseX) * 0.05;

      if (!prefersReducedMotion) {
        workspaceGroup.rotation.y = mouseX;
        workspaceGroup.position.y = Math.sin(elapsed * 0.7) * 0.03;
        prism.rotation.y += 0.006;
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
      deskGeo.dispose();
      deskMat.dispose();
      standBaseGeo.dispose();
      standArmGeo.dispose();
      standMat.dispose();
      monitorFrameGeo.dispose();
      monitorTexture.dispose();
      monitorScreenGeo.dispose();
      monitorScreenMat.dispose();
      phoneBodyGeo.dispose();
      phoneBodyMat.dispose();
      phoneScreenGeo.dispose();
      phoneScreenMat.dispose();
      notebookGeo.dispose();
      notebookMat.dispose();
      penGeo.dispose();
      penMat.dispose();
      prismGeo.dispose();
      glassMat.dispose();
      potGeo.dispose();
      potMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '440px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Interactive 3D Studio Workspace Scene"
      role="img"
    />
  );
}
