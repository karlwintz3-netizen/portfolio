(function () {
  "use strict";

  var parametres = new URLSearchParams(window.location.search);
  var slug = parametres.get("projet") || "refonte-logo";

  fetch("content/projets/" + slug + ".json")
    .then(function (reponse) {
      if (!reponse.ok) {
        throw new Error("Projet introuvable");
      }
      return reponse.json();
    })
    .then(function (donnees) {
      var titre = document.getElementById("projet-titre");
      var soustitre = document.getElementById("projet-soustitre");
      var paragraphe1 = document.getElementById("projet-paragraphe1");
      var paragraphe2 = document.getElementById("projet-paragraphe2");
      var galerie = document.getElementById("projet-galerie");

      if (titre && donnees.titre) {
        titre.innerHTML = donnees.titre.split("\n").join("<br />");
        document.title = donnees.titre.split("\n").join(" ") + " — Portfolio";
      }
      if (soustitre) {
        soustitre.textContent = donnees.soustitre || "";
        soustitre.hidden = !donnees.soustitre;
      }
      if (paragraphe1) {
        paragraphe1.textContent = donnees.paragraphe1 || "";
        paragraphe1.hidden = !donnees.paragraphe1;
      }
      if (paragraphe2) {
        paragraphe2.textContent = donnees.paragraphe2 || "";
        paragraphe2.hidden = !donnees.paragraphe2;
      }

      if (galerie && Array.isArray(donnees.galerie)) {
        donnees.galerie.forEach(function (visuel) {
          if (!visuel || !visuel.image) {
            return;
          }
          var item = document.createElement("li");
          item.className = "galerie__item";

          var epingle = document.createElement("span");
          epingle.className = "galerie__epingle";
          epingle.setAttribute("aria-hidden", "true");
          item.appendChild(epingle);

          var image = document.createElement("img");
          image.className = "galerie__image";
          image.src = visuel.image;
          image.alt = visuel.alt || "";
          item.appendChild(image);

          galerie.appendChild(item);
        });
      }
    })
    .catch(function () {
      // Si le projet demandé n'existe pas, le texte par défaut déjà présent
      // dans le HTML reste affiché plutôt que de laisser une page vide.
    });
})();
