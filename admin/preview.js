// Aperçu visuel pour la collection "Projets" : reproduit à peu près le
// rendu réel de la page projet (papier + galerie), directement dans
// l'éditeur, en réutilisant la même feuille de style que le site.
CMS.registerPreviewStyle("/css/style.css");

var PUNAISES_PAR_DEFAUT = [
  "Plan de travail 2.png",
  "Plan de travail 11.png",
  "Plan de travail 7.png",
  "Plan de travail 14.png",
  "Plan de travail 15.png",
  "Plan de travail 4.png",
];

function classeTailleImage(taille) {
  if (taille === "petite") return "galerie__image--petite";
  if (taille === "grande") return "galerie__image--grande";
  return "";
}

var ProjetPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var titre = entry.getIn(["data", "titre"]) || "";
    var soustitre = entry.getIn(["data", "soustitre"]) || "";
    var paragraphe1 = entry.getIn(["data", "paragraphe1"]) || "";
    var paragraphe2 = entry.getIn(["data", "paragraphe2"]) || "";
    var galerie = entry.getIn(["data", "galerie"]) || [];

    var lignesTitre = titre.split("\n").map(function (ligne, index) {
      return h("span", { key: index }, ligne, h("br"));
    });

    var visuels = [];
    galerie.forEach(function (visuel, index) {
      if (!visuel || !visuel.get("image")) {
        return;
      }
      var taille = visuel.get("taille") || "moyenne";
      var nomPunaise =
        visuel.get("punaise") ||
        PUNAISES_PAR_DEFAUT[index % PUNAISES_PAR_DEFAUT.length];
      var epingle = h("span", {
        className: "galerie__epingle",
        style: {
          backgroundImage:
            "url('/img/punaise-bordeau/" + nomPunaise + "')",
        },
      });

      if (visuel.get("type") === "duo" && visuel.get("image2")) {
        visuels.push(
          h(
            "li",
            { className: "galerie__item galerie__item--duo", key: index },
            epingle,
            h(
              "div",
              { className: "galerie__duo " + classeTailleImage(taille) },
              h("img", {
                src: this.props.getAsset(visuel.get("image")).toString(),
                alt: visuel.get("alt") || "",
              }),
              h("img", {
                src: this.props.getAsset(visuel.get("image2")).toString(),
                alt: visuel.get("alt2") || "",
              })
            )
          )
        );
      } else {
        visuels.push(
          h(
            "li",
            { className: "galerie__item", key: index },
            epingle,
            h("img", {
              className: "galerie__image " + classeTailleImage(taille),
              src: this.props.getAsset(visuel.get("image")).toString(),
              alt: visuel.get("alt") || "",
            })
          )
        );
      }
    }, this);

    return h(
      "div",
      { className: "tableau-liege", style: { padding: "2rem" } },
      h(
        "div",
        { className: "projet", style: { display: "block" } },
        h(
          "article",
          { className: "feuille", style: { marginBottom: "2rem" } },
          h("span", { className: "feuille__epingle" }),
          h("h1", { className: "feuille__titre" }, lignesTitre),
          h("p", { className: "feuille__soustitre" }, soustitre),
          h("p", { className: "feuille__texte" }, paragraphe1),
          paragraphe2
            ? h("p", { className: "feuille__texte" }, paragraphe2)
            : null
        ),
        h("ul", { className: "galerie" }, visuels)
      )
    );
  },
});

CMS.registerPreviewTemplate("projets", ProjetPreview);
