// Scene Setup
let scene, camera, renderer, controls;
let eyes, brain, tongue, knowledgeCore;
let dataFlowParticles = [];
let connections = [];
let animationId;
let dataFlowActive = true;

// Component positions
const positions = {
    eyes: { x: -8, y: 4, z: 0 },
    brain: { x: 0, y: 6, z: 0 },
    tongue: { x: 8, y: 4, z: 0 },
    core: { x: 0, y: -2, z: 0 }
};

// Initialize the scene
function init() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 20);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Lights
    addLights();

    // Create Components
    createEyes();
    createBrain();
    createTongue();
    createKnowledgeCore();

    // Create Connections
    createConnections();

    // Create ambient particles
    createAmbientParticles();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

// Lighting
function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff88, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xff00ff, 0.5, 100);
    pointLight3.position.set(0, 0, 10);
    scene.add(pointLight3);
}

// Create Eyes Component
function createEyes() {
    const eyesGroup = new THREE.Group();
    
    // Left Eye
    const leftEyeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.3,
        shininess: 100
    });
    const leftEye = new THREE.Mesh(leftEyeGeometry, eyeMaterial);
    leftEye.position.x = -1.2;
    
    // Pupil
    const pupilGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const pupilMaterial = new THREE.MeshPhongMaterial({
        color: 0x000033,
        emissive: 0x0000ff,
        emissiveIntensity: 0.5
    });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-1.2, 0, 1);
    
    // Right Eye
    const rightEye = new THREE.Mesh(leftEyeGeometry, eyeMaterial);
    rightEye.position.x = 1.2;
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(1.2, 0, 1);
    
    // Wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.1, 16, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const leftWireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    leftWireframe.position.x = -1.2;
    const rightWireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    rightWireframe.position.x = 1.2;
    
    eyesGroup.add(leftEye, rightEye, leftPupil, rightPupil, leftWireframe, rightWireframe);
    eyesGroup.position.set(positions.eyes.x, positions.eyes.y, positions.eyes.z);
    
    scene.add(eyesGroup);
    eyes = eyesGroup;
}

// Create Brain Component
function createBrain() {
    const brainGroup = new THREE.Group();
    
    // Main brain sphere
    const brainGeometry = new THREE.SphereGeometry(2, 32, 32);
    const brainMaterial = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        emissive: 0xff00ff,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8
    });
    const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
    
    // Neural network lines
    const neuralLines = createNeuralNetwork();
    
    // Rotating rings
    const ringGeometry = new THREE.TorusGeometry(2.5, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.6
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.x = Math.PI / 2;
    
    brainGroup.add(brainMesh, neuralLines, ring1, ring2);
    brainGroup.position.set(positions.brain.x, positions.brain.y, positions.brain.z);
    
    scene.add(brainGroup);
    brain = brainGroup;
}

// Create Neural Network
function createNeuralNetwork() {
    const group = new THREE.Group();
    const points = [];
    
    for (let i = 0; i < 50; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 1.5;
        
        points.push(new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });
    
    const neurons = new THREE.Points(geometry, material);
    group.add(neurons);
    
    return group;
}

// Create Tongue Component
function createTongue() {
    const tongueGroup = new THREE.Group();
    
    // Tongue shape using bezier curve
    const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -1, 0.5)
    );
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.8, 8, false);
    const tongueMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b6b,
        emissive: 0xff0000,
        emissiveIntensity: 0.2,
        shininess: 50
    });
    const tongue = new THREE.Mesh(tubeGeometry, tongueMaterial);
    
    // Sound wave rings
    for (let i = 0; i < 3; i++) {
        const waveGeometry = new THREE.TorusGeometry(1 + i * 0.5, 0.05, 16, 100);
        const waveMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.4 - i * 0.1
        });
        const wave = new THREE.Mesh(waveGeometry, waveMaterial);
        wave.position.y = -1;
        wave.rotation.x = Math.PI / 2;
        wave.userData.offset = i * 0.3;
        tongueGroup.add(wave);
    }
    
    tongueGroup.add(tongue);
    tongueGroup.position.set(positions.tongue.x, positions.tongue.y, positions.tongue.z);
    
    scene.add(tongueGroup);
    this.tongue = tongueGroup;
}

// Create Knowledge Core Component
function createKnowledgeCore() {
    const coreGroup = new THREE.Group();
    
    // Central core
    const coreGeometry = new THREE.OctahedronGeometry(2, 0);
    const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    
    // Orbiting data nodes
    for (let i = 0; i < 8; i++) {
        const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const nodeMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            emissive: 0x00ff88,
            emissiveIntensity: 0.5
        });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        
        const angle = (i / 8) * Math.PI * 2;
        node.position.set(
            Math.cos(angle) * 3,
            Math.sin(angle * 2) * 0.5,
            Math.sin(angle) * 3
        );
        node.userData.angle = angle;
        node.userData.orbitSpeed = 0.01 + Math.random() * 0.01;
        
        coreGroup.add(node);
    }
    
    // Wireframe cube
    const wireframeGeometry = new THREE.BoxGeometry(5, 5, 5);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    
    coreGroup.add(core, wireframe);
    coreGroup.position.set(positions.core.x, positions.core.y, positions.core.z);
    
    scene.add(coreGroup);
    knowledgeCore = coreGroup;
}

