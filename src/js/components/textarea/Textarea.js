import {createTextarea} from './textarea.template';

export class Textarea {
    constructor(options) {
        this.root = options.root;
		this.dispatcher = options.dispatcher;
		this.wrapper = this._createWrapper();
		this._convertData = this._convertData.bind(this);
        this._initListeners();
    }

	/**
	 * инициализация слушателей
	 */
    _initListeners() {
        this.root.addEventListener('click', (event) => {
            if (event.target.closest(`.textarea_button`)) {
                const data = this.root.querySelector(`#textarea`).textContent;
                this.dispatcher.emit('textarea::newData', data);
            }
		});

		this.dispatcher.subscribe('tree::newData', (data) => {
			const nodes = data.map(this._convertData);
			this.root.querySelector(`#textarea`).textContent = JSON.stringify(nodes);
		});
    }


	/**
	 * Преобразование данных, фильтрация "лишних" полей
	 * @todo deprecated
	 */
	_convertData(data) {
		return {...data}
	}

	/**
	 * получить представление в виде html-строки 
	 */
    toHTML() {
		this.wrapper.innerHTML = createTextarea();
		return this.wrapper;
	}
	
	
	_createWrapper() {
		const element = document.createElement('div');
		element.classList.add('textarea');
		return element;
	}
}