export class Dispatcher {
    constructor() {
        this.listeners = {};
    }

    
    subscribe(eventName, callback)
	{
		if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
	}


    unsubscribe(eventName, callback)
	{
		if (!this.listeners[eventName]) {
            return;
        }
        this.listeners[eventName] = this.listeners[eventName].filter( savedCallback => savedCallback != callback);
	}


    emit(eventName, data = null)
	{
		const listeners = this.listeners[eventName];

		if (listeners)
		{
			listeners.forEach(listener => {
                listener(data)
            });
		}
	}

    destroy() {
        for(let eventName in this.listeners) {
            delete this.listeners[eventName];
        }
    }
}