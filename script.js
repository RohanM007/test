// Initialize default projects and skills
document.addEventListener('DOMContentLoaded', function() {
    loadDefaultProjects();
    loadDefaultSkills();
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load default projects
function loadDefaultProjects() {
    const defaultProjects = [
        {
            title: 'E-Commerce Website',
            description: 'A fully responsive online store with shopping cart functionality.',
            image: 'https://via.placeholder.com/400x200/6366f1/ffffff?text=E-Commerce',
            link: '#'
        },
        {
            title: 'Weather App',
            description: 'Real-time weather application using API integration.',
            image: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Weather+App',
            link: '#'
        },
        {
            title: 'Task Manager',
            description: 'Productivity app for managing daily tasks and projects.',
            image: 'https://via.placeholder.com/400x200/ec4899/ffffff?text=Task+Manager',
            link: '#'
        }
    ];

    defaultProjects.forEach(project => {
        addProjectCard(project);
    });
}

// Load default skills
function loadDefaultSkills() {
    const defaultSkills = [
        { name: 'HTML5', icon: '📄' },
        { name: 'CSS3', icon: '🎨' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'React', icon: '⚛️' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Git', icon: '📦' }
    ];

    defaultSkills.forEach(skill => {
        addSkillCard(skill);
    });
}

// Add Project Card
function addProjectCard(project) {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <a href="${project.link}" class="project-link" target="_blank">View Project →</a>
        </div>
    `;
    projectsGrid.appendChild(projectCard);
}

// Add Skill Card
function addSkillCard(skill) {
    const skillsGrid = document.getElementById('skillsGrid');
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.innerHTML = `
        <div class="skill-icon">${skill.icon}</div>
        <div class="skill-name">${skill.name}</div>
    `;
    skillsGrid.appendChild(skillCard);
}

// Download CV
function downloadCV() {
    const name = document.getElementById('heroName').textContent;
    const title = document.getElementById('heroTitle').textContent;
    const bio = document.getElementById('bioText').textContent;

    // Get all projects
    const projects = [];
    document.querySelectorAll('.project-card').forEach(card => {
        projects.push({
            title: card.querySelector('.project-title').textContent,
            description: card.querySelector('.project-description').textContent
        });
    });

    // Get all skills
    const skills = [];
    document.querySelectorAll('.skill-card').forEach(card => {
        skills.push(card.querySelector('.skill-name').textContent);
    });

    // Get contact info
    const contactItems = document.querySelectorAll('.contact-item span');
    const email = contactItems[0]?.textContent || '';
    const phone = contactItems[1]?.textContent || '';
    const location = contactItems[2]?.textContent || '';

    // Create CV content
    let cvContent = `
${name}
${title}
${'='.repeat(50)}

CONTACT INFORMATION
${'-'.repeat(50)}
Email: ${email}
Phone: ${phone}
Location: ${location}

ABOUT ME
${'-'.repeat(50)}
${bio}

SKILLS
${'-'.repeat(50)}
${skills.join(' | ')}

PROJECTS
${'-'.repeat(50)}
`;

    projects.forEach((project, index) => {
        cvContent += `
${index + 1}. ${project.title}
   ${project.description}
`;
    });

    cvContent += `
${'='.repeat(50)}
Generated from My Portfolio - ${new Date().toLocaleDateString()}
`;

    // Create and download file
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('CV downloaded successfully!');
}

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! (This is a demo - form submission not implemented)');
    this.reset();
});

