// --- Three.js 3D Deep Love Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('love-scene').appendChild(renderer.domElement);

// Screen resize handler (Zaroori for screen fix)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

scene.fog = new THREE.FogExp2(0x1a1a1a, 0.05);
const spotLight = new THREE.SpotLight(0xffffff, 50, 100, Math.PI / 4, 0.5, 2);
spotLight.position.set(0, 0, 10);
scene.add(spotLight);

// Creating the "Pulsating Heart Energy" (Maroon particles)
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

// Animation Loop: Smooth Heartbeat Motion
function animate() {
    requestAnimationFrame(animate);

    loveOrb.rotation.x += 0.0005;
    loveOrb.rotation.y += 0.001;

    // Heart-like pulsating effect
    scaleFactor += scaleDirection;
    if (scaleFactor > 1.05 || scaleFactor < 0.95) {
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
const buttonContainer = document.querySelector('.button-container');
const yesButton = document.getElementById('yes-btn');
const funnyButton = document.getElementById('funny-btn');

// --- STEP 1: Reveal Proposal Message (After Initial Click) ---
surpriseButton.addEventListener('click', () => {
    
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

        // Final Message setup
        finalMessage.textContent = "Minahil Sahiba, I knew the moment I saw you: you are my only *forever*. Will you take this step with me? ❤️💍";
        finalMessage.style.transition = 'opacity 3s ease 0.5s'; 
        finalMessage.style.opacity = '1';
        finalMessage.style.fontSize = '2.5em'; 
        finalMessage.style.color = '#ff0000'; 
        
        // Button container show
        buttonContainer.style.display = 'flex';
        buttonContainer.style.animation = 'fadeIn 1s ease-out';
        
    }, 500);
});

// --- STEP 2: Celebrate on the Same Screen (After Yes/Funny Click) ---
const celebrateInPlace = () => {
    
    // Buttons ko disable
    yesButton.disabled = true;
    funnyButton.disabled = true;
    
    // Smooth transition
    finalMessage.style.opacity = '0';
    buttonContainer.style.opacity = '0';

    setTimeout(() => {
        // Content ko change aur center karo
        buttonContainer.style.display = 'none';
        finalMessage.style.display = 'none'; 
        
        // Final Celebration Message
        heading.textContent = "Aamir & Minahil Sahiba!";
        heading.style.fontSize = '6em'; 
        heading.style.transition = 'opacity 2s ease, font-size 1s ease';
        heading.style.opacity = '1'; // Show the names

        // New celebratory message
        const finalCongrats = document.createElement('p');
        finalCongrats.innerHTML = "Aapka naya safar mubarak ho! Forever starts now. 🥂💍";
        finalCongrats.style.fontSize = '2em';
        finalCongrats.style.marginTop = '20px';
        finalCongrats.style.color = '#fff';
        finalCongrats.style.opacity = '0';
        document.querySelector('.love-message').appendChild(finalCongrats);
        
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