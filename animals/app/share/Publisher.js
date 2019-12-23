export class Publisher {
    constructor() {
        this.subscriptions = {};
        this.methods = {
            subscribe: this.subscribe.bind(this),
            publish: this.publish.bind(this)
        };
    }

    checkSubscription(event) {
        if (!this.subscriptions.hasOwnProperty(event)) {
            this.subscriptions[event] = [];
        }
    }
    subscribe(event, func) {
        this.checkSubscription(event);
        this.subscriptions[event].push(func);
    }
    publish(event, data) {
        this.checkSubscription(event);
        this.subscriptions[event].forEach(sub => sub(data));
    }
}