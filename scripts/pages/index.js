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

        const { photographers } = await getPhotographersData("../../data/photographers.json");

        displayData(photographers);
    }
    
    init();
    
