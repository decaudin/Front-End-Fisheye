import { getPhotographersData } from '../api/getPhotographersData.js';
import { photographerSingleTemplate } from '../templates/photographerSingle.js';
import { contactForm } from '../utils/contactForm.js';

// Exécution de la fonction après le chargement du DOM

document.addEventListener("DOMContentLoaded", async () => {

    // Récupération des données depuis le fichier JSON

    const data = await getPhotographersData("../../data/photographers.json");
  
    if (data) {

      // Récupération de l'id dans l'URL et des données du photographe correspondant à cet id

      const { photographers, media } = data;

      const urlParams = new URLSearchParams(window.location.search);
      const urlID = urlParams.get('id');
      const photographerData = photographers.filter(x => x.id == urlID);
  
      // Hydratation des champs dans l'entête de la page de chaque photographe

      const title = document.querySelector(".photographer_data h1");
      title.textContent = photographerData[0].name;
      const location = document.querySelector(".photographer_data span");
      location.textContent = photographerData[0].city + ", " + photographerData[0].country;
      const tagline = document.querySelector(".photographer_data p");
      tagline.textContent = photographerData[0].tagline;
      const img = document.querySelector(".photograph-header img");
      img.src = `assets/photographers/${photographerData[0].portrait}`;
      img.alt = photographerData[0].name;
    
      // Gestion de la modale de contact (ouverture, fermeture et soumission du formulaire de contact)

      contactForm(photographerData);
  
      // Affichage de la Gallerie via le template 'photographerSingleTemplate'

      if (photographerData) {
        const photographerId = photographerData[0].id;
        const photographerPrice = photographerData[0].price;
        const filteredMedia = media.filter(item => item.photographerId === photographerId);
        const photographerTotalLikes = filteredMedia.reduce((total, media) => total + media.likes, 0);
        photographerSingleTemplate(filteredMedia, photographerTotalLikes, photographerPrice);
      }
    }
  });