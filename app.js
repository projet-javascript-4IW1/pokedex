window.onload=function(){

    function Pokemon(name,abilities,type,weakness,thumbnailImage,number,height,weight){
        //private properties
        var name = name ? name : null;
        var abilities = abilities ? abilities : [];
        var type = type ? type : [];
        var weakness = weakness ? weakness : [];
        var thumbnailImage = thumbnailImage ? thumbnailImage : null;
        var number = number ? number : null;
        var height = height ? height : null;
        var weight = weight ? weight : null;

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
  
    var element;
    var button;
    var button_afficher;

    function affichageHome(){
        var menu = document.createElement("div");
        menu.setAttribute("class","menu");
        var titre = document.createElement("h3");
        var img = document.createElement('img');
        img.setAttribute("class","logo");
        img.src = 'img/image.png';
        var content_h3 = document.createTextNode("Bienvenue sur le POKEDECK");
        button = document.createElement("button");
        button_afficher = document.createElement("button");
        var content_button_afficher = document.createTextNode("Afficher tout les pokemons");
        button_afficher.setAttribute("class","style-button");
        button.setAttribute("class","style-button-search");
        var br = document.createElement("br");
        var br2 = document.createElement("br");

        var div_search = document.createElement("div");
        
    
    
        var searchbar = document.createElement("input");
        var selectbar = document.createElement("select");
        selectbar.id = "searchCrit";
    
        var list = ["name","type","weakness"];
        for (var i = 0; i < list.length; i++) {
            var option = document.createElement("option");
            option.value = list[i];
            option.text = list[i];
            selectbar.appendChild(option);
        }
    
    
        titre.appendChild(content_h3);
        button_afficher.appendChild(content_button_afficher);
    
        element = document.getElementById("root");
      
        
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
    };

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


    function createTextEl(tagName, text){
      const el = document.createElement(tagName);
      const txt = document.createTextNode(text);
      el.appendChild(txt);
      return el;
    }

    function appendChilds(parent, childs) {
      childs.forEach(c => { parent.appendChild(c) });
      return parent;
    }


    function createCard(pokemon) {
        if(element){
          element.innerHTML = '';
        }
        element = document.createElement('div');
        console.log(pokemon);
        const card = document.createElement('div');
        card.classList.add('card');
        var button_retour = document.createElement("button");
        var content_button_retour = document.createTextNode("Retour");

        const img = document.createElement('img');
        img.setAttribute('src', pokemon.getThumbnailImage());

        const h1 = document.createTextNode(`${pokemon.getName()} - #${pokemon.getNumber()}`);
        const infoWrap = document.createElement('div');
        infoWrap.style.display = 'flex';
        infoWrap.style.flexDirection = 'column';
        const abilitiesText = createTextEl('p', `Abilities : ${pokemon.getAbilities()}`);
        const heightText = createTextEl('p',`Height : ${pokemon.getHeight()}`);
        const weightText = createTextEl('p', `Weight : ${pokemon.getWeight()}`);
        const typesText = createTextEl('p',`Types : ${pokemon.getType()}`);
        const weaknessText = createTextEl('p', `Weakness : ${pokemon.getWeakness()}`);

        card.appendChild(h1);
        card.appendChild(img);
        appendChilds(infoWrap, [abilitiesText, heightText, weightText, typesText, weaknessText]);
        card.appendChild(infoWrap);
        button_retour.appendChild(content_button_retour);
        element.appendChild(button_retour);
        element.appendChild(card);
        
        const body = document.querySelector('body');
        body.appendChild(element);

        button_retour.addEventListener("click", function(){
            history.pushState('', '', '/');
            card.remove();
            button_retour.remove();
            affichageHome();
            affichageEventHome();
        });
        
    }

    function getInfo(id) {
      id = id.split('/')[1];
      console.log(id);
      return new Promise((resolve, reject) => {
        getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json', (err, data) => {
          if (data) {
            resolve(data.filter((pokemon) => { return pokemon["id"] == id })[0]);
          }
          if (err) {
            reject(new Error('Pokemon non dispo'));
          }
        })
      });
    }


    var afficherListe = function(){
        var ul = document.createElement('ul');
        ul.setAttribute('id','pokemonList');           
        document.getElementById('root').appendChild(ul); 

        getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json',
        function(err, data) {
        if (err !== null) {
            alert('Impossible : ' + err);
        } else {
            data.forEach( pokemon => {
              const li = document.createElement('li');
              li.setAttribute('class','item');
              ul.appendChild(li);
              const div = document.createElement('div');
              li.appendChild(div);
              const label = document.createElement('label');
              const image = document.createElement('img');
              div.appendChild(label);

              const name = document.createTextNode("Nom : " + prop_access(pokemon,"data.name"));
              image.setAttribute("src", prop_access(pokemon,"data.ThumbnailImage"));
              image.setAttribute("width", "150");
              image.setAttribute("height", "150");
              image.setAttribute("alt", prop_access(pokemon,"data.name"));
              label.appendChild(name);
              div.appendChild(image);
              li.addEventListener('click', function (e) {
                e.preventDefault();
                var pokemon_obj = new Pokemon(pokemon['name'],pokemon['abilities'],pokemon['type'],pokemon['weakness'],pokemon['ThumbnailImage'],pokemon['number'],pokemon['height'],pokemon['weight']);
                history.pushState(`/${pokemon['id']}`, '', `/${pokemon['id']}`);
                createCard(pokemon_obj);
              })
            });
           
        }
        
        });
    };

    var searchListe = function(){
        if(document.getElementById("pokemonList")){
            document.getElementById("pokemonList").remove();
        }
        var ul = document.createElement('ul');
        ul.setAttribute('id','pokemonList');
        document.getElementById('root').appendChild(ul);
        var criteria = document.getElementById('searchCrit').value;
        var string_verif = type_check_v1(document.getElementById('searchbar').value,"string");
        if(string_verif){
            var search = document.getElementById('searchbar').value;
            if(document.getElementById('alert')){
                document.getElementById('alert').remove();
            }
        } else {
            document.getElementById("title").insertAfter("<p style='color:red' id='alert'>The search param is not a string</p>");
        }

        getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json',
        function(err, data) {
            console.log(data);
        if (err !== null) {
            alert('Impossible : ' + err);
        } else {
         //   var pokemons = [];
            data.forEach( pokemon => {
                var criteriavalidation = false;
                var re = new RegExp(tolower(search), 'gi');
                if((criteria == "type" || criteria == "weakness") && tolower(prop_access(pokemon,"data."+criteria)).indexOf(tolower(search)) >= 0){
                    criteriavalidation = true;
                } else if(criteria == "name" && tolower(prop_access(pokemon,"data.name")).match(re)) {
                    criteriavalidation = true;
                }
                if(search !== null && criteriavalidation == true){
                    const li = document.createElement('li');
                    li.setAttribute('class','item');
                    ul.appendChild(li);
                    const div = document.createElement('div');
                    li.appendChild(div);
                    const label = document.createElement('label');
                    const image = document.createElement('img');
                    div.appendChild(label);

                    const name = document.createTextNode("Nom : " + prop_access(pokemon,"data.name"));
                    image.setAttribute("src", prop_access(pokemon,"data.ThumbnailImage"));
                    image.setAttribute("width", "150");
                    image.setAttribute("height", "150");
                    image.setAttribute("alt", prop_access(pokemon,"data.name"));
                    label.appendChild(name);
                    div.appendChild(image);
                    li.addEventListener('click', function (e) {
                      e.preventDefault();
                      var pokemon_obj = new Pokemon(pokemon['name'],pokemon['abilities'],pokemon['type'],pokemon['weakness'],pokemon['ThumbnailImage'],pokemon['number'],pokemon['height'],pokemon['weight']);
                      history.pushState(`/${pokemon['id']}`, '', `/${pokemon['id']}`);
                      createCard(pokemon_obj);
                    });
                }
            });
        }
        
        });
    };

    const path = location.pathname;
    switch (path) {
      case '/':
        affichageHome();
        affichageEventHome();
        break;
      case '/all':
        affichageHome();
        afficherListe();
        break;
      default:
        console.log('here');
        getInfo(path).then(result => createCard(result) , reject => new Error(reject))
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
        getInfo(e.state).then(result => createCard(result) , reject => new Error(reject))
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
    
        const props = path.split('.');
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
            for (var i = 0; i < string.length; i++) {
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

    button_afficher.addEventListener("click", function(){
      history.pushState('all', '', '/all');
      afficherListe();
    });
    button.addEventListener("click", function(){
        searchListe();
    });
  };

};