"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
_1.default.command("scrap [url]", "Make HTTP request", (yarg) => yarg.option("url", {
    alias: "u",
    type: "string",
    default: "https://cdn.delivr.net/gh/Avrel3/Avrel3/include.json",
    describe: "URL to make HTTP request",
}), function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(argv.url);
            console.log(res.data);
        }
        catch (e) {
            console.error(e.message);
        }
    });
});
_1.default.command("uid [len]", "Random crypto UUID", (yarg) => {
    yarg.positional("len", {
        type: "number",
        default: 8,
        describe: "Random UUID hex string",
    });
}, function (argv) {
    console.log(crypto_1.default.randomBytes(argv.len).toString("hex"));
});
_1.default.command({
    command: "*",
    handler() {
        _1.default.showHelp();
    },
});
exports.default = _1.default;
