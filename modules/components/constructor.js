import {EventBus} from "../utils/EventBus.js";
import "./progressbar.js"


const templateStyle = `
    <style>
        .game{
            width: 500px;
            margin: auto;
            padding: 10px;
            border: 1px solid black;
            background: rgba(80,90,50,0.7);
            color: white;
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
        }
        .game button{
              background: #3498db;
              background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
              background-image: -moz-linear-gradient(top, #3498db, #2980b9);
              background-image: -ms-linear-gradient(top, #3498db, #2980b9);
              background-image: -o-linear-gradient(top, #3498db, #2980b9);
              background-image: linear-gradient(to bottom, #3498db, #2980b9);
              border-radius: 28px;
              font-family: Arial;
              color: #ffffff;
              font-size: 20px;
              padding: 10px 20px 10px 20px;
              text-decoration: none;
        }
        .game button:hover{
          background: #3cb0fd;
          background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
          background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
          background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
          text-decoration: none;
        }
        p, h1{
            margin: 10px;
        }
    </style>`;

const templateLoad =`
    <div class="game">
        <h1>Welcome to Memory</h1>
        <p>Choose difficulty</p>
        <button type="button" value="easy">Easy</button>
        <button type="button" value="medium">Medium</button>
        <button type="button" value="hard">Hard</button>
    </div>
`;

const templateWin = `
    <div class="game">
        <p>You Won !</p>
        <button onclick='window.location.reload();'>Replay</button>
    </div>
`;

const templateLoss = `
    <div class="game">
        <p>You Lost !</p>
        <button onclick='window.location.reload();'>Replay</button>
    </div>
`

class Constructor extends HTMLElement{

    constructor(){
        super();
        this.root = this.attachShadow({mode : "open"});
        this.lives = null;
        this.totalLives = 100;

        EventBus.subscribe("onWin", ()=>{
            this.root.innerHTML = templateStyle + templateWin;
        })

        EventBus.subscribe("onLoss", ()=>{
            this.totalLives -= 100 / this.lives;
            if(this.totalLives <= 0){
                this.root.innerHTML = templateStyle + templateLoss;
            }else{
                this.root.querySelector("game-progress").value = this.totalLives;
            }
        })
    }

    connectedCallback(){
        this.root.innerHTML = templateStyle + templateLoad;
        this.root.querySelectorAll("button").forEach(button => button.addEventListener("click", e => this.startGame(e)));
    }

    startGame(e){
        let numberImages;
        let repeatImages;
        if(e.target.value === "easy"){
            numberImages = 4;
            repeatImages = 2;
            this.lives = 4;
        }else if(e.target.value === "medium"){
            numberImages = 6;
            repeatImages = 2;
            this.lives = 6;
        }else{
            numberImages = 7;
            repeatImages = 3;
            this.lives = 18;
        }
        const template = `
          <div class="game">
            <game-grid numberImages = "${numberImages}" repeatImages = "${repeatImages}"></game-grid>
            <p>Images repeated ${repeatImages} times</p>
            <p>Number of attempts allowed : ${this.lives}</p>
            <game-progress class="progress"></game-progress>
            <div id="result"></div>
          </div>
        `
        this.root.innerHTML = templateStyle + template;
    }
}

customElements.define("game-constructor", Constructor);
