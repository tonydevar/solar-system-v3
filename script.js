const planets = [
    {
        name: "Mercury",
        mass: "3.30 x 10<sup>23</sup> kg",
        gravity: "3.7 m/s²",
        day: "1,408 hours",
        description: "The smallest planet in our solar system and the closest to the Sun. It experiences extreme temperature swings.",
        color: "#A5A5A5",
        accent: "#E5E5E5"
    },
    {
        name: "Venus",
        mass: "4.87 x 10<sup>24</sup> kg",
        gravity: "8.9 m/s²",
        day: "5,832 hours",
        description: "Spinning slowly in the opposite direction from most planets, Venus is the hottest planet in our solar system.",
        color: "#E3BB76",
        accent: "#FFDDA5"
    },
    {
        name: "Earth",
        mass: "5.97 x 10<sup>24</sup> kg",
        gravity: "9.8 m/s²",
        day: "24 hours",
        description: "Our home planet is the only place we know of so far that’s inhabited by living things.",
        color: "#2271B3",
        accent: "#6DB5FF"
    },
    {
        name: "Mars",
        mass: "6.42 x 10<sup>23</sup> kg",
        gravity: "3.7 m/s²",
        day: "24.7 hours",
        description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence of water in its past.",
        color: "#E27B58",
        accent: "#FFB08E"
    },
    {
        name: "Jupiter",
        mass: "1.89 x 10<sup>27</sup> kg",
        gravity: "23.1 m/s²",
        day: "9.9 hours",
        description: "Jupiter is more than twice as massive than the other planets of our solar system combined.",
        color: "#D39C7E",
        accent: "#FFE0C5"
    },
    {
        name: "Saturn",
        mass: "5.68 x 10<sup>26</sup> kg",
        gravity: "9.0 m/s²",
        day: "10.7 hours",
        description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system.",
        color: "#C5AB6E",
        accent: "#FFF0A5"
    },
    {
        name: "Uranus",
        mass: "8.68 x 10<sup>25</sup> kg",
        gravity: "8.7 m/s²",
        day: "17.2 hours",
        description: "Uranus is an ice giant. It rotates on its side, making it unique among the planets.",
        color: "#B5E3E3",
        accent: "#E5FFFF"
    },
    {
        name: "Neptune",
        mass: "1.02 x 10<sup>26</sup> kg",
        gravity: "11.0 m/s²",
        day: "16.1 hours",
        description: "Neptune is dark, cold and whipped by supersonic winds. It's the most distant major planet.",
        color: "#4B70DD",
        accent: "#8EA9FF"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const stardustContainer = document.getElementById('stardust-container');
    
    let currentIndex = 2; // Start with Earth

    // Create Stardust
    function createStardust() {
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${2 + Math.random() * 5}s`);
            star.style.opacity = Math.random();
            stardustContainer.appendChild(star);
        }
    }

    // Initialize Carousel Cards
    function initCarousel() {
        planets.forEach((planet, index) => {
            const li = document.createElement('li');
            li.className = `planet-card ${index === currentIndex ? 'active' : ''}`;
            li.dataset.index = index;
            li.innerHTML = `
                <div class="planet-sphere" style="background: radial-gradient(circle at 30% 30%, ${planet.accent}, ${planet.color})"></div>
                <span>${planet.name}</span>
            `;
            li.addEventListener('click', () => updateActivePlanet(index));
            track.appendChild(li);
        });
        updateDisplay();
    }

    function updateDisplay() {
        const planet = planets[currentIndex];
        
        // Update Info with a small fade animation
        const info = document.getElementById('planet-info');
        info.style.opacity = 0;
        
        setTimeout(() => {
            document.getElementById('planet-name').textContent = planet.name;
            document.getElementById('planet-name').style.setProperty('--planet-color', planet.color);
            document.getElementById('stat-mass').innerHTML = planet.mass;
            document.getElementById('stat-gravity').textContent = planet.gravity;
            document.getElementById('stat-day').textContent = planet.day;
            document.getElementById('planet-description').textContent = planet.description;
            
            document.documentElement.style.setProperty('--accent-color', planet.accent);
            
            info.style.opacity = 1;
        }, 300);

        // Update Carousel Position
        const cardWidth = 140; // 120 + 20 gap
        const offset = -currentIndex * cardWidth + (track.parentElement.offsetWidth / 2 - cardWidth / 2);
        track.style.transform = `translateX(${offset}px)`;

        // Update Active Class
        document.querySelectorAll('.planet-card').forEach((card, idx) => {
            card.classList.toggle('active', idx === currentIndex);
        });
    }

    function updateActivePlanet(index) {
        currentIndex = index;
        updateDisplay();
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : planets.length - 1;
        updateDisplay();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < planets.length - 1) ? currentIndex + 1 : 0;
        updateDisplay();
    });

    createStardust();
    initCarousel();

    // Handle Resize for Carousel Centering
    window.addEventListener('resize', updateDisplay);
});
