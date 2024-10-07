document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('manual-carousel');
    let currentSlide = 0;
    const containersPerSlide = 3;
    let data= [];
    
    const fetchData = async () => {
        try {
          const res1 = await fetch('new1.json');
          const data1 = await res1.json();
          const res2 = await fetch('new2.json');
          const data2 = await res2.json();
          const res3 = await fetch('new3.json');
          const data3 = await res3.json();
    
          data = [...data1, ...data2, ...data3];
          createContainers();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      const truncateText = (text, maxWords) => {
        return text.split(' ').slice(0, maxWords).join(' ') + (text.split(' ').length > maxWords ? '...' : '');
      };
    // Create all the containers based on the data
    const createContainers = () => {
      data.forEach((item, index) => {
        const container = document.createElement('div');
        container.classList.add('manual-carousel-slide');
        container.innerHTML = `
          <div class="card">
            <img src="${item.image}" alt="${item.headline}">
            <div class="card-items">
            <h3>${truncateText(item.headline, 10)}</h3>
            <p>${truncateText(item.intro, 15)}</p>
            </div>
          </div>
        `;
        carousel.appendChild(container);
      });
      updateCarousel();
    };
  
    // Update the carousel's position
    const updateCarousel = () => {
      const moveAmount = -currentSlide * 100; // Each slide is 100% of the view
      carousel.style.transform = `translateX(${moveAmount}%)`;
    };
  
    // Move to next slide
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % (Math.ceil(data.length / containersPerSlide));
      updateCarousel();
    };
  
    // Move to previous slide
    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + Math.ceil(data.length / containersPerSlide)) % (Math.ceil(data.length / containersPerSlide));
      updateCarousel();
    };
  
    // Event listeners for next and previous buttons
    document.getElementById('next').addEventListener('click', nextSlide);
    document.getElementById('prev').addEventListener('click', prevSlide);
  
    // Create the containers and set up the carousel
    createContainers();

    fetchData();
  });
  