import config from "../config.js";
export default class MySection extends HTMLElement{
    static url = import.meta.url
    static async components(){
        return await(await fetch(config.uri(MySection.url))).text();
    }
    constructor(){
        super();
        this.attachShadow({mode:"open"});

    }
    handleEvent(e){
        (e.type === "submit") ? this.enviarWorker(e)
        :undefined;
        
    }
    enviarWorker(e){
        console.log(e);
        e.preventDefault()
    }
    connectedCallback(){
        Promise.resolve(MySection.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.MybSection = this.shadowRoot.querySelector("form");
            this.MybSection.addEventListener("submit",this.handleEvent.bind(this))
            const gif = this.getAttribute('gif')
            const gs = gif !== null ? '?type=gif ': ''
            this.innerHTML = '<img src="http://api.pandarosso.eu/random"/>'
        })
    }
}
console.log(config.name);
customElements.define(config.name(MySection.url), MySection);
