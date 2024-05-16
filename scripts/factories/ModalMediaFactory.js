// Création d'un média image ou vidéo en fonction de la propriété de l'élément

class ModalMediaFactory {
    createMedia(item) {
        if (item.image) {
            return new ImageMedia(item);
        } else if (item.video) {
            return new VideoMedia(item);
        } else {
            throw new Error('Type de média non pris en charge');
        }
    }
}

// Modèle pour les médias de type image

class ImageMedia {
    constructor(item) {
        this.item = item;
        this.id = item.photographerId;
    }

    createDOMElement() {
        const img = document.createElement("img");
        img.className = "img_modal_picture";
        img.src = `./assets/works/${this.id}/${this.item.image}`;
        return img;
    }

    createTitleElement() {
        const title = document.createElement("h3");
        title.textContent = this.item.title;
        return title;
    }
}

// Modèle pour les médias de type vidéo

class VideoMedia {
    constructor(item) {
        this.item = item;
        this.id = item.photographerId;
    }

    createDOMElement() {
        const video = document.createElement("video");
        video.className = "img_modal_picture";
        video.src = `./assets/works/${this.id}/${this.item.video}`;
        video.controls = true;
        return video;
    }

    createTitleElement() {
        const title = document.createElement("h3");
        title.textContent = this.item.title;
        return title;
    }
}

export { ModalMediaFactory, ImageMedia, VideoMedia };