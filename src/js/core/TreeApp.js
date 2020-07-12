import '../../scss/main.scss';
import {Dispatcher} from './Dispatcher';
import {Textarea} from '../components/textarea/Textarea';
import {Tree} from '../components/tree/Tree';

export class TreeApp {
    constructor(options) {
        this.root = document.querySelector(options.selector);
        this.dispatcher = new Dispatcher;
        this.textarea = new Textarea({
            root: this.root,
            dispatcher: this.dispatcher,
        });
        this.tree = new Tree({
            root: this.root,
            dispatcher: this.dispatcher,
		});
		this._initListeners();
    }

	/**
	 * Рендеринг вего приложения
	 */
    render() {
        try {
            this.root.innerHTML = `
                ${this.textarea.toHTML()}
			`;
			this.root.append(this.tree.toHTML())
        }
        catch (error) {
            console.log('Ошибка рендеринга', error);
            return error;
        }
	}
	
	/**
	 * инициализация слушателей
	 */
    _initListeners() {
		this.dispatcher.subscribe('view::render', () => {
			this.render();
		})
	}
}