document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dotCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dot properties
    const dots = [];
    const numDots = 150;
    const dotSize = 3;
    const dotSpeed = 0.3;

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
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.text-section').forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                gsap.to(section.querySelector('.text-box'), {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                });
            },
            onLeaveBack: () => {
                gsap.to(section.querySelector('.text-box'), {
                    opacity: 0,
                    y: 50,
                    duration: 0.5
                });
            }
        });
    });
});
