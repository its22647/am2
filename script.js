// --- Three.js 3D Deep Love Scene Setup (UNCHANGED) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('love-scene').appendChild(renderer.domElement);

// Screen resize handler (UNCHANGED)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

scene.fog = new THREE.FogExp2(0x1a1a1a, 0.05);
const spotLight = new THREE.SpotLight(0xffffff, 50, 100, Math.PI / 4, 0.5, 2);
spotLight.position.set(0, 0, 10);
scene.add(spotLight);

// Creating the "Pulsating Heart Energy" (UNCHANGED)
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

// Animation variables for dynamic change (UNCHANGED)
let rotationSpeed = 0.001; 
let pulseMagnitude = 0.05; 

// Animation Loop: Smooth Heartbeat Motion (UNCHANGED)
function animate() {
    requestAnimationFrame(animate);

    loveOrb.rotation.x += rotationSpeed / 2;
    loveOrb.rotation.y += rotationSpeed;

    scaleFactor += scaleDirection;
    if (scaleFactor > 1 + pulseMagnitude || scaleFactor < 1 - pulseMagnitude) {
        scaleDirection = -scaleDirection; 
    }
    loveOrb.scale.set(scaleFactor, scaleFactor, scaleFactor);

    renderer.render(scene, camera);
}
animate();

// --- JavaScript Interactivity: Proposal Logic (UNCHANGED VARS) ---
const surpriseButton = document.getElementById('surprise-btn');
const initialMessage = document.getElementById('initial-msg');
const finalMessage = document.getElementById('final-msg');
const heading = document.getElementById('names'); // This is H2
const coupleNameBox = document.getElementById('couple-name-box'); // New Box
const loveMessageContainer = document.querySelector('.love-message');
const buttonContainer = document.querySelector('.button-container');
const yesButton = document.getElementById('yes-btn');
const funnyButton = document.getElementById('funny-btn');

heading.style.visibility = 'hidden'; 

// --- STEP 1: Reveal Proposal Message (Initial Click) ---
surpriseButton.addEventListener('click', () => {
    
    surpriseButton.disabled = true; 
    
    loveMessageContainer.style.transition = 'transform 0.5s ease-out, box-shadow 1s ease'; 
    loveMessageContainer.style.transform = 'scale(1.05) perspective(1000px) rotateX(5deg)'; 
    
    surpriseButton.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    initialMessage.style.transition = 'opacity 0.5s ease';
    
    surpriseButton.style.opacity = '0';
    surpriseButton.style.transform = 'translateY(20px)';
    initialMessage.style.opacity = '0';

    setTimeout(() => {
        loveMessageContainer.style.transform = 'scale(1) perspective(1000px) rotateX(5deg)'; 
        
        setTimeout(() => {
            surpriseButton.style.display = 'none'; 
            initialMessage.style.display = 'none'; 
            
            // 💖 UPDATED TEXT FOR PAGE 2 (Adjusted for better fit) 💖
            finalMessage.innerHTML = `
                <span style="font-size: 0.9em; display: block; margin-bottom: 15px; font-style: italic;">
                    From the moment I saw you, I felt something different.
                </span>
                <span style="font-size: 2.2em; font-weight: 900; color: #ff3333; display: block;">
                    MINAHIL SAHIBA
                </span>
                <span class="animated-like-you" style="font-size: 1.6em; margin-top: 10px;">
                    You truly inspire me, <br>and I admire you, a lot. 🌸
                </span>
                <span style="font-size: 1.4em; display: block; margin-top: 15px;">
                    Can we stay connected… as friends? 😊
                </span>
            `;
            finalMessage.style.color = 'white'; 
            
            finalMessage.style.transition = 'opacity 3s ease 0.5s'; 
            finalMessage.style.opacity = '1';

            buttonContainer.style.display = 'flex';
            buttonContainer.style.opacity = '0';
            setTimeout(() => {
                buttonContainer.style.transition = 'opacity 1s ease';
                buttonContainer.style.opacity = '1';
            }, 800);
            
        }, 500); 
    }, 250); 
});

// --- STEP 2: Celebrate on the Same Screen (After Yes/Funny Click) ---
const celebrateInPlace = () => {
    
    yesButton.disabled = true;
    funnyButton.disabled = true;
    finalMessage.style.opacity = '0';
    buttonContainer.style.opacity = '0';
    
    rotationSpeed = 0.005; 
    pulseMagnitude = 0.15; 
    material.size = 0.1; 
    
    const redColor = new THREE.Color(0xff0000);
    const colorsArray = geometry.attributes.color.array;
    for (let i = 0; i < colorsArray.length; i += 3) {
        colorsArray[i] = redColor.r;
        colorsArray[i + 1] = redColor.g;
        colorsArray[i + 2] = redColor.b;
    }
    geometry.attributes.color.needsUpdate = true; 
    
    
    setTimeout(() => {
        buttonContainer.style.display = 'none';
        finalMessage.style.display = 'none'; 
        
        coupleNameBox.style.display = 'block';
        
        // 💖 FINAL PAGE: Show "Aamir & Minahil Sahiba" (split for fit) 💖
        heading.innerHTML = "Aamir & <br> Minahil Sahiba";
        heading.style.fontSize = '4em'; 
        heading.style.transition = 'opacity 2s ease, font-size 1s ease';

        heading.style.visibility = 'visible'; 
        heading.style.opacity = '1'; 
        
        heading.classList.add('celebration-text'); 

        // 💖 UPDATED CONGRATS MESSAGE FOR PAGE 3 💖
        const finalCongrats = document.createElement('p');
        finalCongrats.innerHTML = `
            <span class="heart-emoji">💖</span> Grateful for this beautiful connection.
            <br> Some people just make life brighter. ✨
        `;
        finalCongrats.style.fontSize = '2em'; 
        finalCongrats.style.marginTop = '20px';
        finalCongrats.style.color = 'white';
        finalCongrats.style.opacity = '0';
        finalCongrats.id = 'final-congrats';
        loveMessageContainer.appendChild(finalCongrats);
        
        setTimeout(() => {
            finalCongrats.style.transition = 'opacity 2s ease';
            finalCongrats.style.opacity = '1';
        }, 100);

    }, 500);
};

// Event Listeners for both final answer buttons (UNCHANGED)
yesButton.addEventListener('click', celebrateInPlace);
funnyButton.addEventListener('click', celebrateInPlace);