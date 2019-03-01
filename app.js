import {PokeRoutes} from './router.js';
import {Json} from './jsonmodule.js';

window.onload=function(){

    function Pokemon(name,abilities,type,weakness,thumbnailImage,number,height,weight){
        //private properties
        let name = name ? name : null;
        let abilities = abilities ? abilities : [];
        let type = type ? type : [];
        let weakness = weakness ? weakness : [];
        let thumbnailImage = thumbnailImage ? thumbnailImage : null;
        let number = number ? number : null;
        let height = height ? height : null;
        let weight = weight ? weight : null;

        this.getName = function(){
            return name;
        }

        this.getAbilities = function(){
            return abilities.join(' - ');
        }

        this.getType = function(){
            return type.join(' - ');
        }

        this.getWeakness = function(){
            return weakness.join(' - ');
        }

        this.getThumbnailImage = function(){
            return thumbnailImage;
        }

        this.getNumber = function(){
            return number;
        }

        this.getHeight = function(){
            return height;
        }

        this.getWeight = function(){
            return weight;
        }
    }
  
    let element;
    let button;
    let button_afficher;


 



    

    let afficherListe = function(){
        let ul = document.createElement('ul');
        ul.setAttribute('id','pokemonList');           
        document.getElementById('root').appendChild(ul); 

        Json.getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json',
        function(err, data) {
        if (err !== null) {
            alert('Impossible : ' + err);
        } else {
            data.forEach( pokemon => {
              let li = document.createElement('li');
              li.setAttribute('class','item');
              ul.appendChild(li);
              let div = document.createElement('div');
              li.appendChild(div);
              let label = document.createElement('label');
              let image = document.createElement('img');
              div.appendChild(label);

              let name = document.createTextNode("Nom : " + prop_access(pokemon,"data.name"));
              image.setAttribute("src", prop_access(pokemon,"data.ThumbnailImage"));
              image.setAttribute("width", "150");
              image.setAttribute("height", "150");
              image.setAttribute("alt", prop_access(pokemon,"data.name"));
              label.appendChild(name);
              div.appendChild(image);
              li.addEventListener('click', function (e) {
                e.preventDefault();
                let pokemon_obj = new Pokemon(pokemon['name'],pokemon['abilities'],pokemon['type'],pokemon['weakness'],pokemon['ThumbnailImage'],pokemon['number'],pokemon['height'],pokemon['weight']);
                history.pushState(`/${pokemon['id']}`, '', `/${pokemon['id']}`);
                PokeRoutes.createCard(pokemon_obj);
              })
            });
           
        }
        
        });
    };

    let searchListe = function(){
        if(document.getElementById("pokemonList")){
            document.getElementById("pokemonList").remove();
        }
        let ul = document.createElement('ul');
        ul.setAttribute('id','pokemonList');
        document.getElementById('root').appendChild(ul);
        let criteria = document.getElementById('searchCrit').value;
        let string_verif = type_check_v1(document.getElementById('searchbar').value,"string");
        if(string_verif){
            let search = document.getElementById('searchbar').value;
            if(document.getElementById('alert')){
                document.getElementById('alert').remove();
            }
            Json.getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json',
            function(err, data) {
                console.log(data);
            if (err !== null) {
                alert('Impossible : ' + err);
            } else {
             //   let pokemons = [];
                data.forEach( pokemon => {
                    let criteriavalidation = false;
                    let re = new RegExp(tolower(search), 'gi');
                    if((criteria == "type" || criteria == "weakness") && tolower(prop_access(pokemon,"data."+criteria)).indexOf(tolower(search)) >= 0){
                        criteriavalidation = true;
                    } else if(criteria == "name" && tolower(prop_access(pokemon,"data.name")).match(re)) {
                        criteriavalidation = true;
                    }
                    if(search !== null && criteriavalidation == true){
                        let li = document.createElement('li');
                        li.setAttribute('class','item');
                        ul.appendChild(li);
                        let div = document.createElement('div');
                        li.appendChild(div);
                        let label = document.createElement('label');
                        let image = document.createElement('img');
                        div.appendChild(label);
    
                        let name = document.createTextNode("Nom : " + prop_access(pokemon,"data.name"));
                        image.setAttribute("src", prop_access(pokemon,"data.ThumbnailImage"));
                        image.setAttribute("width", "150");
                        image.setAttribute("height", "150");
                        image.setAttribute("alt", prop_access(pokemon,"data.name"));
                        label.appendChild(name);
                        div.appendChild(image);
                        li.addEventListener('click', function (e) {
                          e.preventDefault();
                          let pokemon_obj = new Pokemon(pokemon['name'],pokemon['abilities'],pokemon['type'],pokemon['weakness'],pokemon['ThumbnailImage'],pokemon['number'],pokemon['height'],pokemon['weight']);
                          history.pushState(`/${pokemon['id']}`, '', `/${pokemon['id']}`);
                          PokeRoutes.createCard(pokemon_obj);
    
                        });
                    }
                });
            }
            
            });
        } else {
           alert("Vous devez entrer une chaine de caractère.");
        }


    };

    let path = location.pathname;
    switch (path) {
      case '/':
        Affichage.affichageHome();
        affichageEventHome();
        break;
      case '/all':
        Affichage.affichageHome();
        afficherListe();
        break;
      default:
        console.log('here');
      
        PokeRoutes.getInfo(path).then(result => {
          let pokemon_obj = new Pokemon(result['name'],result['abilities'],result['type'],result['weakness'],result['ThumbnailImage'],result['number'],result['height'],result['weight']);
          PokeRoutes.createCard(pokemon_obj);
        }  , reject => new Error(reject))
    }

    window.onpopstate = (e) => {
      console.log(e.state);
      if(e.state === null) {
        location.href = '/';
      }
      if(e.state === 'all'){
        afficherListe();
      }
      else {
        PokeRoutes.getInfo(e.state).then(result => {
          let pokemon_obj = new Pokemon(result['name'],result['abilities'],result['type'],result['weakness'],result['ThumbnailImage'],result['number'],result['height'],result['weight']);
          PokeRoutes.createCard(pokemon_obj);
        } , reject => new Error(reject))
      }
    };
   
    function prop_access(object, path) {
        if (typeof path != "string"){
            return object;
        }
    
        if(typeof object != 'object' || object == null) {
            console.log(path + ' not exist');
            return;
        }
        if (path === null || path === '') {
            return object;
        }
    
        let props = path.split('.');
        let property = object;
        props.forEach(function (prop) {
            if(!property.hasOwnProperty(prop)) {
              //  console.log(path + ' not exist');
                return;
            }
            property = property[prop];
        });
        return property;
    }

    function tolower(string) {
        if (string.length === 0) return string;
        if (typeof string == "object") {
            for (let i = 0; i < string.length; i++) {
                string[i] = string[i].toLowerCase();
            }
            return string;
        }
        if (typeof string !== "string") return "";

        // array = string.split(" ");
        return string.toLowerCase();
    }

    function type_check_v1(data, type) {
        switch(typeof data) {
            case "number":
            case "string":
            case "boolean":
            case "undefined":
            case "function":
                return type === typeof data;
            case "object":
                switch(type) {
                    case "null":
                        return data === null;
                    case "array":
                        return Array.isArray(data);
                    default:
                        return data !== null && !Array.isArray(data);
                }

        }
        
        return false;
    }

  function affichageEventHome(){
    document.getElementsByTagName("input")[0].setAttribute("id", "searchbar");
    document.getElementById("searchbar").placeholder = "Rechercher...";

    document.getElementById("show_button").addEventListener("click", function(){
      history.pushState('all', '', '/all');
      afficherListe();
    });
    document.getElementById("search_button").addEventListener("click", function(){
        searchListe();
    });
  };

};

