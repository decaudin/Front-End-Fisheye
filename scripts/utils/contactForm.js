export const contactForm = (photographerData) => {

  const contactModalTitle = document.querySelector(".contact_modal_title");
  contactModalTitle.innerHTML = `Contactez-moi<br>${photographerData[0].name}`;
  const modal = document.querySelector(".modal");
  const form = document.getElementById("modal_form");
  const contactModal = document.getElementById("contact_modal");
  const contactButton = document.querySelector(".contact_button");
  const closeContactButton = document.querySelector(".contact-modal_close");

  // Ouverture modale

  contactButton.addEventListener("click", () => {
    contactModal.style.display = "block";
    closeContactButton.focus();    
  });

  // Fermeture modale

  closeContactButton.addEventListener("click", () => {
    contactModal.style.display = "none";  
  });

  contactModal.addEventListener("click", () => {
    contactModal.style.display = "none";
  });

  closeContactButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
      contactModal.style.display = "none";  
    }
  });

  addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
      contactModal.style.display = "none";
    }
  });

  modal.addEventListener("click", (e) => {
    e.stopPropagation();
  })

  // Soumission formulaire

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("prenom").value;
    const lastName = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    console.log("---- Formulaire envoyé avec succès ----")
    console.log(`Prénom : ${firstName}`);
    console.log(`Nom : ${lastName}`);
    console.log(`Email : ${email}`);
    console.log(`Message : ${message}`);
    form.reset()
  });
}