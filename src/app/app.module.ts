import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AgGridModule, AgGridAngular } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";
import 'ag-grid-enterprise';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AgGridModule,
        AgGridAngular
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}