import {log} from './log_store.js';


export function assert(condition, message) {
    if (!condition) {
        throw message || "my assertion failed";
    }
}
