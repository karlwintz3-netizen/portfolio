(function () {
  "use strict";

  var COULEUR_PAR_CATEGORIE = {
    identite: "sous-postit--bleu",
    edition: "sous-postit--rose",
    typographie: "sous-postit--vert",
  };

  fetch("/.netlify/functions/projets")
    .then(function (reponse) {
      return reponse.json();
    })
    .then(function (projets) {
      var listes = document.querySelectorAll(".sous-postits[data-categorie]");

      listes.forEach(function (liste) {
        var categorie = liste.getAttribute("data-categorie");
        var couleur = COULEUR_PAR_CATEGORIE[categorie] || "sous-postit--bleu";

        var projetsDeLaCategorie = projets.filter(function (projet) {
          return projet.categorie === categorie;
        });

        projetsDeLaCategorie.forEach(function (projet) {
          var item = document.createElement("li");
          var lien = document.createElement("a");
          lien.className = "sous-postit " + couleur;
          lien.href = "projet.html?projet=" + encodeURIComponent(projet.slug);
          lien.textContent = projet.titre;
          item.appendChild(lien);
          liste.appendChild(item);
        });
      });
    })
    .catch(function () {
      // Si la fonction est indisponible, les grappes restent simplement
      // vides plutôt que de casser le reste de la page.
    });
})();
