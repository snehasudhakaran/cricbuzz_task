window.onload = function () {
    let carouselContainer = document.querySelector('.carousel');

    // Data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                const slideItem = document.createElement('div');
                slideItem.classList.add('carousel-item');

                // Inner container for three items
                const innerContainer = document.createElement('div');
                innerContainer.classList.add('slide-image');

                //  Three containers within the inner container
                for (let i = 0; i < 3; i++) {
                    const container = document.createElement('div');
                    container.classList.add('container-item');

                    // Used the same item for each container for demonstration
                    container.innerHTML = `
                        <h3>${item.heading}</h3>
                        <p>${item.description}</p>
                    `;

                    innerContainer.appendChild(container);
                }

                slideItem.appendChild(innerContainer);
                carouselContainer.appendChild(slideItem);
            });

            // Initialized first active slide
            addActive(carouselContainer.firstElementChild);

            // Slide transition logic
            setInterval(function () {
                const slides = document.getElementsByClassName('carousel-item');
                for (let i = 0; i < slides.length; i++) {
                    if (i + 1 == slides.length) {
                        addActive(slides[0]);
                        setTimeout(removeActive, 350, slides[i]);
                        break;
                    }
                    if (slides[i].classList.contains('active')) {
                        setTimeout(removeActive, 350, slides[i]);
                        addActive(slides[i + 1]);
                        break;
                    }
                }
            }, 1500);
        });

    function addActive(slide) {
        slide.classList.add('active');
    }

    function removeActive(slide) {
        slide.classList.remove('active');
    }
};
