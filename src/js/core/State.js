export class State {
    constructor(options) {
        this.nodes = options.nodes;
		this.dispatcher = options.dispatcher;
		this._initListeners();
	}
	
	/**
	 * Получить состояние
	 */
	getState(nodeID) {
		return this.nodes.find( node => {
			console.log(node);
			
			if (node.nodeId === nodeID) {
				return node;
			}
			else if (node.children.length) {
				return this.getState(node.nodeId);
			}
			else {
				return false;
			}
		})
	}
	
	/**
	 * Задать состояние
	 */

	/**
	 * инициализация слушателей
	 */
	_initListeners() {
		this.dispatcher.subscribe('textarea::newData', (data) => {
			if (data) {
				this.data = JSON.parse(data);
				this.dispatcher.emit('state::newData', this.data);
			}
		});
	}
}