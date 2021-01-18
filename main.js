const express = require('express');
const fs = require('fs');
const test_fs = require('./code/test_fs');
const app = express();
const port = 9090;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res)=>{
	let array_dossier = fs.readdirSync("./");
    // on affecte le résultat de affichage_contenu_dossier dans le tableau array qui sera utilisé après 
    //on affiche la page main.ejs en envoyant avant la variable array sur le fichier qui sera alors interprété comme étant la variable div
    res.render('./main.ejs', {
        div:test_fs.affichage_contenu_dossier(array_dossier, "./")
    });
    console.log('page racine affichée')
});

//action à qui s'effectue lorsque l'on se connecte au port demandé
app.listen(port, () =>{
    console.log(`Actuellement en écoute sur le port ${port}`);
});