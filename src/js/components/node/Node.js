import { createNode } from './node.template';
import { randomId } from '../../core/utils';

export class Node {
	#nodePath;
	constructor(options) {
		this._init(options);
		this.#nodePath = options.nodePath || '/';
		console.log({node: this});
		
	}

	toHTML() {
		return createNode(this);
	}

	_init(data) {
		Object.entries(data).forEach(([key, value]) => {
			if (key !== 'nodePath') {
				if (value instanceof Array) {
					this[key] = value.map( element => {
						return this._parseData(element);
					});
				}
				else if (value instanceof Object) {
					this[key] = new Node({...value, nodePath: key});
				}
				else this[key] = value;
			}
		})
	}

	_parseData(data) {
		if (data instanceof Array) {
			return data.map(element => {
				return element instanceof Object ? this._parseData(element) : element;
			});
		} else if (data instanceof Object) {
			return new Node({...data, nodePath: this.#nodePath + '1'});
		} else {
			return data
		}
	}
}