let Affichage = {
  affichageHome:function(){
    let menu = document.createElement("div");
    menu.setAttribute("class","menu");
    let titre = document.createElement("h3");
    let img = document.createElement('img');
    img.setAttribute("class","logo");
    img.src = 'img/image.png';
    let content_h3 = document.createTextNode("Bienvenue sur le POKEDECK");
    let button = document.createElement("button");
    let button_afficher = document.createElement("button");
    let content_button_afficher = document.createTextNode("Afficher tout les pokemons");
    button_afficher.setAttribute("class","style-button");
    button_afficher.setAttribute("id","show_button");
    button.setAttribute("class","style-button-search");
    button.setAttribute("id","search_button");
    let br = document.createElement("br");
    let br2 = document.createElement("br");

    let div_search = document.createElement("div");
    


    let searchbar = document.createElement("input");
    let selectbar = document.createElement("select");
    selectbar.id = "searchCrit";

    let list = ["name","type","weakness"];
    for (let i = 0; i < list.length; i++) {
        let option = document.createElement("option");
        option.value = list[i];
        option.text = list[i];
        selectbar.appendChild(option);
    }


    titre.appendChild(content_h3);
    button_afficher.appendChild(content_button_afficher);

    let element = document.getElementById("root");
  
    
    element.appendChild(menu);

    menu.appendChild(img);
    menu.appendChild(titre);
    
    menu.appendChild(button_afficher);
    menu.appendChild(br);
    menu.appendChild(br2);
    menu.appendChild(div_search);
    div_search.appendChild(searchbar);
    div_search.appendChild(selectbar);
    div_search.appendChild(button);
  }
 }

export { Affichage };