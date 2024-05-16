import { GalleryImage, GalleryVideo } from "../factories/GalleryMediaFactory.js";
import { ModalMediaFactory } from "../factories/modalMediaFactory.js";
//import { filterEvent } from "./filterEvent.js";

export const photographerSingleTemplate = (id, filteredMedia, totalLikes, price) => {

    const grid = document.querySelector(".gallery_grid");
    const imgModalContainer = document.querySelector(".img_modal_container");
    const imgModal = document.querySelector(".img_modal");
    const closeModal = document.querySelector(".img_modal_close");
    const prevButton = document.querySelector(".img_modal_prev");
    const nextButton = document.querySelector(".img_modal_next");
    const likesContainer = document.querySelector(".likes_container");
    const likesNumber = document.querySelector(".likes_number");
    const likesAmount = document.querySelector(".likes");
    const priceNumber = document.querySelector(".price");
    let currentIndex;
    let updatedTotalLikes = totalLikes;

     // Fermeture de la modale au clic

     closeModal.addEventListener('click', () => {
        imgModalContainer.style.display = "none";
        clearModalContent(); // Effacer le contenu multimédia
    });

    // Fermeture de la modale au clavier avec la touche 'Entrée'

    closeModal.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            imgModalContainer.style.display = "none";
            clearModalContent(); // Effacer le contenu multimédia
        }
    });

    // Gérer le clic sur le bouton "Suivant"

    nextButton.addEventListener('click', () => {
        if (currentIndex < filteredMedia.length - 1) {
            currentIndex++;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });

    // Gérer l'appui sur la touche "Enter" pour passer à l'élément suivant

    nextButton.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            if (currentIndex < filteredMedia.length - 1) {
                currentIndex++;
                handleMediaClick(filteredMedia[currentIndex]);
            }
        }
    });
    
    // Gérer le clic sur le bouton "Précédent"

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });

    // Gérer l'appui sur la touche "Enter" pour passer à l'élément précédent

    prevButton.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            if (currentIndex > 0) {
                currentIndex--;
                handleMediaClick(filteredMedia[currentIndex]);
            }
        }
    });

    // Fonction pour reset le contenu précédent

    const clearModalContent = () => {
        const children = Array.from(imgModal.children);
        children.forEach(child => {
            if (child !== closeModal && child !== prevButton && child !== nextButton) {
                imgModal.removeChild(child);
            }
        });
    }

    const modalMediaFactory = new ModalMediaFactory();

    // Gérer le clic sur une image ou une vidéo

    const handleMediaClick = (item) => {
        clearModalContent();
        closeModal.src = "./assets/icons/close-red.svg";

        // Utilisation de la modalMediaFactory pour créer le média

        const media = modalMediaFactory.createMedia(item);

        // Création du DOM Element correspondant

        const mediaElement = media.createDOMElement();

        // Ajout de l'élément à imgModal

        imgModal.appendChild(mediaElement);

        // Création et ajout du titre

        const titleElement = media.createTitleElement();
        imgModal.appendChild(titleElement);

        // Affichage de la modale

        imgModalContainer.style.display = "flex";
        closeModal.focus();
    }

    const dropdown = document.querySelector('.dropdown');
    const arrow = document.querySelector('.arrow-top')
  //  const filterBtn = document.querySelectorAll(".filterBtn")

    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        arrow.classList.toggle("open");
    });
    dropdown.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            dropdown.classList.toggle('active');
            arrow.classList.toggle("open");
        }
    });

    filteredMedia.sort((a, b) => b.likes - a.likes);
    updateGallery();

/*    filterBtn.forEach(btn => {
        filterEvent(btn, updateGallery, filteredMedia)
    }); */ 

    function updateGallery() {

        // Efface la galerie actuelle

        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        // Parcours chaque élément filtré

        filteredMedia.forEach((item, index) => {
            let liked = false;
            let galleryItem;

            // Instanciation d'un élément de galerie en fonction de son type de média (image ou vidéo)

            if (item.image) {
                galleryItem = new GalleryImage(item, liked);
            } else if (item.video) {
                galleryItem = new GalleryVideo(item, liked);
            } else {
                throw new Error('Type de média non pris en charge');
            }

            // Création de l'élément DOM correspondant

            const galleryItemElement = galleryItem.createDOMElement();

            // Ajout de l'élément à la grille (grid)

            grid.appendChild(galleryItemElement);

            galleryItemElement.children[1].children[0].children[1].addEventListener("click", () => {
                updateLikes(galleryItem.liked);
            })

            galleryItemElement.children[1].children[0].children[1].addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                updateLikes(galleryItem.liked);
                }
            })

            galleryItemElement.addEventListener('click', () => {
                currentIndex = index;
                handleMediaClick(item, currentIndex);
            });
            galleryItemElement.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    currentIndex = index;
                    handleMediaClick(item, currentIndex);
                }
            });
        });

    }

    // Fonction pour mettre à jour les likes

    function updateLikes(liked) {
        if (liked) {
            updatedTotalLikes = updatedTotalLikes + 1;
        } else {
            updatedTotalLikes = updatedTotalLikes - 1;
        }
        likesAmount.textContent = updatedTotalLikes;
    }
    
    // Mise à jour de la modale du bas
    
    likesAmount.textContent = updatedTotalLikes;
    priceNumber.textContent = `${price}€/jour`;
    likesNumber.appendChild(likesAmount);
    likesContainer.appendChild(priceNumber);

}