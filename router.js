import {Json} from './jsonmodule.js';

var PokeRoutes = {
    createCard:function(pokemon) {
       var createTextEl = function(tagName, text){
            const el = document.createElement(tagName);
            const txt = document.createTextNode(text);
            el.appendChild(txt);
            return el;
          }
          var appendChilds =function(parent, childs) {
            childs.forEach(c => { parent.appendChild(c) });
            return parent;
          }
        var  element = document.getElementById("root");
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
              
              card.remove();
              button_retour.remove();
              history.pushState('', '', '/');
              window.location.reload();
          });
          
      },
    getInfo:function(id) {
        id = id.split('/')[1];
        console.log(id);
        return new Promise((resolve, reject) => {
          Json.getJSON('https://raw.githubusercontent.com/cheeaun/repokemon/master/data/pokemon-list.json', (err, data) => {
            if (data) {
              resolve(data.filter((pokemon) => { return pokemon["id"] == id })[0]);
            }
            if (err) {
              reject(new Error('Pokemon non dispo'));
            }
          })
        });
      }
  
}


export { PokeRoutes };