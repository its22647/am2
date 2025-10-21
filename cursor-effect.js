// --- Heart Cursor Trail Effect ---
document.addEventListener('mousemove', (e) => {
    // Only apply the effect on non-touch devices (better performance)
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        return;
    }

    const heart = document.createElement('span');
    heart.classList.add('heart-cursor');
    heart.innerHTML = '💖'; // The heart emoji
    document.body.appendChild(heart);

    // Initial position
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    heart.style.opacity = '1';
    
    // Animation properties
    const size = Math.random() * 15 + 10; // Random size between 10px and 25px
    heart.style.fontSize = `${size}px`;

    // Fly-up and fade-out effect
    const duration = Math.random() * 1.5 + 1.5; // 1.5s to 3s duration
    const distance = Math.random() * 100 + 50; // 50px to 150px distance

    heart.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-in`;
    
    // Animate the heart to fly up and fade out
    setTimeout(() => {
        heart.style.transform = `translate(-50%, -${distance}px)`;
        heart.style.opacity = '0';
    }, 10);

    // Remove the heart element after animation finishes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
});