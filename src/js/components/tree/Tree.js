import {createTree} from './tree.template';
import {Node} from '../node/Node';

export class Tree {
    constructor(options) {
        this.root = options.root;
		this.dispatcher = options.dispatcher;
		this.wrapper = this._createWrapper();
		this.nodes = [];
		this.dragble = false;
		this.createNode = this.createNode.bind(this);
		this._initListeners();
    }

	/**
	 * Добавить узлы
	 *
	 * @param {object} data - узлы дерева 
	 */
    addNodes(data, position = '/') {
		let nodes = null;
		if (data instanceof Array) {
			nodes = data.map( (node) => this.createNode(node));
		} else if (data instanceof Object) {
			nodes = this.createNode(data)
		}
		this._add(nodes, position);
		this.toHTML();
		console.log(this.nodes);
		
	}

	_add(data, position) {
		if (position === '/') {
			if (!(data instanceof Array)) {
				data = [data]
			}
			this.nodes = [...this.nodes, ...data];
		}
	}
	
	/**
	 * 
	 * @param {*} targetId 
	 */
	createNode(data) { 
		return new Node({
			...data
		})
	}

	/**
	 * Найти узел
	 * 
	 * @param {string} nodeID - идентификатор узла 
	 */
	getNode(data, targetId) {
		let result = null;
		for (let i = 0; i < data.length; i++) {
			if (targetId === data[i].nodeId) {
				result = data[i];
				break;
			}
			else if (data[i].children.length) {
				result = this.getNode(data[i].children, targetId);
			}
		}
		return result;
	}

	/**
	 * получить представление в виде html-строки 
	 */
    toHTML() {
		this.wrapper.innerHTML = createTree(this.nodes);
		return this.wrapper;
    }

	/**
	 * инициализация слушателей
	 */
    _initListeners() {
        this.root.addEventListener('mousedown', () => {
            this.dragble = true;
            console.log('tree dragble', this.dragble);
            
		})
		
        this.root.addEventListener('mouseup', () => {
            this.dragble = false;
            console.log('tree dragble', this.dragble);
		});

		this.root.addEventListener('click', (event) => {
			const nodeElement = event.target.closest(`.tree__node`);
			if (nodeElement) {
				const {node_id} = nodeElement.dataset;
				const targetNode = this.getNode(this.nodes, node_id);
				console.log(targetNode);
				// targetNode.isOpen = !targetNode.isOpen;
				// this.dispatcher.emit('tree::newData', this.nodes);
				// this.toHTML();
			}
		});
		this.dispatcher.subscribe('textarea::newData', (data) => {
			if (!data) {
				return;
			}
			this.nodes = [];
			this.addNodes(JSON.parse(data));
			this.dispatcher.emit('tree::newData', this.nodes);
		})
	}
	
	_createWrapper() {
		const element = document.createElement('div');
		element.classList.add('tree');
		element.id = 'tree_view';
		return element;
	}
}