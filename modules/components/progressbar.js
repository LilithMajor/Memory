

const template = `
    <style>
        .bar-container{
            width: 100%;
            height: 30px;
            background: black;
        }
        .bar{
            background: #7DBEBD;
            display: block;
            height: 30px;
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
        this.max = this.max || 100;
        this.value = this.value || 100;
        console.log("construct");
    }

    connectedCallback(){
        const dynamicTemplate = `
           <div class="bar-container">
                       <div class="bar" max="${this.max}" value="${this.max}"></div>
           </div>
        `;
        console.log(dynamicTemplate);
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