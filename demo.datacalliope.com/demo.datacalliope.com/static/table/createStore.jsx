export default function createStore(initialState) {
    let state = initialState;
    const listeners = [];
    function setState(partial) {
        state = Object.assign(Object.assign({}, state), partial);
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }
    function getState() {
        return state;
    }
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    return {
        setState,
        getState,
        subscribe,
    };
}
