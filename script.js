// Initialize scrollama
const scroller = scrollama();

// Generic window resize listener event
function handleResize() {
    scroller.resize();
}

// Scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }
    console.log(response);
    // Add your update logic here
    response.element.classList.add('is-active');

    // Update visualization based on step
    updateVisualization(response.index);
}

function handleStepExit(response) {
    // response = { element, direction, index }
    console.log(response);
    response.element.classList.remove('is-active');
}

function setupStickyfill() {
    d3.selectAll('.sticky').each(function() {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();

    // Set up visualization
    setupVisualization();

    // 1. Setup the scroller passing options
    // This will also initialize trigger observations
    // 2. Bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: '#scrolly article .step',
            offset: 0.5,
            debug: false,
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    // 3. Setup resize event
    window.addEventListener('resize', handleResize);
}

// Visualization functions
function setupVisualization() {
    // Set up your main visualization here
    console.log('Setting up visualization');
}

function updateVisualization(index) {
    // Update your visualization based on the current step
    console.log('Updating visualization for step', index);
}

// Kick things off
init();
