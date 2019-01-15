window.onload=function(){
    var titre = document.createElement("h3");
    var content_h3 = document.createTextNode("Bienvenue sur le POKEDECK.");
    var para = document.createElement("p");
    var content_para = document.createTextNode("Recherchez ci-dessous un POKEMON:");
    var button = document.createElement("button");
    var content_button = document.createTextNode("Rechercher");
    var button_afficher = document.createElement("button");
    var content_button_afficher = document.createTextNode("Afficher tout les pokemons");
    var br = document.createElement("br");
    var br2 = document.createElement("br");


    var searchbar = document.createElement("input");


    titre.appendChild(content_h3);
    para.appendChild(content_para);
    button.appendChild(content_button);
    button_afficher.appendChild(content_button_afficher);

    var element = document.getElementById("root");
  
    


    element.appendChild(titre);
    element.appendChild(para);
    element.appendChild(button_afficher);
    element.appendChild(br);
    element.appendChild(br2);
    element.appendChild(searchbar);
    element.appendChild(button);

    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
          }
        };
        xhr.send();
    };

    var afficherListe = function(){
        var ul = document.createElement('ul');
        ul.setAttribute('id','pokemonList');           
        document.getElementById('root').appendChild(ul); 

        getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json',
        function(err, data) {
        if (err !== null) {
            alert('Impossible : ' + err);
        } else {
            for(var i = 0;i < data.length;i++){
                var li = document.createElement('li');
                li.setAttribute('class','item');             
                ul.appendChild(li);
                var content_li = document.createTextNode(data[i].slug);
                li.appendChild(content_li);               
            }
        }
        });
    };
   



    document.getElementsByTagName("input")[0].setAttribute("id", "searchbar");
    document.getElementById("searchbar").placeholder = "Rechercher...";

    button_afficher.addEventListener("click", function(){
        afficherListe();
      });

};