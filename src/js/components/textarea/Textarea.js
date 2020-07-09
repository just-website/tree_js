import {createTextarea} from './textarea.template';

export class Textarea {
    constructor(options) {
        this.root = options.root;
        this.dispatcher = options.dispatcher;
        this.buttonClassName = 'textarea_button';
		this.contentClassName = 'textarea_content';
		this._convertData = this._convertData.bind(this);
        this._initListeners();
    }

	/**
	 * инициализация слушателей
	 */
    _initListeners() {
        this.root.addEventListener('click', (event) => {
            if (event.target.closest(`.${this.buttonClassName}`)) {
                const data = this.root.querySelector(`.${this.contentClassName}`).textContent;
                this.dispatcher.emit('textarea::newData', data);
            }
		});
		this.dispatcher.subscribe('tree::newData', (data) => {
			const nodes = data.map(this._convertData);
			this.root.querySelector(`.${this.contentClassName}`).textContent = JSON.stringify(nodes);
		});
    }


	/**
	 * Преобразование данных, фильтрация "лишних" полей
	 */
	_convertData(data) {
		let {nodeId, isOpen, content, children} = data;
		if (children.length) {
			children = children.map(node => this._convertData(node));
		}
		return {nodeId, isOpen, content, children}
	}

	/**
	 * получить представление в виде html-строки 
	 */
    toHTML() {
        return createTextarea({
            buttonClassName: this.buttonClassName,
            contentClassName: this.contentClassName,
        })
    }
}