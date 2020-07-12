import {createNode} from './node.template';
import {randomId} from '../../core/utils';

export class Node {
    constructor(options) {
        // this.root = options.root;
		this.nodeId = options.nodeId || randomId();
		this._init(options);
		
	}

	toHTML() {
		return createNode(this);
	}
	
	_init(data) {
		Object.entries(this._parseData(data)).forEach(([key, value]) => {
			this[key] = value;
		})
	}
	
	_parseData(data) {
		let result = {};
		Object.entries(data).forEach( ([key, value]) => {
			if (value instanceof Array) {
				result[key] = value.map( element => {
					return element instanceof Object ? this._parseData(element) : element; 
				});
			} else if (value instanceof Object) {
				result[key] = new Node(value);
			} else {
				result[key] = value
			}
		});
		return result;
	}
}