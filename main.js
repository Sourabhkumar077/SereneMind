// Initialize Three.js scene for brain model
let scene, camera, renderer, brain;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE2D4F0);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('brain-container').appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create brain geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x4A4E69,
        transparent: true,
        opacity: 0.9,
        shininess: 100,
        specular: 0xffffff
    });
    
    brain = new THREE.Mesh(geometry, material);
    scene.add(brain);
    
    // Add floating particles
    createParticles();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const particles = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    
    for (let i = 0; i < particles * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Gentle rotation of brain
    if (brain) {
        brain.rotation.x += 0.001;
        brain.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

// Initialize GSAP animations
function initAnimations() {
    // Scroll animations for sections
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Animate therapist cards
    gsap.utils.toArray('.therapist-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Animate quiz questions
    gsap.utils.toArray('.quiz-question').forEach((question, i) => {
        gsap.from(question, {
            scrollTrigger: {
                trigger: question,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: i * 0.1
        });
    });
}

// Initialize service cards
function initServiceCards() {
    const services = [
        {
            title: 'Video Therapy',
            icon: 'fa-video',
            description: 'Face-to-face sessions with licensed therapists from the comfort of your home.'
        },
        {
            title: 'Chat Therapy',
            icon: 'fa-comments',
            description: 'Text-based therapy for when you need support throughout your day.'
        },
        {
            title: 'CBT Program',
            icon: 'fa-brain',
            description: 'Structured cognitive behavioral therapy to help change thought patterns.'
        },
        {
            title: 'Meditation',
            icon: 'fa-spa',
            description: 'Guided meditation sessions to reduce stress and improve mindfulness.'
        }
    ];
    
    const container = document.querySelector('#services .grid');
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card glass p-8 rounded-3xl flex flex-col items-center text-center';
        
        card.innerHTML = `
            <div class="text-4xl mb-4 text-sky">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">${service.title}</h3>
            <p class="text-gray-600">${service.description}</p>
        `;
        
        container.appendChild(card);
    });
}

// Initialize therapist carousel
function initTherapistCarousel() {
    const therapists = [
        {
            name: 'Dr. Sarah Johnson',
            specialty: 'Anxiety & Depression',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            name: 'Dr. Michael Chen',
            specialty: 'CBT Specialist',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            name: 'Dr. Emily Wilson',
            specialty: 'Trauma Therapy',
            image: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        {
            name: 'Dr. James Rodriguez',
            specialty: 'Mindfulness',
            image: 'https://randomuser.me/api/portraits/men/75.jpg'
        }
    ];
    
    const container = document.querySelector('#therapists .relative');
    
    const carousel = document.createElement('div');
    carousel.className = 'flex overflow-x-auto pb-8 space-x-6 px-2';
    carousel.style.scrollSnapType = 'x mandatory';
    
    therapists.forEach(therapist => {
        const card = document.createElement('div');
        card.className = 'therapist-card flex-shrink-0 glass p-6 rounded-3xl w-64 text-center';
        card.style.scrollSnapAlign = 'center';
        
        card.innerHTML = `
            <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white">
                <img src="${therapist.image}" alt="${therapist.name}" class="w-full h-full object-cover">
            </div>
            <h3 class="font-bold text-lg">${therapist.name}</h3>
            <p class="text-sm text-gray-600">${therapist.specialty}</p>
            <button class="mt-4 bg-sky text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-90 transition">
                View Profile
            </button>
        `;
        
        carousel.appendChild(card);
    });
    
    container.appendChild(carousel);
}

// Initialize mental health assessment quiz
function initQuiz() {
    const questions = [
        {
            question: 'Little interest or pleasure in doing things?',
            options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        },
        {
            question: 'Feeling down, depressed, or hopeless?',
            options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        },
        {
            question: 'Trouble falling or staying asleep, or sleeping too much?',
            options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
        }
    ];
    
    const container = document.querySelector('#quiz .bg-white');
    
    const quizForm = document.createElement('form');
    quizForm.className = 'space-y-8';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = `quiz-question ${index === 0 ? 'active' : ''}`;
        
        const questionTitle = document.createElement('h3');
        questionTitle.className = 'text-xl font-bold mb-4';
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'space-y-2';
        
        q.options.forEach((option, i) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'flex items-center';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `q${index}-o${i}`;
            input.name = `question${index}`;
            input.value = i;
            input.className = 'mr-2';
            
            const label = document.createElement('label');
            label.htmlFor = `q${index}-o${i}`;
            label.textContent = option;
            
            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(optionsDiv);
        quizForm.appendChild(questionDiv);
    });
    
    const navButtons = document.createElement('div');
    navButtons.className = 'flex justify-between mt-8';
    
    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition';
    prevButton.textContent = 'Previous';
    
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'bg-sky text-white px-4 py-2 rounded hover:bg-opacity-90 transition';
    nextButton.textContent = 'Next';
    
    navButtons.appendChild(prevButton);
    navButtons.appendChild(nextButton);
    quizForm.appendChild(navButtons);
    
    container.appendChild(quizForm);
    
    // Quiz navigation logic
    const quizQuestions = document.querySelectorAll('.quiz-question');
    let currentQuestion = 0;
    
    function showQuestion(index) {
        quizQuestions.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });
    }
    
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            // Show results
            alert('Assessment complete! Based on your answers, we recommend speaking with one of our therapists.');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    animate();
    initAnimations();
    initServiceCards();
    initTherapistCarousel();
    initQuiz();
});
