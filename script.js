document.addEventListener('DOMContentLoaded', () => {
    
   const canvas = document.getElementById('mapCanvas');
   const ctx = canvas.getContext('2d');
   const infoBox = document.getElementById('infoBox');
   const infoText = document.getElementById('infoText');

   // Set canvas size
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   // Create an array for dots
   const dots = [];
   const numDots = 500;

   // Generate random dots
   for (let i = 0; i < numDots; i++) {
       dots.push({
           x: Math.random() * canvas.width,
           y: Math.random() * canvas.height,
           targetX: Math.random() * canvas.width,
           targetY: Math.random() * canvas.height
       });
   }

   // Animation loop
   function animate() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);

       // Draw and move dots
       dots.forEach(dot => {
           dot.x += (dot.targetX - dot.x) * 0.05; // Smooth movement towards target
           dot.y += (dot.targetY - dot.y) * 0.05;

           ctx.beginPath();
           ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
           ctx.fillStyle = '#ffffff'; // White color for dots
           ctx.fill();
       });

       requestAnimationFrame(animate);
   }

   animate();

   // GSAP ScrollTrigger for text sections
   gsap.utils.toArray('.text-section').forEach((section) => {
       ScrollTrigger.create({
           trigger: section,
           start: "top center",
           end: "bottom center",
           onEnter() {
               gsap.to(section.querySelector('.text-box'), { opacity: 1, y: -20 });
           },
           onLeaveBack() {
               gsap.to(section.querySelector('.text-box'), { opacity: 0, y: 20 });
           }
       });
   });

   // Update info box with random fact every few seconds
   const facts = [
       "The Green Line is the oldest subway line in America.",
       "It serves over 200,000 riders on an average weekday.",
       "The Green Line has four branches serving different parts of Boston.",
       "It connects major educational institutions like Boston University.",
       "The Green Line Extension project added new stations in recent years."
   ];

   function updateInfoBox() {
       const randomFact = facts[Math.floor(Math.random() * facts.length)];
       infoText.textContent = randomFact;
   }

   updateInfoBox();
   setInterval(updateInfoBox, 5000);
});
