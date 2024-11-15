// Initialize Scrollama
const scroller = scrollama();

// Handle step enter
function handleStepEnter(response) {
  // Update active class
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  response.element.classList.add('active');

  // Trigger animations or updates based on step
  const step = response.element.getAttribute('data-step');
  if (step === '2') {
    drawChart();
  } else if (step === '3') {
    initMap();
  }
}

// Initialize chart (D3.js)
function drawChart() {
  const data = [30, 70, 50, 80, 100];
  const svg = d3.select('#chart').append('svg')
    .attr('width', 500)
    .attr('height', 400);
  
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 100)
    .attr('y', d => 400 - d * 4)
    .attr('width', 80)
    .attr('height', d => d * 4)
    .attr('fill', 'steelblue');
}

// Initialize map (Leaflet.js)
function initMap() {
  const map = L.map('map').setView([42.3601, -71.0589], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

// Initialize Scrollama and setup event listeners
function init() {
  scroller.setup({
    step: '.step',
    offset: 0.5,
    debug: false,
  })
  .onStepEnter(handleStepEnter);

  window.addEventListener('resize', scroller.resize);
}

init();
