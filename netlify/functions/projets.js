// Liste tous les projets (content/projets/*.json) et renvoie leur slug,
// titre et catégorie. Utilisée par la page d'accueil pour générer
// automatiquement les petits post-it de chaque catégorie, sans qu'il soit
// nécessaire de modifier le code à chaque nouveau projet créé depuis
// l'éditeur (/admin).
const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  var dossier = path.join(__dirname, "..", "..", "content", "projets");
  var projets = [];

  try {
    var fichiers = fs.readdirSync(dossier).filter(function (nom) {
      return nom.endsWith(".json");
    });

    projets = fichiers.map(function (nomFichier) {
      var contenu = JSON.parse(
        fs.readFileSync(path.join(dossier, nomFichier), "utf8")
      );
      var slug = nomFichier.replace(/\.json$/, "");

      var titreAccueil = contenu.titre_accueil || contenu.titre || slug;

      return {
        slug: slug,
        titre: titreAccueil.split("\n").join(" "),
        categorie: contenu.categorie || "",
        ordre: typeof contenu.ordre === "number" ? contenu.ordre : 10,
      };
    });

    projets.sort(function (a, b) {
      return a.ordre - b.ordre;
    });
  } catch (erreur) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erreur: erreur.message }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projets),
  };
};
