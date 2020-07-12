// TODO: выпилить
export const createTree = (data = '') => {
    return `
        <div>
            ${data.map( node => node.toHTML()).join('')}
        </div>
    `
}