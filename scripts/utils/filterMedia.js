// Fonction de gestion des filtres

export const filterMedia = (btn, updateGallery, filteredMedia) => {
    
    btn.addEventListener("click", () => {
        const dataValue = btn.getAttribute("data-value");
        const currentBtn = document.querySelector('.dropbtn');
        const currentDataValue = currentBtn.getAttribute('data-value');

        // Échange des textes entre les boutons

        const currentText = currentBtn.textContent.trim();
        currentBtn.textContent = btn.textContent.trim();
        btn.textContent = currentText;

        // Mise à jour de l'attribut data-value
        
        currentBtn.setAttribute('data-value', dataValue);
        btn.setAttribute('data-value', currentDataValue);

        if (dataValue === "date") {
            filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
            updateGallery();
        }
        else if (dataValue === "title") {
            filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
            updateGallery();
        }
        else {
            filteredMedia.sort((a, b) => b.likes - a.likes);
            updateGallery();
        }
    });
}