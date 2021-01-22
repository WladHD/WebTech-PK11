function Raum(nummer, bezeichnung, gebaeude, kapazitaet, ausstattungsmerkmale) {
    this.nummer = nummer;
    this.bezeichnung = bezeichnung;
    this.gebaeude = gebaeude;
    this.kapazitaet = kapazitaet;
    this.ausstattungsmerkmale = ausstattungsmerkmale;
}


let raumliste =
    [
        new Raum("A.E.01", "Hörsaal", "EF 42", "300 Tischplätze", ["3 Beamer", "2 Whiteboards"]),
        new Raum("A.E.02", "Hörsaal", "EF 42", "25 Tischplätze", ["1 Beamer", "1 Tafel"])
    ];

function getIndexInnerListHTML() {
    let ar = [];
    
    raumliste.forEach((a) => ar.push(`<li><a href="raumdetail">${a.nummer}</a> - ${a.bezeichnung} - ${a.gebaeude}</li>`))
    
    return ar.join("");
}

module.exports = {
    getIndexInnerListHTML: getIndexInnerListHTML()
};