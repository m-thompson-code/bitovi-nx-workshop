import StacheElement from "can-stache-element";
import view from "./app.stache";
import "./app.css";
export class App extends StacheElement {
    static view = view;
}

customElements.define('can-app', App);
