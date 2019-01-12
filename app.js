window.onload=function(){
    var titre = document.createElement("h3");
    var content_h3 = document.createTextNode("Bienvenue sur le POKEDECK.");
    var para = document.createElement("p");
    var content_para = document.createTextNode("Recherchez ci-dessous un POKEMON:");
    var button = document.createElement("button");
    var content_button = document.createTextNode("Rechercher");

    var searchbar = document.createElement("input");


    titre.appendChild(content_h3);
    para.appendChild(content_para);
    button.appendChild(content_button);


    var element = document.getElementById("root");
  

    element.appendChild(titre);
    element.appendChild(para);
    element.appendChild(searchbar);
    element.appendChild(button);

    document.getElementsByTagName("input")[0].setAttribute("id", "searchbar");
    document.getElementById("searchbar").placeholder = "Rechercher...";

};