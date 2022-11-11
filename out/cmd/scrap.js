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
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
exports.default = (0, yargs_1.command)("scrap [url]", "Make HTTP request", (yarg) => {
    yarg.positional("url", {
        type: "string",
        default: "https://cdn.delivr.net/gh/Avrel3/Avrel3/include.json",
        describe: "URL to make HTTP request",
    });
}, function (argv) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (e) {
            console.log(e.message);
        }
    });
});
