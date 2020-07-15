export const randomId = () => {
	let rand = Math.random() * 1000 * Date.now();
	return Math.round(rand).toString().slice(0, 5);
}

export const get_value = (obj, path) => {
    for (let i = 0, path = path.split('.'), len = path.length; i < len; i ++){
        obj = obj[path[i]];
    };
    return obj;
};