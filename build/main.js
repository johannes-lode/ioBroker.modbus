"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModbusAdapter = void 0;
const modbus_1 = __importDefault(require("@iobroker/modbus"));
class ModbusAdapter extends modbus_1.default {
    constructor(options = {}) {
        super('modbus', options, {
            onBeforeReady: async () => {
                // Backwards compatibility
                if ((!this.config.params.host && this.config.params.bind) ||
                    // @ts-expect-error backwards compatibility
                    (this.config.params.pulseTime === undefined && this.config.params.pulsetime !== undefined)) {
                    const obj = await this.getForeignObjectAsync(`system.adapter.${this.namespace}`);
                    if (obj) {
                        // @ts-expect-error backwards compatibility
                        obj.native.params.pulseTime ||= this.config.params.pulsetime;
                        delete obj.native.params.pulsetime;
                        obj.native.params.host ||= this.config.params.bind;
                        await this.setForeignObjectAsync(`system.adapter.${this.namespace}`, obj);
                    }
                }
            },
        });
    }
}
exports.ModbusAdapter = ModbusAdapter;
// If started as allInOne mode => return function to create instance
if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options) => new ModbusAdapter(options);
}
else {
    // otherwise start the instance directly
    (() => new ModbusAdapter())();
}
//# sourceMappingURL=main.js.map