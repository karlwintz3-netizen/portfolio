(function () {
  "use strict";

  fetch("content/projet-refonte-logo.json")
    .then(function (reponse) {
      return reponse.json();
    })
    .then(function (donnees) {
      var titre = document.getElementById("projet-titre");
      var soustitre = document.getElementById("projet-soustitre");
      var paragraphe1 = document.getElementById("projet-paragraphe1");
      var paragraphe2 = document.getElementById("projet-paragraphe2");

      if (titre && donnees.titre) {
        titre.innerHTML = donnees.titre.split("\n").join("<br />");
      }
      if (soustitre && donnees.soustitre) {
        soustitre.textContent = donnees.soustitre;
      }
      if (paragraphe1 && donnees.paragraphe1) {
        paragraphe1.textContent = donnees.paragraphe1;
      }
      if (paragraphe2 && donnees.paragraphe2) {
        paragraphe2.textContent = donnees.paragraphe2;
      }
    })
    .catch(function () {
      // Si le fichier de contenu est indisponible, le texte statique
      // déjà présent dans le HTML reste affiché.
    });
})();
