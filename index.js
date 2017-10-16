"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib = {
    Embed(Base) {
        return class extends Base {
            RegisterEvent(event, callback) { }
            RegisterMessage(eventOrModule, eventOrCallback, callback) { }
            UnregisterEvent(event) { }
            UnregisterMessage(event) { }
            SendMessage(event, ...parameters) { }
        };
    },
};
exports.default = lib;