// Create Connections between components
function createConnections() {
    const connectionPairs = [
        ['eyes', 'brain'],
        ['brain', 'core'],
        ['core', 'tongue'],
        ['tongue', 'eyes'],
        ['eyes', 'core'],
        ['brain', 'tongue']
    ];
    
    connectionPairs.forEach(pair => {
        const start = positions[pair[0]];
        const end = positions[pair[1]];
        
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(start.x, start.y, start.z),
            new THREE.Vector3(
                (start.x + end.x) / 2,
                (start.y + end.y) / 2 + 2,
                (start.z + end.z) / 2
            ),
            new THREE.Vector3(end.x, end.y, end.z)
        );
        
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.3
        });
        
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        connections.push({ line, curve, pair });
        
        // Create particles for this connection
        createDataFlowParticles(curve, pair);
    });
}

// Create data flow particles
function createDataFlowParticles(curve, pair) {
    const particleCount = 10;
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(geometry, material.clone());
        particle.userData.curve = curve;
        particle.userData.progress = i / particleCount;
        particle.userData.speed = 0.005 + Math.random() * 0.005;
        particle.userData.pair = pair;
        
        const point = curve.getPoint(particle.userData.progress);
        particle.position.copy(point);
        
        scene.add(particle);
        dataFlowParticles.push(particle);
    }
}

// Create ambient particles
function createAmbientParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 1000; i++) {
        vertices.push(
            Math.random() * 40 - 20,
            Math.random() * 40 - 20,
            Math.random() * 40 - 20
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Rotate components
    if (eyes) {
        eyes.rotation.y = Math.sin(time * 0.5) * 0.2;
        eyes.children.forEach((child, i) => {
            if (i >= 2) { // Pupils
                child.position.z = 1 + Math.sin(time * 2) * 0.1;
            }
        });
    }
    
    if (brain) {
        brain.rotation.y += 0.005;
        brain.children[2].rotation.x += 0.01; // Ring 1
        brain.children[3].rotation.y += 0.015; // Ring 2
    }
    
    if (tongue) {
        tongue.rotation.z = Math.sin(time) * 0.1;
        tongue.children.forEach((child, i) => {
            if (child.geometry.type === 'TorusGeometry') {
                const scale = 1 + Math.sin(time * 2 + child.userData.offset) * 0.2;
                child.scale.set(scale, scale, 1);
                child.material.opacity = 0.4 - (scale - 1) * 0.5;
            }
        });
    }
    
    if (knowledgeCore) {
        knowledgeCore.rotation.y += 0.01;
        knowledgeCore.rotation.x = Math.sin(time * 0.5) * 0.2;
        
        // Orbit data nodes
        knowledgeCore.children.forEach((child, i) => {
            if (child.geometry.type === 'SphereGeometry' && child.userData.angle !== undefined) {
                child.userData.angle += child.userData.orbitSpeed;
                const radius = 3;
                child.position.set(
                    Math.cos(child.userData.angle) * radius,
                    Math.sin(child.userData.angle * 2) * 0.5,
                    Math.sin(child.userData.angle) * radius
                );
            }
        });
    }
    
    // Animate data flow particles
    if (dataFlowActive) {
        dataFlowParticles.forEach(particle => {
            particle.userData.progress += particle.userData.speed;
            if (particle.userData.progress > 1) {
                particle.userData.progress = 0;
            }
            
            const point = particle.userData.curve.getPoint(particle.userData.progress);
            particle.position.copy(point);
            
            // Pulsate
            const scale = 1 + Math.sin(particle.userData.progress * Math.PI * 4) * 0.5;
            particle.scale.set(scale, scale, scale);
            
            // Color change
            const hue = (particle.userData.progress + time * 0.1) % 1;
            particle.material.color.setHSL(hue, 1, 0.5);
        });
    }
    
    controls.update();
    renderer.render(scene, camera);
}

// Window resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Toggle data flow
function toggleDataFlow() {
    dataFlowActive = !dataFlowActive;
    dataFlowParticles.forEach(particle => {
        particle.visible = dataFlowActive;
    });
}

// Focus on specific component
function focusComponent(componentName) {
    const pos = positions[componentName];
    const targetPosition = new THREE.Vector3(pos.x, pos.y, pos.z + 10);
    
    controls.autoRotate = false;
    
    // Smooth camera transition
    const startPosition = camera.position.clone();
    const startTime = Date.now();
    const duration = 1500;
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        
        camera.position.lerpVectors(startPosition, targetPosition, eased);
        controls.target.lerp(new THREE.Vector3(pos.x, pos.y, pos.z), eased);
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        } else {
            setTimeout(() => {
                controls.autoRotate = true;
            }, 2000);
        }
    }
    
    animateCamera();
}

// Easing function
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Initialize on load
window.addEventListener('load', init);