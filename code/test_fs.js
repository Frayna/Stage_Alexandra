const fs = require('fs');
let path = './';


module.exports = {
    affichage_contenu_dossier : function(array_dossier, path){
        return affichage_dossier(array_dossier, path);
    }
}

function affichage_dossier(array_dossier, path, return_array){
	if(!return_array)
		return_array = new Array();
    array_dossier.forEach(file =>{
        let path_tmp = path+file+'/'
        if (fs.lstatSync(path_tmp).isDirectory()){
            //ouverture de la div principale sous forme de carte
            return_array.push(`
            <div class="card, ml-5" style="display:flex;">
            <img src="./images/folder.png" class="card-img-top" alt="logo dossier" style="width:50px; height: 50px;"> 
            <div class="card-body">
            <div id=${file} class="card-text" onclick="reveal('${file}_rep');">${file}`)
            //création du tableau secondaire contenant les sous-répertoires
            array_tmp = fs.readdirSync(path_tmp);
            //ouverture de la div secondaire
            return_array.push(`<div style="display:none" id="${file}_rep">`)
            array_tmp.forEach(file =>{
                try{
                    //appel récursif de la fonction pour afficher les sous-dossiers
                    affichage_dossier(array_tmp, path_tmp, return_array);
                }catch(error){
                    //le programme retourne une erreur pour les fichiers sans extensions car il les considère comme des dossiers.
                }
            })
            //fermeture de la div secondaire
                return_array.push(`</div>`);
            //fermeture de la div principale
                return_array.push(`</div></div></div>`);
        }else{
            //affichage dans le cas où il s'agit d'un fichier simple
            return_array.push(`
            <div class="card, ml-5" style="display:flex;">
            <img src="./images/document.png" class="card-img-top" alt="logo fichier" style="width:50px; height: 50px; color: black;">
            <div class="card-body">
            <div id="${file}_content">${file}</div>
            </div>
            </div>`);
        }
    })
    return return_array;
}