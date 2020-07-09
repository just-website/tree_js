import {createNode} from './node.template';

export class Node {
    constructor(options) {
        this.root = options.root;
		this.children = options.children?.length ? options.children.map( node => new Node({...node, root: this.root})) : [];
		this.nodeElementClassName = options.nodeElementClassName;
		this.nodeSymbolClassName = options.nodeSymbolClassName;
		this.content = options.content;
		this.isOpen = options.isOpen;
		this.nodeId = options.nodeId;
    }

    toHTML() {
        return createNode(this);
    }
}