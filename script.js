document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mapCanvas');
    const ctx = canvas.getContext('2d');
    const infoBox = document.getElementById('infoBox');
    const infoText = document.getElementById('infoText');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Green Line route coordinates (simplified)
    const route = [
        {x: 0.1, y: 0.5},
        {x: 0.3, y: 0.5},
        {x: 0.5, y: 0.5},
        {x: 0.7, y: 0.4},
        {x: 0.9, y: 0.3}
    ];

    // Stations
    const stations = [
        {x: 0.1, y: 0.5, name: "Lechmere"},
        {x: 0.3, y: 0.5, name: "Government Center"},
        {x: 0.5, y: 0.5, name: "Park Street"},
        {x: 0.7, y: 0.4, name: "Kenmore"},
        {x: 0.9, y: 0.3, name: "Boston College"}
    ];

    // Dot properties
    const dots = [];
    const numDots = 500;
    const dotSize = 3;

    // Create dots
    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: 0,
            targetY: 0,
            vx: 0,
            vy: 0
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw and move dots
        dots.forEach(dot => {
            dot.x += (dot.targetX - dot.x) * 0.05;
            dot.y += (dot.targetY - dot.y) * 0.05;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = '#00843D';
            ctx.fill();
        });

        // Draw route
        ctx.beginPath();
        ctx.moveTo(route[0].x * canvas.width, route[0].y * canvas.height);
        for (let i = 1; i < route.length; i++) {
            ctx.lineTo(route[i].x * canvas.width, route[i].y * canvas.height);
        }
        ctx.strokeStyle = '#00843D';
        ctx.lineWidth = 5;
        ctx.stroke();

        // Draw stations
        stations.forEach(station => {
            ctx.beginPath();
            ctx.arc(station.x * canvas.width, station.y * canvas.height, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = '#00843D';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = '#333';
            ctx.font = '14px Roboto';
            ctx.textAlign = 'center';
            ctx.fillText(station.name, station.x * canvas.width, (station.y * canvas.height) + 20);
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate dots to form the route
    ScrollTrigger.create({
        trigger: ".visualization",
        start: "top center",
        onEnter: () => {
            dots.forEach((dot, index) => {
                const routePoint = route[index % route.length];
                dot.targetX = routePoint.x * canvas.width + (Math.random() - 0.5) * 50;
                dot.targetY = routePoint.y * canvas.height + (Math.random() - 0.5) * 50;
            });
        }
    });

    // Animate text sections
    gsap.utils.toArray('.text-section').forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
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

    // Green Line facts
    const facts = [
        "The Green Line is the oldest subway line in America, opening in 1897.",
        "It serves over 200,000 riders on an average weekday.",
        "The Green Line has 4 branches: B, C, D, and E.",
        "It connects major educational institutions like Boston University and Northeastern University.",
        "The Green Line Extension project added 4.7 miles of track and 7 new stations in 2022."
    ];

    // Update info box with random fact every 5 seconds
    function updateInfoBox() {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        infoText.textContent = randomFact;
    }

    updateInfoBox();
    setInterval(updateInfoBox, 5000);
});
