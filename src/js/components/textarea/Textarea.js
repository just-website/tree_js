import {createTextarea} from './textarea.template';

export class Textarea {
    constructor(options) {
        this.root = options.root;
        this.dispatcher = options.dispatcher;
        this.buttonClassName = 'textarea_button';
        this.contentClassName = 'textarea_content';
        this.initListeners();
    }

    initListeners() {
        this.root.addEventListener('click', (event) => {
            if (event.target.closest(`.${this.buttonClassName}`)) {
                const content = this.root.querySelector(`.${this.contentClassName}`).textContent;
                this.dispatcher.emit('tree::newContent', content);
            }
        })
    }

    toHTML() {
        return createTextarea({
            buttonClassName: this.buttonClassName,
            contentClassName: this.contentClassName,
        })
    }
}