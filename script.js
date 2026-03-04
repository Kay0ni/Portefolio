// 1. Initialisation du Smooth Scroll "Tween" avec Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Pour que les liens d'ancrage fonctionnent avec Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'));
    });
});

// 2. Gestion de la barre de navigation au scroll
const navbar = document.getElementById('navbar');
lenis.on('scroll', (e) => {
    if (e.animatedScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* =========================================
   GESTION DES PROJETS (BOÎTES DE COMBAT)
   ========================================= */

const mesProjets = [
    {
        titre: "Application Coach",
        description: "Application mobile avec .NET.",
        technos: ["C#"],
        lien: "https://github.com/Kay0ni/CoachApp",
        texteLien: "FIGHT (Voir le code)",
        dateCreation: "23/01/2026"
    },
    {
        titre: "Carte Interactive",
        description: "Carte interactive en JavaScript/HTML.",
        technos: ["JavaScript", "HTML"],
        lien: "https://github.com/Kay0ni/CoachApp",
        texteLien: "FIGHT (Voir le code)",
        dateCreation: "16/01/2026"
    },
    {
        titre: "Calcul Mental",
        description: "Jeux de calcul mental en JavaScript/HTML.",
        technos: ["JavaScript", "HTML"],
        lien: "https://github.com/Kay0ni/CoachApp",
        texteLien: "FIGHT (Voir le code)",
        dateCreation: "16/10/2025"
    },
    {
        titre: "Site Collection",
        description: "Site de collection en HTML/PHP/CSS.",
        technos: ["PHP", "HTML", "CSS"],
        lien: "https://github.com/Kay0ni/CoachApp",
        texteLien: "FIGHT (Voir le code)",
        dateCreation: "16/10/2025"
    },
    {
        titre: "The Hate Monsters",
        description: "Jeux slasher en Luau ROBLOX [EN COURS].",
        technos: ["Luau", "Roblox Engine"],
        lien: "https://www.roblox.com/games/8958458398/The-Hate-Monsters",
        texteLien: "ACT (Voir le projet)",
        dateCreation: "23/11/2019"
    }
];

/* =========================================
   DICTIONNAIRE DES ICÔNES DES LANGAGES
   ========================================= */
const iconesTech = {
    "C#": "devicon-csharp-plain",
    "JavaScript": "devicon-javascript-plain",
    "HTML": "devicon-html5-plain",
    "CSS": "devicon-css3-plain",
    "C++": "devicon-cplusplus-plain",
    "Java": "devicon-java-plain",
    "Luau / Lua": "devicon-lua-plain",
    "PHP": "devicon-php-plain",
    "MySQL": "devicon-mysql-plain"
};

function afficherProjets(filtre = "TOUS") {
    const container = document.getElementById('projets-container');
    container.innerHTML = '';

    // NOUVEAU : On filtre la liste avant de l'afficher
    const projetsFiltres = mesProjets.filter(projet => {
        if (filtre === "TOUS") return true; // Si "TOUS", on garde tout
        return projet.technos.includes(filtre); // Sinon, on vérifie si le projet a ce tag
    });

    // On utilise la liste filtrée au lieu de la liste complète
    projetsFiltres.forEach(projet => {
        // ... (GARDE TOUT TON CODE PRÉCÉDENT ICI : equipement, HTML, icones, etc.) ...
        
        const equipement = projet.technos.map(tech => {
            const classeIcone = iconesTech[tech] || ""; 
            const baliseIcone = classeIcone ? `<i class="${classeIcone}"></i>` : "";
            return `${baliseIcone} ${tech}`;
        }).join(" / ");
        
        const niveauFictif = "LV 20"; 
        const tempsFictif = "99:59";

        const carteHTML = `
        <div class="save-file-card">
            <div class="save-header">
                <span class="save-name">${projet.titre}</span>
                <span class="save-lv">${niveauFictif}</span>
                <span class="save-time">${projet.dateCreation}</span>
            </div>
            <div class="save-location">ZONE : ${equipement}</div>
            <div class="save-desc">* ${projet.description}</div>
            <div class="save-actions">
                <a href="${projet.lien}" target="_blank" class="btn">LOAD (Voir)</a>
            </div>
        </div>`;

        container.innerHTML += carteHTML;
    });
}

function initialiserFiltres() {
    const filtresContainer = document.getElementById('filtres-container');
    
    // 1. On fouille dans tous tes projets pour lister toutes les technos (sans doublons)
    let toutesTechnos = new Set();
    mesProjets.forEach(projet => {
        projet.technos.forEach(tech => toutesTechnos.add(tech));
    });
    
    // 2. On crée la liste finale des filtres en ajoutant "TOUS" au début
    const listeFiltres = ["TOUS", ...Array.from(toutesTechnos)];

    filtresContainer.innerHTML = '';

    // 3. On crée un bouton pour chaque techno
    listeFiltres.forEach(tech => {
        const btn = document.createElement('button');
        btn.className = 'btn-filtre';
        
        // Le bouton "TOUS" est activé par défaut au chargement
        if (tech === "TOUS") btn.classList.add('actif'); 
        
        btn.innerText = tech;
        
        // Quand on clique sur le bouton...
        btn.addEventListener('click', () => {
            // On enlève le statut "actif" (le rouge) de tous les boutons
            document.querySelectorAll('.btn-filtre').forEach(b => b.classList.remove('actif'));
            // On le met uniquement sur le bouton cliqué
            btn.classList.add('actif');
            // On relance l'affichage des projets avec ce nouveau filtre !
            afficherProjets(tech);
        });
        
        filtresContainer.appendChild(btn);
    });
}

initialiserFiltres(); // Crée les boutons d'abord
afficherProjets();    // Affiche tous les projets ensuite

/* =========================================
   GESTION DES COMPÉTENCES (BARRES HP)
   ========================================= */

const mesCompetences = [
    { nom: "Luau / Lua", niveau: 95 },
    { nom: "C#", niveau: 75 },
    { nom: "JavaScript", niveau: 75 },
    { nom: "HTML", niveau: 55},
    { nom: "C++", niveau: 40 },
    { nom: "Java", niveau: 23 },
    { nom: "CSS", niveau: 20 },
];

function afficherCompetences() {
    const container = document.getElementById('skills-container');
    container.innerHTML = ''; 

    mesCompetences.forEach(comp => {
        const niveauCalcule = Math.floor(comp.niveau / 5);

        // On cherche l'icône correspondante à la compétence
        const classeIcone = iconesTech[comp.nom] || "";
        const baliseIcone = classeIcone ? `<i class="${classeIcone}"></i>` : "";

        const skillHTML = `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${baliseIcone} ${comp.nom}</span>
                <span class="skill-lv-text">LV ${niveauCalcule}</span>
            </div>
            <div class="hp-bar-container">
                <div class="hp-bar-fill" data-width="${comp.niveau}%" style="width: 0%;"></div>
            </div>
            <div class="hp-stats-text">HP ${comp.niveau} / 100</div>
        </div>`;
        
        container.innerHTML += skillHTML;
    });

    // L'animation qui remplit les barres de vie au chargement
    setTimeout(() => {
        // On récupère toutes nos nouvelles barres de vie
        const progressBars = document.querySelectorAll('.hp-bar-fill');
        progressBars.forEach(bar => {
            // On leur applique la largeur sauvegardée
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 300);
}

afficherCompetences();

/* =========================================
   GESTION DU PARCOURS (TIMELINE)
   ========================================= */
const monParcours = [
    {
        periode: "2024 - 2026",
        titre: "BTS SIO option SLAM",
        lieu: "Lycée Edouard Gand, Amiens",
        description: "Spécialisation en développement logiciel, architecture MVC, et bases de données."
    },
    {
        periode: "Nov - Déc 2025",
        titre: "Stage : Réalisation site Web",
        lieu: "Milieu professionnel",
        description: "Mission de deuxième année accomplie. Gain d'expérience en développement web réel."
    },
    {
        periode: "Mai - Juin 2025",
        titre: "Stage : Assistance et Interventions",
        lieu: "Milieu professionnel",
        description: "Première confrontation avec le monde du travail. Résolution de bugs et maintenance."
    },
    {
        periode: "2021 - 2024",
        titre: "Bac Pro SN (Systèmes Numériques)",
        lieu: "Lycée d'origine",
        description: "Le début de l'aventure. Les bases de l'informatique et de l'architecture réseau ont été acquises ici."
    }
];

function afficherParcours() {
    const container = document.getElementById('parcours-container');
    container.innerHTML = '';

    monParcours.forEach(etape => {
        const etapeHTML = `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${etape.periode}</span>
                    <h3>${etape.titre}</h3>
                    <h4>${etape.lieu}</h4>
                    <p>${etape.description}</p>
                </div>
            </div>
        `;
        container.innerHTML += etapeHTML;
    });
}

// On lance la fonction au chargement
afficherParcours();

/* =========================================
   GESTION DU THEME (MODE CLAIR / SOMBRE)
   ========================================= */

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// 1. Au chargement, on vérifie la sauvegarde
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

// 2. Quand on clique sur le bouton (le CSS s'occupera de changer la couleur du coeur !)
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});