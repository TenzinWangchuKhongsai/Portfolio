import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Helper function to create realistic ground contact shadow canvas texture
function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
  gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0.6)');
  gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
  gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper function to create canvas texture for 3D IoT layer labels
function createLayerTextTexture(text, subtext) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(17, 19, 24, 0.9)';
  ctx.roundRect(10, 10, 492, 108, 16);
  ctx.fill();

  ctx.strokeStyle = '#D97736';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(text, 256, 58);

  ctx.font = '22px "JetBrains Mono", monospace';
  ctx.fillStyle = '#E89052';
  ctx.fillText(subtext, 256, 96);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Section3DModel({
  type = 'hero',
  isAccelerating = false,
  selectedNode = null,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // ─── WebGL Renderer & Studio Environment Setup ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Studio Environment Reflections via PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnv).texture;
    scene.environment = envMap;

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Shared Contact Shadow Plane helper directly beneath 3D assets
    const shadowTexture = createContactShadowTexture();
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(7.0, 7.0),
      shadowMaterial
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -0.01;
    scene.add(contactShadow);

    // ─── Theme Materials ───
    // Body Paint: Deep Obsidian Carbon #111113 with high clearcoat reflection
    const obsidianBodyPaint = new THREE.MeshPhysicalMaterial({
      color: 0x111113,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    // Amber Copper Metal Accent
    const amberCopper = new THREE.MeshPhysicalMaterial({
      color: 0xd97736,
      emissive: 0x3d1c0a,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 0.8,
    });

    // Tire Rubber
    const tireRubberMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.85,
      metalness: 0.05,
    });

    // Brushed Alloy Rim
    const alloyRimMat = new THREE.MeshStandardMaterial({
      color: 0xd97736,
      metalness: 0.9,
      roughness: 0.25,
    });

    // Caliper Amber #E05626
    const caliperAmberMat = new THREE.MeshBasicMaterial({ color: 0xe05626 });

    // Glass Refraction Material (Crown Glass IOR 1.52)
    const glassRefractionMat = new THREE.MeshPhysicalMaterial({
      color: 0x221c17,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.96,
      ior: 1.52,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.9,
    });

    const wireAmber = new THREE.LineBasicMaterial({
      color: 0xe89052,
      transparent: true,
      opacity: 0.65,
    });

    // Dynamic objects tracked for animation loop
    const animState = {
      wheels: [],
      carBody: null,
      roadLines: [],
      heroCore: null,
      heroShell: null,
      heroHalo: null,
      phoneMesh: null,
      phoneCards: [],
      glassLayers: [],
      radarSweep: null,
      radarNodes: [],
    };

    // Orbit Drag State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMoveDrag = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMoveDrag);
    window.addEventListener('mouseup', onMouseUp);

    // ════════════════════════════════════════════════════════════
    // SECTION 1: HERO — HIGH-TECH GEODESIC DATA NODE
    // ════════════════════════════════════════════════════════════
    if (type === 'hero') {
      camera.position.set(4.0, 2.2, 5.0);
      camera.lookAt(0, 0, 0);

      const heroGroup = new THREE.Group();

      // Outer Geodesic Icosahedron Shell with glowing wireframe edges
      const outerGeo = new THREE.IcosahedronGeometry(1.6, 2);
      const outerShell = new THREE.Mesh(outerGeo, glassRefractionMat);

      const edgesGeo = new THREE.EdgesGeometry(outerGeo);
      const wireframeLines = new THREE.LineSegments(edgesGeo, wireAmber);
      outerShell.add(wireframeLines);
      heroGroup.add(outerShell);
      animState.heroShell = outerShell;

      // Crystal Core
      const coreGeo = new THREE.OctahedronGeometry(0.85, 2);
      const innerCore = new THREE.Mesh(coreGeo, amberCopper);
      heroGroup.add(innerCore);
      animState.heroCore = innerCore;

      // Orbiting Luminous Ring
      const haloGeo = new THREE.TorusGeometry(2.3, 0.04, 16, 100);
      const haloRing = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color: 0xffa057 }));
      haloRing.rotation.x = Math.PI / 3;
      heroGroup.add(haloRing);
      animState.heroHalo = haloRing;

      mainGroup.add(heroGroup);

    // ════════════════════════════════════════════════════════════
    // SECTION 2: FIRST DRIVE — CLEAN GLTF-GRADE SPORTS CAR & PARENTED WHEELS
    // ════════════════════════════════════════════════════════════
    } else if (type === 'car') {
      camera.position.set(4.5, 2.5, 5.5);
      camera.lookAt(0, 0.2, 0);

      const carGroup = new THREE.Group();

      // Sleek Aerodynamic Body Chassis (Obsidian Carbon #111113)
      const chassisGeo = new THREE.BoxGeometry(3.6, 0.45, 1.7);
      const chassis = new THREE.Mesh(chassisGeo, obsidianBodyPaint);
      chassis.position.y = 0.48;
      carGroup.add(chassis);
      animState.carBody = carGroup;

      // Front Aerodynamic Hood Intake
      const hoodGeo = new THREE.BoxGeometry(1.2, 0.2, 1.5);
      const hood = new THREE.Mesh(hoodGeo, obsidianBodyPaint);
      hood.position.set(1.1, 0.68, 0);
      carGroup.add(hood);

      // Glass Cockpit Canopy
      const cabinGeo = new THREE.BoxGeometry(1.7, 0.65, 1.35);
      const cabin = new THREE.Mesh(cabinGeo, glassRefractionMat);
      cabin.position.set(-0.25, 1.02, 0);
      carGroup.add(cabin);

      const cabinEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cabinGeo), wireAmber);
      cabin.add(cabinEdges);

      // Rear Spoiler Wing
      const spoilerBlade = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 1.8), amberCopper);
      spoilerBlade.position.set(-1.7, 1.25, 0);
      const strutL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.08), obsidianBodyPaint);
      strutL.position.set(-1.65, 1.05, 0.5);
      const strutR = strutL.clone();
      strutR.position.z = -0.5;
      carGroup.add(spoilerBlade, strutL, strutR);

      // Dual Exhaust Pipes
      const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 16);
      pipeGeo.rotateZ(Math.PI / 2);
      const pipeL = new THREE.Mesh(pipeGeo, amberCopper);
      pipeL.position.set(-1.85, 0.38, 0.4);
      const pipeR = pipeL.clone();
      pipeR.position.z = -0.4;
      carGroup.add(pipeL, pipeR);

      // LED Headlights & Projected Light Cones
      const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffdfb3 });
      const lightL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.4), headlightMat);
      lightL.position.set(1.82, 0.58, 0.55);
      const lightR = lightL.clone();
      lightR.position.z = -0.55;
      carGroup.add(lightL, lightR);

      const beamGeo = new THREE.ConeGeometry(0.9, 4.0, 16, 1, true);
      beamGeo.rotateZ(-Math.PI / 2);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xffb07c,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const beamMeshL = new THREE.Mesh(beamGeo, beamMat);
      beamMeshL.position.set(3.8, 0.58, 0.55);
      const beamMeshR = beamMeshL.clone();
      beamMeshR.position.z = -0.55;
      carGroup.add(beamMeshL, beamMeshR);

      // ─── 4 INTEGRATED WHEEL NODES INSIDE WHEEL ARCHES ───
      // Wheel positions (FL, FR, RL, RR) sit naturally INSIDE the wheel wells
      const wheelPositions = [
        { name: 'wheel_fl', pos: [1.1, 0.42, 0.88] },
        { name: 'wheel_fr', pos: [1.1, 0.42, -0.88] },
        { name: 'wheel_rl', pos: [-1.1, 0.42, 0.88] },
        { name: 'wheel_rr', pos: [-1.1, 0.42, -0.88] },
      ];

      // Geometries pre-rotated at buffer level so cylinder height is aligned along Z axle axis
      const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 32);
      tireGeo.rotateX(Math.PI / 2);

      const rimGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.33, 16);
      rimGeo.rotateX(Math.PI / 2);

      const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.34, 12);
      hubGeo.rotateX(Math.PI / 2);

      const discGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 24);
      discGeo.rotateX(Math.PI / 2);

      const caliperGeo = new THREE.BoxGeometry(0.1, 0.2, 0.12);

      wheelPositions.forEach((wp) => {
        const wheelNode = new THREE.Group();
        wheelNode.name = wp.name;
        wheelNode.position.set(...wp.pos);

        // 1. Rubber Tire Tread (standing upright, facing Z axle)
        const tireMesh = new THREE.Mesh(tireGeo, tireRubberMat);
        wheelNode.add(tireMesh);

        // 2. Outer Alloy Rim Lip & Wireframe Edges
        const rimMesh = new THREE.Mesh(rimGeo, alloyRimMat);
        const rimEdges = new THREE.LineSegments(new THREE.EdgesGeometry(rimGeo), wireAmber);
        wheelNode.add(rimMesh, rimEdges);

        // 3. Central Amber Wheel Hub Cap
        const hubMesh = new THREE.Mesh(hubGeo, amberCopper);
        wheelNode.add(hubMesh);

        // 4. 5-Spoke Star Alloy Rim Pattern (Spokes in X-Y plane spinning with Z axle)
        for (let s = 0; s < 5; s++) {
          const spokeAngle = (s * Math.PI * 2) / 5;
          const spokeMesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.24, 0.05, 0.33),
            alloyRimMat
          );
          spokeMesh.position.set(Math.cos(spokeAngle) * 0.15, Math.sin(spokeAngle) * 0.15, 0);
          spokeMesh.rotation.z = spokeAngle;
          wheelNode.add(spokeMesh);
        }

        // 5. Perforated Metallic Brake Disc
        const discMesh = new THREE.Mesh(discGeo, new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.3 }));
        wheelNode.add(discMesh);

        // 6. Stationary Amber Brake Caliper mounted inside wheel hub
        const caliperMesh = new THREE.Mesh(caliperGeo, caliperAmberMat);
        caliperMesh.position.set(
          wp.pos[0] + (wp.pos[0] > 0 ? -0.1 : 0.1),
          wp.pos[1] + 0.1,
          wp.pos[2]
        );
        carGroup.add(caliperMesh);

        carGroup.add(wheelNode);
        animState.wheels.push(wheelNode);
      });

      // Moving Speed Road Lines
      const roadGroup = new THREE.Group();
      for (let i = 0; i < 15; i++) {
        const lineGeo = new THREE.BoxGeometry(0.8, 0.02, 0.05);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xe89052, transparent: true, opacity: 0.4 });
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set((i - 7) * 0.9, 0.01, (i % 2 === 0 ? 1 : -1) * 1.5);
        roadGroup.add(line);
        animState.roadLines.push(line);
      }
      mainGroup.add(roadGroup);
      mainGroup.add(carGroup);

    // ════════════════════════════════════════════════════════════
    // SECTION 3: AURA — ISOMETRIC GLASS SMARTPHONE FRAME
    // ════════════════════════════════════════════════════════════
    } else if (type === 'smartphone') {
      camera.position.set(3.2, 2.4, 4.2);
      camera.lookAt(0, 0, 0);

      const phoneGroup = new THREE.Group();
      phoneGroup.rotation.y = -0.25; // 15 degree isometric angle tilt
      phoneGroup.rotation.x = 0.15;

      // Phone Chassis Frame
      const phoneGeo = new THREE.BoxGeometry(1.8, 3.6, 0.18);
      const phoneFrame = new THREE.Mesh(phoneGeo, obsidianBodyPaint);
      phoneGroup.add(phoneFrame);

      const phoneWire = new THREE.LineSegments(new THREE.EdgesGeometry(phoneGeo), wireAmber);
      phoneFrame.add(phoneWire);

      // Camera Island
      const camIsland = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.08), amberCopper);
      camIsland.position.set(-0.42, 1.3, -0.11);
      phoneGroup.add(camIsland);

      // Glass Screen Plane
      const screenMat = new THREE.MeshPhysicalMaterial({
        color: 0x181410,
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
      });
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.68, 3.45), screenMat);
      screen.position.z = 0.095;
      phoneGroup.add(screen);

      // Stacked Depth Cards floating over phone screen
      const cardConfigs = [
        { y: 0.85, z: 0.35, color: 0xd97736 },
        { y: 0.05, z: 0.55, color: 0xe89052 },
        { y: -0.75, z: 0.75, color: 0xffa057 },
      ];

      cardConfigs.forEach((cfg, idx) => {
        const cGeo = new THREE.PlaneGeometry(1.4, 0.65);
        const cMat = new THREE.MeshBasicMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        });
        const card = new THREE.Mesh(cGeo, cMat);
        card.position.set(idx * 0.08 - 0.08, cfg.y, cfg.z);
        const cWire = new THREE.LineSegments(new THREE.EdgesGeometry(cGeo), wireAmber);
        card.add(cWire);

        phoneGroup.add(card);
        animState.phoneCards.push(card);
      });

      mainGroup.add(phoneGroup);

    // ════════════════════════════════════════════════════════════
    // SECTION 4: SMART OFFICE — 7-LAYER TRANSLUCENT IoT STACK WITH LABELS
    // ════════════════════════════════════════════════════════════
    } else if (type === 'office') {
      camera.position.set(4.8, 3.8, 5.8);
      camera.lookAt(0, 0.2, 0);

      const stackGroup = new THREE.Group();

      const layers = [
        { id: 'l1', text: 'L1 PHYSICAL SENSORS', sub: 'PIR / Ambient Lux Nodes', y: -1.5, color: 0xd97736 },
        { id: 'l2', text: 'L2 VISION ENGINE', sub: 'TensorFlow.js COCO-SSD', y: -1.0, color: 0xe89052 },
        { id: 'l3', text: 'L3 INGESTION BUS', sub: 'MQTT Pub/Sub Broker', y: -0.5, color: 0xffa057 },
        { id: 'l4', text: 'L4 PERSISTENCE', sub: 'SQLite Time-Series', y: 0.0, color: 0xffdfb3 },
        { id: 'l5', text: 'L5 HEURISTIC CORE', sub: 'Adaptive Rules Engine', y: 0.5, color: 0xd97736 },
        { id: 'l6', text: 'L6 CONTROL RELAYS', sub: 'Hardware Airflow / Lux', y: 1.0, color: 0xe89052 },
        { id: 'l7', text: 'L7 REACT APPLICATION', sub: 'Facility Telemetry UI', y: 1.5, color: 0xffa057 },
      ];

      layers.forEach((layer) => {
        const layerGeo = new THREE.BoxGeometry(3.6, 0.12, 3.6);
        const glassLayer = new THREE.Mesh(layerGeo, glassRefractionMat);
        glassLayer.position.y = layer.y;

        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(layerGeo),
          new THREE.LineBasicMaterial({ color: layer.color, transparent: true, opacity: 0.75 })
        );
        glassLayer.add(edges);

        // 3D Canvas Label Badge on layer front edge
        const textTexture = createLayerTextTexture(layer.text, layer.sub);
        const labelMat = new THREE.MeshBasicMaterial({
          map: textTexture,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), labelMat);
        labelPlane.position.set(0, 0.25, 1.82);
        glassLayer.add(labelPlane);

        stackGroup.add(glassLayer);
        animState.glassLayers.push({ mesh: glassLayer, data: layer });
      });

      mainGroup.add(stackGroup);

    // ════════════════════════════════════════════════════════════
    // SECTION 5: CAREER AGENT — ORBITAL RADAR NODE NETWORK
    // ════════════════════════════════════════════════════════════
    } else if (type === 'radar') {
      camera.position.set(3.5, 3.5, 4.5);
      camera.lookAt(0, 0, 0);

      const radarGroup = new THREE.Group();

      // Radar Dish Rings
      [0.9, 1.7, 2.5, 3.2].forEach((r) => {
        const ringGeo = new THREE.RingGeometry(r, r + 0.03, 64);
        ringGeo.rotateX(-Math.PI / 2);
        const ring = new THREE.Mesh(
          ringGeo,
          new THREE.MeshBasicMaterial({ color: 0xd97736, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
        );
        radarGroup.add(ring);
      });

      // Sweeping Sector Laser Wedge
      const sweepGeo = new THREE.CircleGeometry(3.2, 48, 0, Math.PI / 2.5);
      sweepGeo.rotateX(-Math.PI / 2);
      const sweepMat = new THREE.MeshBasicMaterial({
        color: 0xffa057,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const sweep = new THREE.Mesh(sweepGeo, sweepMat);
      radarGroup.add(sweep);
      animState.radarSweep = sweep;

      // 4 Evidence Claim Nodes
      const nodePositions = [
        [1.2, 0.5, 0.8],
        [-1.6, 0.6, -1.2],
        [1.8, 0.7, -1.5],
        [-1.1, 0.4, 1.6],
      ];

      nodePositions.forEach(([x, y, z]) => {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffb07c })
        );
        node.position.set(x, y, z);

        const stalk = new THREE.LineSegments(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0, z), new THREE.Vector3(x, y, z)]),
          wireAmber
        );

        radarGroup.add(node, stalk);
        animState.radarNodes.push(node);
      });

      // Central AI Crystal Core
      const coreGeo = new THREE.OctahedronGeometry(0.65, 1);
      const core = new THREE.Mesh(coreGeo, amberCopper);
      core.position.y = 0.6;
      core.add(new THREE.LineSegments(new THREE.EdgesGeometry(coreGeo), wireAmber));
      radarGroup.add(core);

      mainGroup.add(radarGroup);
    }

    // ─── Lighting Setup ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xd97736, 3.5);
    mainLight.position.set(6, 10, 6);
    scene.add(mainLight);

    const pointLight = new THREE.PointLight(0xffa057, 4.5, 20);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ─── Render Animation Loop ───
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth orbit drag & mouse spring interpolation
      mainGroup.rotation.y += (targetRotationY + mouseX * 0.25 - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mouseY * 0.15 - mainGroup.rotation.x) * 0.08;

      // Section Specific Kinetic Animations
      if (type === 'hero') {
        if (animState.heroShell) animState.heroShell.rotation.y = time * 0.15;
        if (animState.heroCore) {
          animState.heroCore.rotation.x = time * 0.4;
          animState.heroCore.rotation.y = time * 0.5;
        }
        if (animState.heroHalo) animState.heroHalo.rotation.z = time * 0.25;

      } else if (type === 'car') {
        // Rotate local wheel nodes clockwise around their Z axle axis
        const speedVal = isAccelerating ? 0.45 : 0.08;
        animState.wheels.forEach((wNode) => {
          wNode.rotation.z -= speedVal;
        });

        if (animState.carBody) {
          animState.carBody.rotation.x = isAccelerating ? -0.06 : Math.sin(time * 2) * 0.01;
          animState.carBody.position.y = isAccelerating ? 0.02 : Math.sin(time * 3) * 0.02;
        }

        animState.roadLines.forEach((line) => {
          line.position.x -= isAccelerating ? 0.3 : 0.08;
          if (line.position.x < -6) line.position.x = 6;
        });

      } else if (type === 'smartphone') {
        animState.phoneCards.forEach((card, i) => {
          card.position.z = 0.35 + i * 0.2 + Math.sin(time * 1.5 + i) * 0.04;
        });

      } else if (type === 'office') {
        animState.glassLayers.forEach((l) => {
          if (selectedNode && l.data.id === selectedNode) {
            l.mesh.scale.set(1.08, 1.08, 1.08);
          } else {
            l.mesh.scale.set(1.0, 1.0, 1.0);
          }
        });

      } else if (type === 'radar') {
        if (animState.radarSweep) animState.radarSweep.rotation.y = time * 1.6;
        animState.radarNodes.forEach((node, i) => {
          node.position.y = 0.5 + Math.sin(time * 2.5 + i) * 0.15;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMoveDrag);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [type, isAccelerating, selectedNode]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[320px] sm:h-[420px] relative flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
}


