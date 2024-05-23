import { GalleryImage, GalleryVideo } from "../gallery/GalleryMedia.js";
import { ModalMediaFactory } from "../gallery/ModalMediaFactory.js";
import { filterMedia } from "../utils/filterMedia.js";

export const photographerSingleTemplate = (filteredMedia, totalLikes, price) => {

    // ---------- Elément du DOM ---------- //

    // Galerie

    const grid = document.querySelector(".gallery_grid");

    // Modale (lightbox)

    const imgModalContainer = document.querySelector(".img_modal_container");
    const imgModal = document.querySelector(".img_modal");
    const closeModal = document.querySelector(".img_modal_close");
    const prevButton = document.querySelector(".img_modal_prev");
    const nextButton = document.querySelector(".img_modal_next");

    // 'Modale' du bas

    const likesContainer = document.querySelector(".likes_container");
    const likesNumber = document.querySelector(".likes_number");
    const likesAmount = document.querySelector(".likes");
    const priceNumber = document.querySelector(".price");
    let currentIndex;
    let updatedTotalLikes = totalLikes;

    // Fermeture de la modale au clic

    closeModal.addEventListener('click', () => {
        imgModalContainer.style.display = "none";
        clearModalContent();
    });

    imgModalContainer.addEventListener('click', () => {
        imgModalContainer.style.display = "none";
        clearModalContent();
    });

    imgModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Fermeture de la modale au clavier

    closeModal.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            imgModalContainer.style.display = "none";
            clearModalContent();
        }
    });

    addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            imgModalContainer.style.display = "none";
            clearModalContent();
        }
    })

    // Gestion du clic sur le bouton "Suivant"

    nextButton.addEventListener('click', () => {
        if (currentIndex < filteredMedia.length - 1) {
            currentIndex++;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });

    // Gestion de l'appui sur la touche "Enter" pour passer à l'élément suivant

    nextButton.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            if (currentIndex < filteredMedia.length - 1) {
                currentIndex++;
                handleMediaClick(filteredMedia[currentIndex]);
            }
        }
    });
    
    // Gestion du clic sur le bouton "Précédent"

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            handleMediaClick(filteredMedia[currentIndex]);
        }
    });

    // Gestion de l'appui sur la touche "Enter" pour passer à l'élément précédent

    prevButton.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            if (currentIndex > 0) {
                currentIndex--;
                handleMediaClick(filteredMedia[currentIndex]);
            }
        }
    });

    // Fonction pour reset le contenu précédent

    function clearModalContent() {
        const children = Array.from(imgModal.children);
        children.forEach(child => {
            if (child !== closeModal && child !== prevButton && child !== nextButton) {
                imgModal.removeChild(child);
            }
        });
    }

    // Intanciation de la factory pour la modale (Lightbox)

    const modalMediaFactory = new ModalMediaFactory();

    // Gestion du clic sur une image ou une vidéo (Lightbox)

    function handleMediaClick(item) {

        clearModalContent();

        // Utilisation de la modalMediaFactory pour créer le média

        const media = modalMediaFactory.createMedia(item);

        // Création de l'élement du DOM correspondant et ajout à imgModal

        const mediaElement = media.createDOMElement();
        imgModal.appendChild(mediaElement);

        // Création et ajout du titre

        const titleElement = media.createTitleElement();
        imgModal.appendChild(titleElement);

        // Affichage de la modale

        imgModalContainer.style.display = "flex";
        closeModal.focus();
    }

    // Filtrer les médias

    const dropdown = document.querySelector('.dropdown');
    const arrow = document.querySelector('.arrow-top')
    const filterBtn = document.querySelectorAll(".filterBtn")

    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        arrow.classList.toggle("open");
    });

    dropdown.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            dropdown.classList.toggle('active');
            arrow.classList.toggle("open");
        }
    });

    filteredMedia.sort((a, b) => b.likes - a.likes);
    updateGallery();

    filterBtn.forEach(btn => {
        filterMedia(btn, updateGallery, filteredMedia)
    });  

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

            // Gestion des évènements de clic et clavier pour les likes

            galleryItemElement.children[1].children[0].children[1].addEventListener("click", () => {
                updateLikes(galleryItem.liked);
            })

            galleryItemElement.children[1].children[0].children[1].addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                updateLikes(galleryItem.liked);
                }
            })

            // Gestion des évènements de clic et clavier pour afficher la modale de média (lightbox)

            galleryItemElement.addEventListener('click', () => {
                currentIndex = index;
                handleMediaClick(item, currentIndex);
            });
            galleryItemElement.addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
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
    
    // Affichage de la modale du bas
    
    likesAmount.textContent = updatedTotalLikes;
    priceNumber.textContent = `${price}€ / jour`;
    likesNumber.appendChild(likesAmount);
    likesContainer.appendChild(priceNumber);

}