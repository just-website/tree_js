export const createNode = (data) => {
	console.log({node: data});
	
	if (!data) {
		return '';
	}
    return `
		<div class="tree__node" data-node_id="${data.nodeId}">
			<div class="tree__node-content">
				{${parseData(data)}},
			</div>
		</div>
    `
}

function parseValue(data) {
	if (data instanceof Array) {
		return `
			[${data.map( parseValue ).join('')}]
			
		`
	}
	else if (data instanceof Object) {
		return `
			${createNode(data)}
		`
	} else return data
}

function parseData(data) {
	return Object.entries(data).map(([key, value]) => {
		return `
			<div class="tree__node-property">
				<div class="tree__node-property-key">
					${key}: 
				</div>
				<div class="tree__node-property-value">
					${parseValue(value)}
				</div>
			</div>
		`
	}).join('');
}
