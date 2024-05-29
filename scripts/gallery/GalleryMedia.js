// Définition d'un modèle pour un élément de la galerie

class GalleryItem {
    constructor(item, liked) {
        this.item = item;
        this.id = item.photographerId;
        this.liked = liked;
        this.mediaTitle = this.item.title;
        this.likesValue = document.createElement("p");
        this.likesLogo = document.createElement("img");
        this.likesLogo.src = liked ? "./assets/icons/heart-red-full.svg" : "./assets/icons/heart-red.svg";
        this.likesLogo.alt = "bouton j'aime";
    }

    createDOMElement() {
        const mediaWrapper = document.createElement("div");
        mediaWrapper.className = "gallery_img_wrapper";

        const mediaContent = document.createElement("div");
        mediaContent.className = "gallery_img_content";

        const imgTitle = document.createElement("p");
        imgTitle.className = "gallery_img_title";
        imgTitle.textContent = this.mediaTitle;

        const likesWrapper = document.createElement("span");
        likesWrapper.className = "gallery_img_likes_wrapper";
        likesWrapper.setAttribute("aria-label", "Liker/Disliker")
        likesWrapper.setAttribute("tabindex", 0);

        this.likesValue.textContent = this.item.likes;

        // Like au clic

        likesWrapper.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleLike();
        });

        // Like avec "Entrer"
        
        likesWrapper.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.stopPropagation();
                this.toggleLike();
            }
        });

        likesWrapper.appendChild(this.likesValue);
        likesWrapper.appendChild(this.likesLogo);

        mediaContent.appendChild(imgTitle);
        mediaContent.appendChild(likesWrapper);
        mediaWrapper.appendChild(mediaContent);

        return mediaWrapper;
    }

    // Fonction pour like/dislike un élément de la galerie

    toggleLike() {
        
        if (this.liked) {
            this.likesLogo.src = "./assets/icons/heart-red.svg";
            this.likesValue.textContent = --this.item.likes;
        } else if (!this.liked) {
            this.likesLogo.src = "./assets/icons/heart-red-full.svg";
            this.likesValue.textContent = ++this.item.likes;
        }

        this.liked = !this.liked;
        
    }    
}

// Définition d'un modèle pour une image de la galerie

class GalleryImage extends GalleryItem {
    constructor(item, liked) {
        super(item, liked);
    }

    createDOMElement() {
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "gallery_image_wrapper";
        imageWrapper.setAttribute("aria-label", "Afficher l'image");
        imageWrapper.setAttribute("tabindex", 0);
        
        const image = document.createElement("img");
        image.src = `./assets/works/${this.id}/${this.item.image}`;
        image.className = "gallery_image";
        image.alt = this.item.title;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(super.createDOMElement());
        return imageWrapper;
    }

    toggleLike() {
        super.toggleLike();
    }
}

// Définition d'un modèle pour une vidéo de la galerie

class GalleryVideo extends GalleryItem {
    constructor(item, liked) {
        super(item, liked);
    }

    createDOMElement() {
        const videoWrapper = document.createElement("div");
        videoWrapper.className = "gallery_video_wrapper";
        videoWrapper.setAttribute("aria-label", "Afficher la vidéo");
        videoWrapper.setAttribute("tabindex", 0);

        const video = document.createElement("video");
        video.src = `./assets/works/${this.id}/${this.item.video}`;
        video.className = "gallery_video";
        video.controls = true;

        videoWrapper.appendChild(video);
        videoWrapper.appendChild(super.createDOMElement());
        return videoWrapper;
    }

    toggleLike() {
        super.toggleLike();
    }
}

export { GalleryItem, GalleryImage, GalleryVideo };