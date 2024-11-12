document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.text-box');
    const canvas = document.getElementById('dotCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dot properties
    const dots = [];
    const numDots = 100;
    const dotSize = 5;
    const dotSpeed = 0.5;

    // Create dots
    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * dotSpeed,
            vy: (Math.random() - 0.5) * dotSpeed
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dots.forEach(dot => {
            // Move dot
            dot.x += dot.vx;
            dot.y += dot.vy;

            // Bounce off edges
            if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
            if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

            // Draw dot
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Scroll event listener
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        boxes.forEach(box => {
            const boxTop = box.offsetTop;
            const boxHeight = box.offsetHeight;

            if (scrollPosition > boxTop - window.innerHeight / 2 &&
                scrollPosition < boxTop + boxHeight - window.innerHeight / 2) {
                box.style.opacity = '1';
            } else {
                box.style.opacity = '0';
            }
        });
    });
});
