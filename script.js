// --- Three.js 3D Deep Love Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('love-scene').appendChild(renderer.domElement);

// Screen resize handler 
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

scene.fog = new THREE.FogExp2(0x1a1a1a, 0.05);
const spotLight = new THREE.SpotLight(0xffffff, 50, 100, Math.PI / 4, 0.5, 2);
spotLight.position.set(0, 0, 10);
scene.add(spotLight);

// Creating the "Pulsating Heart Energy" 
const particleCount = 2000;
const radius = 5;
const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];
const color = new THREE.Color(0x800000);

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 2 * radius;
    const y = (Math.random() - 0.5) * 2 * radius;
    const z = (Math.random() - 0.5) * 2 * radius;

    if (x * x + y * y + z * z < radius * radius) {
        positions.push(x, y, z);
        color.set(0x800000); 
        color.offsetHSL(0.01 * Math.random(), -0.1 * Math.random(), 0.1 * Math.random());
        colors.push(color.r, color.g, color.b);
    }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.9
});

const loveOrb = new THREE.Points(geometry, material);
scene.add(loveOrb);

camera.position.z = 8;
let scaleFactor = 1.0; 
let scaleDirection = 0.0015;

// Animation variables for dynamic change
let rotationSpeed = 0.001; 
let pulseMagnitude = 0.05; 

// Animation Loop: Smooth Heartbeat Motion
function animate() {
    requestAnimationFrame(animate);

    loveOrb.rotation.x += rotationSpeed / 2;
    loveOrb.rotation.y += rotationSpeed;

    // Heart-like pulsating effect
    scaleFactor += scaleDirection;
    if (scaleFactor > 1 + pulseMagnitude || scaleFactor < 1 - pulseMagnitude) {
        scaleDirection = -scaleDirection; 
    }
    loveOrb.scale.set(scaleFactor, scaleFactor, scaleFactor);

    renderer.render(scene, camera);
}
animate();

// --- JavaScript Interactivity: Proposal Logic ---
const surpriseButton = document.getElementById('surprise-btn');
const initialMessage = document.getElementById('initial-msg');
const finalMessage = document.getElementById('final-msg');
const heading = document.getElementById('names');
const loveMessageContainer = document.querySelector('.love-message');
const buttonContainer = document.querySelector('.button-container');
const yesButton = document.getElementById('yes-btn');
const funnyButton = document.getElementById('funny-btn');

// Ensure heading is hidden initially (visually and functionally)
heading.style.visibility = 'hidden'; 

// --- STEP 1: Reveal Proposal Message (Initial Click) ---
surpriseButton.addEventListener('click', () => {
    
    surpriseButton.disabled = true; 
    
    // 1. Initial content fade out
    surpriseButton.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    initialMessage.style.transition = 'opacity 0.5s ease';
    
    surpriseButton.style.opacity = '0';
    surpriseButton.style.transform = 'translateY(20px)';
    initialMessage.style.opacity = '0';

    // 2. Reveal the Proposal Text and Choices
    setTimeout(() => {
        surpriseButton.style.display = 'none'; 
        initialMessage.style.display = 'none'; 

        // Final Message setup (Text update)
        // --- LINE BREAK FIX APPLIED HERE ---
        finalMessage.innerHTML = "I knew the moment I saw you: you are my only FOREVER.<br>MinahiI Sahiba I Like You! Can we be us, forvever? ❤️💍";
        finalMessage.style.fontSize = '2.5em'; 
        finalMessage.style.color = '#ff0000'; 
        
        // Final Message reveal
        finalMessage.style.transition = 'opacity 3s ease 0.5s'; 
        finalMessage.style.opacity = '1';

        // Button container show
        buttonContainer.style.display = 'flex';
        buttonContainer.style.opacity = '0';
        setTimeout(() => {
             buttonContainer.style.transition = 'opacity 1s ease';
             buttonContainer.style.opacity = '1';
        }, 800);
        
    }, 500);
});

// --- STEP 2: Celebrate on the Same Screen (After Yes/Funny Click) ---
const celebrateInPlace = () => {
    
    // 1. Disable buttons and fade out proposal content
    yesButton.disabled = true;
    funnyButton.disabled = true;
    finalMessage.style.opacity = '0';
    buttonContainer.style.opacity = '0';
    
    // Increase 3D animation for celebration!
    rotationSpeed = 0.005; // 5x faster
    pulseMagnitude = 0.15; // 3x bigger pulse
    material.size = 0.1; // Bigger particles
    
    setTimeout(() => {
        // Hide elements
        buttonContainer.style.display = 'none';
        finalMessage.style.display = 'none'; 
        
        // Final Celebration Heading: Names
        heading.textContent = "Aamir & Minahil Sahiba";
        heading.style.fontSize = '4em'; 
        heading.style.transition = 'opacity 2s ease, font-size 1s ease';

        // ALIGNMENT FIX REVERSE
        heading.style.visibility = 'visible'; 
        heading.style.opacity = '1'; 
        
        heading.classList.add('celebration-text'); // Apply glow animation

        // New celebratory message
        const finalCongrats = document.createElement('p');
        finalCongrats.innerHTML = `
            <span class="heart-emoji">💖</span> Absolutely loved this moment. Congrats, sweetheart! 
            <br> Forever starts now. <span class="heart-emoji">🥂💍</span>
        `;
        finalCongrats.style.fontSize = '2.5em';
        finalCongrats.style.marginTop = '20px';
        finalCongrats.style.color = 'white';
        finalCongrats.style.opacity = '0';
        // Check and remove old p tag (if any), then append new one
        if (loveMessageContainer.querySelector('#final-congrats')) {
             loveMessageContainer.removeChild(loveMessageContainer.querySelector('#final-congrats'));
        }
        finalCongrats.id = 'final-congrats';
        loveMessageContainer.appendChild(finalCongrats);
        
        // Smoothly fade in congrats message
        setTimeout(() => {
            finalCongrats.style.transition = 'opacity 2s ease';
            finalCongrats.style.opacity = '1';
        }, 100);

    }, 500);
};

// Event Listeners for both final answer buttons
yesButton.addEventListener('click', celebrateInPlace);
funnyButton.addEventListener('click', celebrateInPlace);