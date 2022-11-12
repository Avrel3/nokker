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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs/yargs"));
var helpers_1 = require("yargs/helpers");
var enquirer_1 = require("enquirer");
var colorette_1 = require("colorette");
var crypto_1 = __importDefault(require("crypto"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var license_1 = __importDefault(require("./license"));
var git_1 = __importDefault(require("./git"));
var config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "package.json")).toString());
var cli = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .scriptName(config.name)
    .usage("$0 <cmd> [args]")
    .alias("v", "version")
    .alias("h", "help");
cli.command("uid", "Generates random crypto hash", {
    length: {
        alias: "l",
        describe: "Length of the string",
        type: "number",
        default: 8,
    },
}, function (_a) {
    var length = _a.length;
    var res = crypto_1.default.randomBytes(length).toString("hex");
    console.log(res);
});
cli.command("mit", "Creates MIT License", {
    name: {
        alias: "n",
        describe: "Name of the user",
        type: "string",
        default: "",
    },
    year: {
        alias: "y",
        describe: "Year of the copyright",
        type: "number",
        default: new Date().getFullYear(),
    },
}, function (_a) {
    var name = _a.name, year = _a.year;
    return __awaiter(this, void 0, void 0, function () {
        var lic_1, cwd_1, crt, res, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    lic_1 = (0, license_1.default)(name, year), cwd_1 = path_1.default.join(process.cwd(), "LICENSE"), crt = function () {
                        fs_1.default.writeFileSync(cwd_1, lic_1, {
                            encoding: "utf-8",
                        });
                        console.info((0, colorette_1.green)("MIT LICENSE created at ".concat(cwd_1)));
                    };
                    if (!fs_1.default.existsSync(cwd_1)) return [3, 2];
                    return [4, (0, enquirer_1.prompt)({
                            type: "confirm",
                            name: "proceed",
                            message: "Would you like to overwrite the LICENSE file ?",
                        })];
                case 1:
                    res = _b.sent();
                    if (res.proceed)
                        crt();
                    return [2];
                case 2:
                    crt();
                    return [3, 4];
                case 3:
                    e_1 = _b.sent();
                    console.error((0, colorette_1.red)(e_1.message));
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
});
cli.command("clone", "Clone Github repository", {
    user: {
        alias: "u",
        describe: "Username",
        type: "string",
        required: true,
    },
    repo: {
        alias: "r",
        describe: "Repository",
        type: "string",
        required: true,
    },
    branch: {
        alias: "b",
        describe: "Branch",
        type: "string",
        default: "main",
    },
    token: {
        alias: "t",
        describe: "Token",
        type: "string",
    },
}, function (_a) {
    var user = _a.user, repo = _a.repo, branch = _a.branch, token = _a.token;
    return __awaiter(this, void 0, void 0, function () {
        var dir, resp, result, e_2;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    dir = path_1.default.resolve(process.cwd(), repo + "-" + branch);
                    if (!fs_1.default.existsSync(dir)) return [3, 2];
                    return [4, (0, enquirer_1.prompt)({
                            type: "confirm",
                            name: "proceed",
                            message: "Would you like to overwrite with current folder ?",
                        })];
                case 1:
                    resp = _b.sent();
                    (resp.proceed
                        ? function () { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, (0, git_1.default)(user, repo, branch, token)];
                                    case 1:
                                        result = _a.sent();
                                        return [2, console.log("> " + result)];
                                }
                            });
                        }); }
                        : function () { return console.log((0, colorette_1.white)("> ") + (0, colorette_1.yellow)("Cancelled")); })();
                    return [3, 4];
                case 2: return [4, (0, git_1.default)(user, repo, branch, token)];
                case 3:
                    result = _b.sent();
                    return [2, console.log(result)];
                case 4: return [3, 6];
                case 5:
                    e_2 = _b.sent();
                    console.error((0, colorette_1.red)("Task failed"));
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
});
cli.help().recommendCommands().demandCommand().strict().argv;
