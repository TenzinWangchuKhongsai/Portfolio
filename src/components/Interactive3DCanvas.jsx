import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Interactive3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── Scene & Camera Setup ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050607, 0.04);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xd97736, 3.5);
    mainLight.position.set(10, 15, 10);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xe89052, 4.5, 25);
    rimLight.position.set(-10, -8, 5);
    scene.add(rimLight);

    // ─── 1. INSTANCED REFRACTIVE GLASS CUBES (Main reference video.mp4) ───
    // Glass material with crown glass IOR 1.52, high transmission 1.0, low roughness
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x221c17,
      emissive: 0x1f0e06,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.95,
      ior: 1.52, // Crown glass index
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.85,
    });

    const cubeCount = 64;
    const cubeGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const instancedCubes = new THREE.InstancedMesh(cubeGeo, glassMaterial, cubeCount);

    const restPositions = [];
    const noiseOffsets = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < cubeCount; i++) {
      const row = i % 4;
      const col = Math.floor((i % 16) / 4);
      const layer = Math.floor(i / 16);

      const rx = (col - 1.5) * 1.4;
      const ry = (row - 1.5) * 1.4;
      const rz = (layer - 1.5) * 1.4;

      restPositions.push(new THREE.Vector3(rx, ry, rz));
      noiseOffsets.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 8.0,
          (Math.random() - 0.5) * 8.0,
          (Math.random() - 0.5) * 8.0
        )
      );

      dummy.position.set(rx, ry, rz);
      dummy.updateMatrix();
      instancedCubes.setMatrixAt(i, dummy.matrix);
    }
    instancedCubes.instanceMatrix.needsUpdate = true;
    scene.add(instancedCubes);

    // Wireframe overlay for instanced glass cubes
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xe89052,
      transparent: true,
      opacity: 0.35,
    });
    const wireGeo = new THREE.EdgesGeometry(cubeGeo);
    const instancedWire = new THREE.InstancedMesh(wireGeo, wireMat, cubeCount);
    for (let i = 0; i < cubeCount; i++) {
      dummy.position.copy(restPositions[i]);
      dummy.updateMatrix();
      instancedWire.setMatrixAt(i, dummy.matrix);
    }
    instancedWire.instanceMatrix.needsUpdate = true;
    scene.add(instancedWire);

    // ─── 2. GPGPU CURL-NOISE PARTICLE VORTEX (reference video (2).mp4) ───
    const particleCount = 1800;
    const pPositions = new Float32Array(particleCount * 3);
    const pRestPositions = new Float32Array(particleCount * 3);
    const pVelocities = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pPositions[i * 3] = x;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = z;

      pRestPositions[i * 3] = x;
      pRestPositions[i * 3 + 1] = y;
      pRestPositions[i * 3 + 2] = z;

      pVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      pVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      pVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Warm copper / amber gradient
      const t = Math.random();
      pColors[i * 3] = THREE.MathUtils.lerp(0.85, 1.0, t);
      pColors[i * 3 + 1] = THREE.MathUtils.lerp(0.47, 0.65, t);
      pColors[i * 3 + 2] = THREE.MathUtils.lerp(0.21, 0.35, t);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pTextureMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, pTextureMaterial);
    scene.add(particleSystem);

    // ─── 3. INFINITE CATMULL-ROM CORRIDOR SPLINE (Main reference video.mp4) ───
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 14),
      new THREE.Vector3(2, 1, 6),
      new THREE.Vector3(-2, -1, -2),
      new THREE.Vector3(1, 2, -10),
      new THREE.Vector3(0, 0, -18),
    ]);

    const tunnelGeo = new THREE.TubeGeometry(curve, 100, 2.5, 12, false);
    const tunnelWireMat = new THREE.LineBasicMaterial({
      color: 0xd97736,
      transparent: true,
      opacity: 0.12,
    });
    const tunnelEdges = new THREE.EdgesGeometry(tunnelGeo);
    const tunnelLine = new THREE.LineSegments(tunnelEdges, tunnelWireMat);
    scene.add(tunnelLine);

    // ─── Interactive Event Tracking ───
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseVelX = 0;
    let mouseVelY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      mouseVelX = normX - lastMouseX;
      mouseVelY = normY - lastMouseY;

      lastMouseX = normX;
      lastMouseY = normY;

      targetMouseX = normX;
      targetMouseY = normY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ─── Animation Loop ───
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Mouse velocity decay
      mouseVelX *= 0.92;
      mouseVelY *= 0.92;
      const speed = Math.sqrt(mouseVelX * mouseVelX + mouseVelY * mouseVelY);

      // Scroll progress mapping t in [0, 1]
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = THREE.MathUtils.clamp(scrollY / maxScroll, 0, 1);

      // ─── 1. Refractive Cubes Matrix Transformations & Dispersion ───
      const dispersionFactor = Math.sin(scrollProgress * Math.PI) * 1.5 + speed * 4.0;
      for (let i = 0; i < cubeCount; i++) {
        const restPos = restPositions[i];
        const noise = noiseOffsets[i];

        dummy.position.set(
          restPos.x + noise.x * dispersionFactor,
          restPos.y + noise.y * dispersionFactor,
          restPos.z + noise.z * dispersionFactor
        );

        dummy.rotation.x = elapsedTime * 0.2 + i * 0.05 + mouseY * 0.5;
        dummy.rotation.y = elapsedTime * 0.25 + i * 0.05 + mouseX * 0.5;
        dummy.updateMatrix();

        instancedCubes.setMatrixAt(i, dummy.matrix);
        instancedWire.setMatrixAt(i, dummy.matrix);
      }
      instancedCubes.instanceMatrix.needsUpdate = true;
      instancedWire.instanceMatrix.needsUpdate = true;

      // ─── 2. GPGPU Curl-Noise Particle Morphing & Dispersal ───
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const rx = pRestPositions[idx];
        const ry = pRestPositions[idx + 1];
        const rz = pRestPositions[idx + 2];

        // Simulated 3D Curl Noise offset
        const curlX = Math.sin(elapsedTime + ry * 0.5) * Math.cos(rz * 0.5);
        const curlY = Math.cos(elapsedTime + rz * 0.5) * Math.sin(rx * 0.5);
        const curlZ = Math.sin(elapsedTime + rx * 0.5) * Math.cos(ry * 0.5);

        const targetX = rx * (1 + scrollProgress * 1.2) + curlX * (0.8 + speed * 3.0);
        const targetY = ry * (1 + scrollProgress * 1.2) + curlY * (0.8 + speed * 3.0);
        const targetZ = rz * (1 + scrollProgress * 1.2) + curlZ * (0.8 + speed * 3.0);

        posArray[idx] += (targetX - posArray[idx]) * 0.04;
        posArray[idx + 1] += (targetY - posArray[idx + 1]) * 0.04;
        posArray[idx + 2] += (targetZ - posArray[idx + 2]) * 0.04;
      }
      posAttr.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.08 + mouseX * 0.2;

      // ─── 3. Spline Camera Tunnel Fly-through ───
      const camPoint = curve.getPointAt(scrollProgress);
      const lookPoint = curve.getPointAt(Math.min(scrollProgress + 0.05, 1.0));

      camera.position.lerp(camPoint, 0.05);
      camera.lookAt(lookPoint);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      cubeGeo.dispose();
      glassMaterial.dispose();
      wireMat.dispose();
      wireGeo.dispose();
      particleGeo.dispose();
      pTextureMaterial.dispose();
      tunnelGeo.dispose();
      tunnelWireMat.dispose();
      tunnelEdges.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-[0] opacity-50 mix-blend-screen overflow-hidden"
    />
  );
}

