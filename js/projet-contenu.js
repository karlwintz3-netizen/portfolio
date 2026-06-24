(function () {
  "use strict";

  var PUNAISES_PAR_DEFAUT = [
    "Plan de travail 2.png",
    "Plan de travail 11.png",
    "Plan de travail 7.png",
    "Plan de travail 14.png",
    "Plan de travail 15.png",
    "Plan de travail 4.png",
  ];

  var parametres = new URLSearchParams(window.location.search);
  var slug = parametres.get("projet") || "refonte-logo";

  function cheminPunaise(nomFichier) {
    return "img/punaise-bordeau/" + nomFichier;
  }

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
        donnees.galerie.forEach(function (visuel, index) {
          if (!visuel || !visuel.image) {
            return;
          }

          var taille = visuel.taille || "moyenne";
          var classeTaille =
            taille === "petite"
              ? "galerie__image--petite"
              : taille === "grande"
              ? "galerie__image--grande"
              : "";

          var nomPunaise =
            visuel.punaise ||
            PUNAISES_PAR_DEFAUT[index % PUNAISES_PAR_DEFAUT.length];

          var item = document.createElement("li");
          item.className = "galerie__item";

          var epingle = document.createElement("span");
          epingle.className = "galerie__epingle";
          epingle.setAttribute("aria-hidden", "true");
          epingle.style.backgroundImage =
            "url('" + cheminPunaise(nomPunaise) + "')";
          item.appendChild(epingle);

          if (visuel.type === "duo" && visuel.image2) {
            item.classList.add("galerie__item--duo");

            var duo = document.createElement("div");
            duo.className = "galerie__duo " + classeTaille;

            var image1 = document.createElement("img");
            image1.src = visuel.image;
            image1.alt = visuel.alt || "";
            duo.appendChild(image1);

            var image2 = document.createElement("img");
            image2.src = visuel.image2;
            image2.alt = visuel.alt2 || "";
            duo.appendChild(image2);

            item.appendChild(duo);
          } else {
            var image = document.createElement("img");
            image.className = "galerie__image " + classeTaille;
            image.src = visuel.image;
            image.alt = visuel.alt || "";
            item.appendChild(image);
          }

          galerie.appendChild(item);
        });
      }
    })
    .catch(function () {
      // Si le projet demandé n'existe pas, le texte par défaut déjà présent
      // dans le HTML reste affiché plutôt que de laisser une page vide.
    });
})();
