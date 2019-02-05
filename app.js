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
        element.innerHTML = '';
        const card = document.createElement('div');
        card.classList.add('card');
        const abilities = pokemon['abilities'].join(' - ');
        const types = pokemon['type'].join(' - ');
        const weakness = pokemon['weakness'].join(' - ');

        const img = document.createElement('img');
        img.setAttribute('src', pokemon['ThumbnailImage']);

        const h1 = document.createTextNode(`${pokemon['name']} - #${pokemon['number']}`);
        const infoWrap = document.createElement('div');
        infoWrap.style.display = 'flex';
        infoWrap.style.flexDirection = 'column';
        const abilitiesText = createTextEl('p', `Abilities : ${abilities}`);
        const heightText = createTextEl('p',`Height : ${pokemon['height']}`);
        const weightText = createTextEl('p', `Weight : ${pokemon['weight']}`);
        const typesText = createTextEl('p',`Types : ${types}`);
        const weaknessText = createTextEl('p', `Weakness : ${weakness}`);

        card.appendChild(h1);
        card.appendChild(img);
        appendChilds(infoWrap, [abilitiesText, heightText, weightText, typesText, weaknessText]);
        card.appendChild(infoWrap);
        element.appendChild(card);
    }

    function getInfo(id) {
      return new Promise((resolve, reject) => {
        getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json', (err, data) => {
          if (data) {
            resolve(data.filter((pokemon) => { return pokemon["id"] === id })[0]);
          }
          if (err) {
            reject(new Error('Pokemon non dispo'));
          }
        })
      });
    }


    var afficherListe = function(){
        element.innerHTML = '';
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
                history.pushState(pokemon['id'], '', `/${pokemon['id']}/${pokemon['name']}`);
                createCard(pokemon);
              })
            });
        }
        
        });
    };


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


    document.getElementsByTagName("input")[0].setAttribute("id", "searchbar");
    document.getElementById("searchbar").placeholder = "Rechercher...";

    button_afficher.addEventListener("click", function(){
      history.pushState('all', '', '/all');
      afficherListe();
    });
};