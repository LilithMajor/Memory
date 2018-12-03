import {EventBus} from "../utils/EventBus.js";

const template = `
<root></root>
<style>
    root{
     display:block; 
     background-color: transparent; 
     background-image: url(images/back.svg);
     background-position : 50% 50%; 
     background-size: 80%; 
     background-repeat: no-repeat; 
     transition : all 0.3s; 
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
    }
</style>`;

class GameImage extends HTMLElement{

    static get observedAttributes(){
        return ["turned"];
    }

    get turned() {
        return JSON.parse(this.getAttribute("turned").toLowerCase());
    }

    set turned(value) {
        this.setAttribute("turned", value);
    }

    set found(value){
        this.setAttribute("found", value);
    }

    get found(){
        return JSON.parse(this.getAttribute("found").toLowerCase());
    }

    constructor(){
        super();
        this.root = this.attachShadow({mode : "open"});

        //Init properties
        this.found = false;
        this.turned = false;
        this.path = null;

        this.addEventListener('click', e =>{
            if(this.turned === false && this.found === false){
                this.root.querySelector("root").style.backgroundImage = "url(images/game/" + this.path + ")";
                this.turned = true;
                EventBus.post("onTurnImage");
            }
        });

        EventBus.post("onCreateImage", this);
    }


    /**
     * Méthode appelée à chaque insertion d'un élément dans le DOM, rendu HTML à effectuer ici
     */
    connectedCallback(){
        this.root.innerHTML = template;
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName==="turned" && newValue == "false"){
            setTimeout(() => {
                this.root.querySelector("root").style.backgroundImage = "url(images/back.svg)";
            }, 500);
        }
    }
}

customElements.define("game-image", GameImage);