import {createTree} from './tree.template';
import {Node} from '../node/Node';
import { createNode } from '../node/node.template';

export class Tree {
    constructor(options) {
        this.root = options.root;
		this.dispatcher = options.dispatcher;
		this.nodeElementClassName = 'tree__node';
		this.nodeSymbolClassName = 'tree__node-symbol';
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
    addNodes(data) {
        const nodes = data.map( node => {
			if (node.children.length) {
				node.children = node.children.map(this.createNode);
			}
			return this.createNode(node);
		});
		this.nodes.push(...nodes);
		this.toHTML();
		// this.state.nodes = this.nodes;
	}
	
	/**
	 * 
	 * @param {*} targetId 
	 */
	createNode(data) { 
		if (data.children.length) {
			data.children = data.children.map(this.createNode);
		}
		return new Node({
			...data, 
			root: this.root, 
			nodeSymbolClassName: this.nodeSymbolClassName,
			nodeElementClassName: this.nodeElementClassName
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

	// /**
	//  * render
	//  */
	// render() {
	// 	const nodes = this.nodes.map( node => node.toHTML()).join('');
	// 	this.wrapper.innerHTML = createTree(nodes);
	// }

	/**
	 * получить представление в виде html-строки 
	 */
    toHTML() {
		const nodes = this.nodes.map( node => node.toHTML()).join('');
		this.wrapper.innerHTML = createTree(nodes);
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
			if (event.target.closest(`.${this.nodeSymbolClassName}`))
			{
				const nodeElement = event.target.closest(`.${this.nodeElementClassName}`);
				const {node_id} = nodeElement.dataset;
				const targetNode = this.getNode(this.nodes, node_id);
				targetNode.isOpen = !targetNode.isOpen;
				console.log({targetNode});
				this.dispatcher.emit('tree::newData', this.nodes);
				this.toHTML();
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