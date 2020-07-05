import '../../scss/main.scss';
import {State} from './State';
import {Dispatcher} from './Dispatcher';
import {Textarea} from '../components/textarea/Textarea';
import {Tree} from '../components/tree/Tree';

export class TreeApp {
    constructor(options) {
        this.root = document.querySelector(options.selector);
        this.dispatcher = new Dispatcher;
        this.state = new State({
            dispatcher: this.dispatcher,
        });
        this.textarea = new Textarea({
            root: this.root,
            dispatcher: this.dispatcher,
            state: this.state
        });
        this.tree = new Tree({
            root: this.root,
            dispatcher: this.dispatcher,
            state: this.state
        });
    }

    render(json) {
        try {
            let data = {};
            if (json) {
                data = JSON.parse(json);
            }
            this.root.innerHTML = `
                ${this.textarea.toHTML(data)}
                ${this.tree.toHTML(data)}
            `
        }
        catch (error) {
            console.log('Ошибка рендеринга', error);
            return error;
        }
    }
}