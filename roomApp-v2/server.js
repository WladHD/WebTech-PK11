const fs = require("fs");
const http = require("http");

const server = http.createServer(function (request, response) {
    let fileUrl = "./public" + request.url;

    if (request.url === "/" || request.url === "/index.html") {
        response.writeHead(200);
        response.end(getIndexHTML());
        console.log("Template-Seite ausgegeben")
    } else
        fs.readFile(fileUrl, function (err, name) {
            console.log(fileUrl);

            if (err !== null) {
                console.log(err);

                fs.readFile("./public/404.html", function (err, name) {
                    response.writeHead(404);
                    response.end(name);
                });

                return;
            }

            if (fileUrl.endsWith(".jpg"))
                response.setHeader("Content-Type", "image/jpeg");
            else if (fileUrl.endsWith(".svg"))
                response.setHeader("Content-Type", "image/svg+xml");
            else if (fileUrl.endsWith(".css")) {
                response.setHeader("Content-Type", "text/css");
            }

            response.writeHead(200);
            response.end(name);
        });

});

server.listen(8020, function () {
    console.log("Ich lausche nun auf http://localhost:8020");
});

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

function getIndexHTML() {
    return `<!DOCTYPE html>
    <html lang="de">
        <head>
            <meta charset="UTF-8">
            <title>Verfügbare Räume</title>
            <link rel="stylesheet" href="./css/style.css">
            <link rel="stylesheet" href="./css/flexbox.css">
            <script src="./js/script.js"></script>
        </head>
        <body>
            <div class="vertical-box">
                <header>
                    <a href="./dashboard.html"><img src="./img/logo/shark.svg" width="100" height="100" alt="Raum-App Logo"></a>
                    <h1>Raum-App</h1>
                    <!-- Quelle: https://pixabay.com/de/illustrations/hai-gesch%C3%A4ft-corporate-ozean-1417151/ -->
                </header>
    
                <nav>
                    <ul>
                        <li><a href="./index.html">Raumliste</a></li>
                        <li><a href="./details.html">Raumdetails</a></li>
                        <li><a href="./booking.html">Buchungsdetails</a></li>
                        <li><a href="./reserve.html">Raumbuchung</a></li>
                    </ul>
                </nav>
    
                <div class="horizontal-box resize-break">
                    <main class="index-main">
                        <div class="vertical-box">
                            <div>
                                <h2>Verfügbare Räume</h2>
    
                                <form action="https://labs.inf.fh-dortmund.de/roomReservationService/testRoomSearch.php" method="get">
                                    <fieldset>
                                        <legend>Nach Raum suchen</legend>
                                        <label>Raumnummer<span class="required"></span><input type="text" name="roomno" pattern="[A-Z]\.[E1-3]\.[0-9]{2}" required></label> <!--[a-z] -->
                                    </fieldset>
    
                                    <fieldset>
                                        <input type="submit" value="Suchen">
                                    </fieldset>
                                </form>
    
                                <ul>
                                    ${getIndexInnerListHTML().join("")}
                                </ul>
                            </div>
    
                        </div>
                    </main>
    
                    <aside>
                        <h2>Aktuelle Meldungen</h2>
                        <ul>
                            <li>31.10.2022: Der Beamer in Raum B.2.20 ist leider defekt. Der Informatiker ist technisiert.</li>
                            <li>04.09.2022: Bitte in den Räumen NICHT mit Permanentmarker auf die Whiteboards malen.</li>
                        </ul>
                    </aside>
                </div>
    
                <footer>
                    <p>&copy; by Team WebTech Inc.</p>
                </footer>
            </div>
        </body>
    </html>`;
}

function getIndexInnerListHTML() {
    let ar = [];

    raumliste.forEach((a) => ar.push(`<li><a href="./details.html">${a.nummer}</a> - ${a.bezeichnung} - ${a.gebaeude}</li>`))

    return ar;
}