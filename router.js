import {Json} from './jsonmodule.js';

let PokeRoutes = {
    createCard:function(pokemon) {
       let createTextEl = function(tagName, text){
            let el = document.createElement(tagName);
            let txt = document.createTextNode(text);
            el.appendChild(txt);
            return el;
          }
          let appendChilds =function(parent, childs) {
            childs.forEach(c => { parent.appendChild(c) });
            return parent;
          }
        let  element = document.getElementById("root");
          if(element){
            element.innerHTML = '';
          }
          element = document.createElement('div');
          console.log(pokemon);
          let card = document.createElement('div');
          card.classList.add('card');
          let button_retour = document.createElement("button");
          let content_button_retour = document.createTextNode("Retour");
  
          let img = document.createElement('img');
          img.setAttribute('src', pokemon.getThumbnailImage());
  
          let h1 = document.createTextNode(`${pokemon.getName()} - #${pokemon.getNumber()}`);
          let infoWrap = document.createElement('div');
          infoWrap.style.display = 'flex';
          infoWrap.style.flexDirection = 'column';
          let abilitiesText = createTextEl('p', `Abilities : ${pokemon.getAbilities()}`);
          let heightText = createTextEl('p',`Height : ${pokemon.getHeight()}`);
          let weightText = createTextEl('p', `Weight : ${pokemon.getWeight()}`);
          let typesText = createTextEl('p',`Types : ${pokemon.getType()}`);
          let weaknessText = createTextEl('p', `Weakness : ${pokemon.getWeakness()}`);
  
          card.appendChild(h1);
          card.appendChild(img);
          appendChilds(infoWrap, [abilitiesText, heightText, weightText, typesText, weaknessText]);
          card.appendChild(infoWrap);
          button_retour.appendChild(content_button_retour);
          element.appendChild(button_retour);
          element.appendChild(card);
          
          let body = document.querySelector('body');
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