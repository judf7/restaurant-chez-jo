import { observeElements } from "./pageAnimation.js";
import { showSection } from "./navigation.js";
import { formatDate } from "./reservation.js";
import { handleNavigation } from "./navigation.js";
//gere les animations d'apparition
document.addEventListener("DOMContentLoaded", (event) => {
  observeElements();
});

//gestion de la page visible
//accueil

window.addEventListener("load", handleNavigation); // Gère la navigation au chargement
window.addEventListener("popstate", handleNavigation); // Gère la navigation avec les boutons précédent/suivant du navigateur

document.getElementById("accueil-link").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("accueil");
});
document.getElementById("avis-link").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("avis");
});
document.getElementById("reservation-link").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("reservation");
});
document.getElementById("carte-link").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("carte");
});
document.getElementById("suggestion-link").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("suggestion");
  window.scrollTo({ top:0, behavior: "smooth"})
});

//footer

document.querySelectorAll(".footer-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionID = e.target.getAttribute("data-section");
    showSection(sectionID);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//gestion du formulaire de reservation
const dateReservation = document.getElementById("reservation-date");
const heureReservation = document.getElementById("reservation-time");
const nbrPersonneReservation = document.getElementById("number-of-guests");
const confirmationReservation = document.querySelector(
  ".confirmation-reservation"
);
let date;
let heure;
let nbrPersonne;
dateReservation.addEventListener("change", (e) => {
  date = formatDate(e.target.value);
});
heureReservation.addEventListener("change", (e) => {
  heure = e.target.value;
});
nbrPersonneReservation.addEventListener("change", (e) => {
  nbrPersonne = e.target.value;
});

const formReservation = document.querySelector(".reservation-form");

formReservation.addEventListener("submit", (e) => {
  e.preventDefault();
  confirmationReservation.innerHTML = `
<div class="alert alert-success text-center mt-4" role="alert">
<p> Merci pour votre Réservation </p>
<p> Nous vous attendons le ${date} à ${heure} , pour ${nbrPersonne} personne${
    nbrPersonne > 1 ? "s" : ""
  }
</div>
`;
  formReservation.reset();
});

// gestion des avis

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contactPage");
  const pseudoInput = document.getElementById("pseudo");
  const commentaireTextArea = document.getElementById("commentaire");
  const avisSection = document.querySelector(".commentairesSection");

  const avisDisplay = () => {
    avisSection.innerHTML = "";
    const avis = JSON.parse(localStorage.getItem("avis")) || [];
    avis.forEach((av) => {
      const avisElement = document.createElement("div");
      avisElement.classList.add("avis");
      avisElement.innerHTML = `
  <h4>${av.pseudo}</h4>
  <div class="star-rating"> ${'★'.repeat(av.note)} </div>
  <p>${av.commentaire}</p>
  <small>Le ${av.date}</small>
  `;
      avisSection.appendChild(avisElement);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const pseudo = pseudoInput.value.trim();
    const commentaire = commentaireTextArea.value.trim();
    const note = document.querySelector('input[name="star"]:checked')?.value || 0
    const date = new Date().toLocaleDateString()
   
    if (pseudo && commentaire && note) {
      const avis = JSON.parse(localStorage.getItem("avis")) || [];
      avis.push({ pseudo, commentaire, note, date });
      localStorage.setItem("avis", JSON.stringify(avis));
      pseudoInput.value = "";
      commentaireTextArea.value = "";
      avisDisplay();
    }
  });
avisDisplay()
});

