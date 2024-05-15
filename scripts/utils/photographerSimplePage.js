// Redirection vers la page de détail du photographe sélectionné

export const addArticleClickEvent = (article, id) => {

    const goToPhotographer = () => {
        window.location.href = `./photographer.html?id=${id}`;
    };

    article.addEventListener('click', goToPhotographer);
    
    article.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            goToPhotographer();
        }
    });
}