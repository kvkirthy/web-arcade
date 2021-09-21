"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GamesService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var GamesService = /** @class */ (function () {
    function GamesService(httpClient) {
        this.httpClient = httpClient;
    }
    GamesService.prototype.getBoardGames = function () {
        return this
            .httpClient
            .get(environment_1.environment.boardGameServiceUrl);
    };
    GamesService.prototype.getComments = function (gameId) {
        return this
            .httpClient
            .get(environment_1.environment.commentsServiceUrl + "?gameId=" + gameId);
    };
    GamesService.prototype.addComments = function (title, userName, comments, gameId, timeCommented) {
        if (timeCommented === void 0) { timeCommented = new Date(); }
        return this
            .httpClient
            .post(environment_1.environment.commentsServiceUrl, {
            title: title,
            userName: userName,
            timeCommented: timeCommented,
            comments: comments,
            gameId: gameId
        });
    };
    GamesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GamesService);
    return GamesService;
}());
exports.GamesService = GamesService;
