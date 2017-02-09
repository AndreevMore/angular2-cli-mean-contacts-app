"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var grid_component_1 = require('./components/grid/grid.component');
var navigation_component_1 = require('./components/navigation/navigation.component');
var cards_component_1 = require('./components/cards/cards.component');
var backup_component_1 = require('./components/backup/backup.component');
var search_component_1 = require('./components/search/search.component');
var editor_component_1 = require('./components/editor/editor.component');
var not_found_component_1 = require('./components/notFound/not-found.component');
var WindowRef_1 = require('./service/WindowRef');
var global_state_1 = require('./service/global-state');
var http_service_1 = require('./service/http.service');
var user_1 = require('./models/user');
var searchPipe_1 = require('./pipes/searchPipe');
var sortPipe_1 = require('./pipes/sortPipe');
var appRoutes = [
    { path: '', component: grid_component_1.GridComponent },
    { path: 'edit', component: editor_component_1.EditorComponent },
    { path: 'backup', component: backup_component_1.BackupComponent },
    { path: 'cards', component: cards_component_1.CardsComponent },
    // { path: '**', component: NotFoundComponent }
    { path: '**', component: not_found_component_1.NotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(appRoutes), http_1.HttpModule, forms_1.FormsModule, http_1.JsonpModule],
            declarations: [sortPipe_1.SortPipe, searchPipe_1.SearchPipe, search_component_1.SearchComponent, navigation_component_1.NavigationComponent, grid_component_1.GridComponent, backup_component_1.BackupComponent, cards_component_1.CardsComponent, editor_component_1.EditorComponent, not_found_component_1.NotFoundComponent],
            providers: [http_service_1.HttpService, user_1.User, global_state_1.GlobalState, WindowRef_1.WindowRef],
            bootstrap: [navigation_component_1.NavigationComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map