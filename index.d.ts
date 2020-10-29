import { AceModule } from "@wowts/tsaddon";
import { Library } from "@wowts/tslib";
export interface AceEvent {
    RegisterEvent<T>(event: T, callback: (e: T, ...parameters: any[]) => void): void;
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
export declare type Callback = (...parameters: any[]) => void;
declare const lib: Library<AceEvent>;
export default lib;
