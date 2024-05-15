export const getPhotographersData = async (url) => {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de chargement du JSON : ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Une erreur s'est produite : ${error}`);
        return [];
    }
}