import { getPhotographersData } from '../api/getPhotographersData.js';
import { photographerSingleTemplate } from '../templates/photographerSingle.js';
import { contactForm } from '../utils/contactForm.js';

// Exécution de la fonction après le chargement du DOM

document.addEventListener("DOMContentLoaded", async () => {

  // Récupération des données depuis le fichier JSON

  let data;

  if (window.location.hostname === 'decaudin.github.io') {

      // Utilisation de chemins absolus pour GitHub Pages

      data = await getPhotographersData('https://decaudin.github.io/Front-End-Fisheye/data/photographers.json');

  } else {

      // Utilisation de chemins relatifs pour le développement local

      data = await getPhotographersData('/data/photographers.json');
  }
  
  if (data) {

    // Récupération de l'id dans l'URL et des données du photographe correspondant à cet id

    const { photographers, media } = data;

    const urlParams = new URLSearchParams(window.location.search);
    const urlID = urlParams.get('id');
    const photographerData = photographers.find(x => x.id == urlID);
  
    // Hydratation des champs dans l'entête de la page de chaque photographe

    const title = document.querySelector(".photographer_data h1");
    title.textContent = photographerData.name;
    const location = document.querySelector(".photographer_data span");
    location.textContent = photographerData.city + ", " + photographerData.country;
    const tagline = document.querySelector(".photographer_data p");
    tagline.textContent = photographerData.tagline;
    const img = document.querySelector(".photograph-header img");
    img.src = `assets/photographers/${photographerData.portrait}`;
    img.alt = photographerData.name;
    
    // Gestion de la modale de contact (ouverture, fermeture et soumission du formulaire de contact)

    contactForm(photographerData);
  
    // Affichage de la Gallerie via le template 'photographerSingleTemplate'

    if (photographerData) {
      const photographerId = photographerData.id;
      const photographerPrice = photographerData.price;
      const filteredMedia = media.filter(item => item.photographerId === photographerId);
      const photographerTotalLikes = filteredMedia.reduce((total, media) => total + media.likes, 0);
      photographerSingleTemplate(filteredMedia, photographerTotalLikes, photographerPrice);
    }
  }
});