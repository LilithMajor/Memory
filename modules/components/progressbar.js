

const template = `
    <style>
        .bar-container{
            width: 100%;
            height: 10px;
            background: transparent;
            border-radius: 28px;
            border: solid 1px black;
        }
        .bar{
            background: #7DBEBD;
            display: block;
            height: 10px;
            border-radius: 28px;
        }
    </style>
`;

class Progress extends HTMLElement{

    static get observedAttributes(){
        return ["value"];
    }

    set max(value){
        this.setAttribute("max", value);
    }

    get max(){
        return this.getAttribute("max");
    }

    get value(){
        return  this.getAttribute("value");
    }

    set value(value){
        this.setAttribute("value", value);
    }

    constructor(){
        super();
        this.root = this.attachShadow({mode : "open"});
        this.max = 100;
        this.value = 100;
    }

    connectedCallback(){
        const dynamicTemplate = `
           <div class="bar-container">
                       <div class="bar" max="${this.max}" value="${this.max}"></div>
           </div>
        `;
        this.root.innerHTML = template + dynamicTemplate;
        this.root.querySelector(".bar").style.width = this.max + "%";
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName==="value"){
            this.root.querySelector(".bar").style.width = newValue + "%";
        }
    }

}

customElements.define("game-progress", Progress);