var request = require('request-promise');
var parser = require('fast-xml-parser');
const Entities = require('html-entities').AllHtmlEntities;

module.exports = async () => {
	let res = await request('http://ws.seloger.com/search.xml?idtt=1&ci=750056&idtypebien=1').then(res => {
		return parser.parse(res,{});
	})

	let n =  Math.floor(Math.random() * (res.recherche.annonces.annonce.length - 0) + 0)
	let annonce = res.recherche.annonces.annonce[n]
	const entities = new Entities();

	return `*${entities.decode(annonce.titre)}, ${entities.decode(annonce.libelle)}*\n>${entities.decode(annonce.descriptif.replace(/\n/gim,"\n>"))}\n${annonce.prix}${annonce.prixUnite} / ${annonce.nbPiece} pièce(s) / ${annonce.surface} ${annonce.surfaceUnite} / ${entities.decode(annonce.ville)}\n${annonce.photos.photo[0].stdUrl}\n${annonce.permaLien}`
}