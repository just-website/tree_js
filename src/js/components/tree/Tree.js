import {createTree} from './tree.template';
import {Node} from '../node/Node';

export class Tree {
    constructor(options) {
        this.root = options.root;
        this.state = options.state;
        this.dispatcher = options.dispatcher;
        this.nodes = [];
        this.dragble = false;
        this.initListeners();
    }

    addNodes(data) {
        const nodes = Object.values(data).map( node => new Node({node, root: this.root}));
        this.nodes.push(nodes);
    }

    toHTML() {
        const nodes = this.nodes.map( node => node.toHTML).join('') || '';
        return createTree(nodes);
    }

    initListeners() {
        this.root.addEventListener('mousedown', () => {
            this.dragble = true;
            console.log(this.dragble);
            
        })
        this.root.addEventListener('mouseup', () => {
            this.dragble = false;
            console.log(this.dragble);
        })
        this.dispatcher.subscribe('tree::newContent', (data) => console.log(data));
    }
}