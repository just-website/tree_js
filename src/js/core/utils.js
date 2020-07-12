export const randomId = () => {
	let rand = Math.random() * 1000 * Date.now();
	return Math.round(rand).toString().slice(0, 5);
}