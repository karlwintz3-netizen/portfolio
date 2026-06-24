(function () {
  "use strict";

  var DUREE_TRANSITION = 200;

  var boutons = document.querySelectorAll("[data-postit-toggle]");

  boutons.forEach(function (bouton) {
    var idCible = bouton.getAttribute("aria-controls");
    var sousRubriques = idCible ? document.getElementById(idCible) : null;

    if (!sousRubriques) {
      return;
    }

    var fermetureEnCours = null;

    bouton.addEventListener("click", function () {
      var estOuvert = bouton.getAttribute("aria-expanded") === "true";

      bouton.setAttribute("aria-expanded", String(!estOuvert));

      if (estOuvert) {
        sousRubriques.classList.remove("est-ouvert");
        fermetureEnCours = window.setTimeout(function () {
          sousRubriques.setAttribute("hidden", "");
        }, DUREE_TRANSITION);
      } else {
        if (fermetureEnCours) {
          window.clearTimeout(fermetureEnCours);
          fermetureEnCours = null;
        }
        sousRubriques.removeAttribute("hidden");
        // Forcer un reflow avant d'ajouter la classe pour garantir que la
        // transition (fondu + zoom) se joue bien, même juste après l'ouverture.
        void sousRubriques.offsetWidth;
        sousRubriques.classList.add("est-ouvert");
      }
    });
  });
})();
