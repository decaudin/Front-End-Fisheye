export const photographerTemplate = (data) => {

    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {
        const article = document.createElement('article');
        
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("tabindex", "0");
        
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute("tabindex", "0");
        
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        h3.setAttribute("tabindex", "0");
        
        const p = document.createElement('p');
        p.textContent = tagline;
        p.setAttribute("tabindex", "0");
        
        const span = document.createElement('span');
        span.textContent = `${price}€/jour`;
        span.setAttribute("tabindex", "0");
        
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        
        return article;
    }

    return { id, name, picture, city, country, tagline, price, getUserCardDOM }
}