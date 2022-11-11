"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cmd_1 = __importDefault(require("../cmd"));
const crypto_1 = __importDefault(require("crypto"));
exports.default = cmd_1.default.command("uid", "Random crypto UUID", (yarg) => {
    yarg.positional("len", {
        type: "number",
        default: 8,
        describe: "Random UUID hex string",
    });
}, function (argv) {
    console.log(crypto_1.default.randomBytes(argv.len).toString("hex"));
});
