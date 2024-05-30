import { getPhotographersData } from '../api/getPhotographersData.js';
import { photographerTemplate } from '../templates/photographerAll.js';
import { addArticleClickEvent } from '../utils/photographerSimplePage.js'; 

    const displayData = async (photographers) => {

        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {

            // Utilisation du template pour afficher les profils des photographes

            const photographerModel = photographerTemplate(photographer);

            const userCardDOM = photographerModel.getUserCardDOM();
            userCardDOM.setAttribute('aria-label', `Profil de ${photographer.name}`);
            userCardDOM.setAttribute('tabindex', '0');

            photographersSection.appendChild(userCardDOM);

            // Redirection vers la page de détail du photographe sélectionné

            addArticleClickEvent(userCardDOM, photographerModel.id)
        });
    }

    const init = async () => {

        // Récupération des données depuis le fichier JSON

        let photographers;

        if (window.location.hostname === 'decaudin.github.io') {

            // Utilisation de chemins absolus pour GitHub Pages

            const baseRepoUrl = 'https://decaudin.github.io/Front-End-Fisheye';
            photographers = await getPhotographersData(`${baseRepoUrl}/data/photographers.json`);

        } else {
            
            // Utilisation de chemins relatifs pour le développement local

            photographers = await getPhotographersData('../../data/photographers.json');
        }

    //    const { photographers } = await getPhotographersData('../../data/photographers.json');

        displayData(photographers);
    }
    
    init();
    
