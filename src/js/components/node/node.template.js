export const createNode = (data) => {
	if (!data) {
		return '';
	}
    return `
		<div class="${data.nodeElementClassName}" data-node_id="${data.nodeId}">
			<div class="${data.nodeSymbolClassName}">${data.isOpen ? '-' : '+'}</div>
			<div class="tree__node-content">
				<div class="tree__node-text">
					${data.content}
				</div>
				<div class="tree__node-children">
					${data.isOpen ? data.children.map(createNode).join('') : ''}
				</div>
			</div>
		</div>
    `
}