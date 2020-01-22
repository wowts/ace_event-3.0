"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wow_mock_1 = require("@wowts/wow-mock");
const lib = {
    Embed(Base) {
        return class extends Base {
            constructor(...args) {
                super(args);
                this._event = {};
                this._eventFrame = wow_mock_1.CreateFrame("Frame");
                this._eventFrame.SetScript("OnEvent", (frame, event, ...parameters) => {
                    const callback = this._event[event];
                    if (callback) {
                        callback(event, ...parameters);
                    }
                });
            }
            RegisterEvent(event, callback) {
                this._eventFrame.RegisterEvent(event);
                if (callback && typeof (callback) !== "string")
                    this._event[event] = callback;
            }
            RegisterMessage() { }
            UnregisterEvent() { }
            UnregisterMessage() { }
            SendMessage() { }
        };
    },
};
exports.default = lib;
