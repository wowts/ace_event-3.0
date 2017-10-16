import { AceModule } from "@wowts/tsaddon";
import { Constructor, Library } from "@wowts/tslib";

export interface AceEvent {
    RegisterEvent(event: "PLAYER_ENTERING_WORLD", callback: (event: string) => void): void;
    RegisterEvent(event: "UNIT_AURA", callback: (event: string, unitId: string) => void): void;
    RegisterEvent(event: string, callback: (event: string, ...parameters: any[]) => void): void;
    RegisterEvent(event: string, callback: string): void;
    RegisterEvent(event: string): void;
    RegisterMessage(event: string, callback: (event: string, ...parameters: any[]) => void): void;
    RegisterMessage(module: AceModule, event: string, callback: (event: string, ...parameters: any[]) => void): void;
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
            public RegisterEvent(event: "PLAYER_ENTERING_WORLD", callback: (event: string) => void): void;
            public RegisterEvent(event: "UNIT_AURA", callback: (event: string, unitId: string) => void): void;
            public RegisterEvent(event: string, callback: (event: string, ...parameters: any[]) => void): void;
            public RegisterEvent(event: string, callback: string): void;
            public RegisterEvent(event: string): void;
            public RegisterEvent(event: string, callback?: Callback | string): void {}
            public RegisterMessage(event: string, callback: (event: string, ...parameters: any[]) => void): void;
            public RegisterMessage(module: AceModule, event: string, callback: (event: string, ...parameters: any[]) => void): void;
            public RegisterMessage(event: string, callback: string): void;
            public RegisterMessage(event: string): void;
            public RegisterMessage(eventOrModule: string | AceModule, eventOrCallback?: Callback | string, callback?: Callback): void {}
            public UnregisterEvent(event: string): void{}
            public UnregisterMessage(event: string): void{}
            public SendMessage(event: string, ...parameters: any[]): void {}
        };
    },
};
export default lib;
