import { LuaObj } from "@wowts/lua";
import { AceModule } from "@wowts/tsaddon";
import { Constructor, Library } from "@wowts/tslib";
import { CreateFrame, UIFrame } from "@wowts/wow-mock";

export interface AceEvent {
    RegisterEvent<T>(
        event: T,
        callback: (e: T, ...parameters: any[]) => void
    ): void;
    RegisterEvent(
        event: string,
        callback: (event: string, ...parameters: any[]) => void
    ): void;
    RegisterEvent(event: string, callback: string): void;
    RegisterEvent(event: string): void;
    RegisterMessage(
        event: string,
        callback: (event: string, ...parameters: any[]) => void
    ): void;
    RegisterMessage(
        module: AceModule,
        event: string,
        callback: (event: string, ...parameters: any[]) => void
    ): void;
    RegisterMessage(event: string, callback: string): void;
    RegisterMessage(event: string): void;
    UnregisterEvent(event: string): void;
    UnregisterMessage(event: string): void;
    SendMessage(event: string, ...parameters: any[]): void;
}

export type Callback = (...parameters: any[]) => void;

const lib: Library<AceEvent> = {
    Embed<T extends Constructor<{}>>(Base: T): Constructor<AceEvent> & T {
        return class extends Base {
            private _eventFrame: UIFrame;
            private _event: LuaObj<Callback> = {};
            constructor(...args: any[]) {
                super(args);
                this._eventFrame = CreateFrame("Frame");
                this._eventFrame.SetScript(
                    "OnEvent",
                    (frame: UIFrame, event: string, ...parameters: any[]) => {
                        const callback = this._event[event];
                        if (callback) {
                            callback(event, ...parameters);
                        }
                    }
                );
            }
            public RegisterEvent<T>(
                event: T,
                callback: (e: T, ...parameters: any[]) => void
            ): void;
            public RegisterEvent(
                event: string,
                callback: (event: string, ...parameters: any[]) => void
            ): void;
            public RegisterEvent(event: string, callback: string): void;
            public RegisterEvent(event: string): void;
            public RegisterEvent(
                event: string,
                callback?: Callback | string
            ): void {
                this._eventFrame.RegisterEvent(event);
                if (callback && typeof callback !== "string")
                    this._event[event] = callback;
            }
            public RegisterMessage(
                event: string,
                callback: (event: string, ...parameters: any[]) => void
            ): void;
            public RegisterMessage(
                module: AceModule,
                event: string,
                callback: (event: string, ...parameters: any[]) => void
            ): void;
            public RegisterMessage(event: string, callback: string): void;
            public RegisterMessage(event: string): void;
            public RegisterMessage(): void {}
            public UnregisterEvent(): void {}
            public UnregisterMessage(): void {}
            public SendMessage(): void {}
        };
    },
};
export default lib;
