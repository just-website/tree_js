import {createNode} from './node.template';

export class Node {
    constructor(options) {
        this.root = options.root;
        this.children = options.children.map( node => new Node({node, root: this.root})) || [];
    }

    toHTML() {
        return createNode()
    }
}