// Function to add the visible class when an element is in view
function handleScroll() {
    const textBoxes = document.querySelectorAll('.text-box');

    textBoxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        const boxBottom = box.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Check if the box is in the viewport
        if (boxTop < windowHeight && boxBottom > 0) {
            box.classList.add('visible');
        } else {
            box.classList.remove('visible');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

