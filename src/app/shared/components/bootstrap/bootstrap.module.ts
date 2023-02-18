import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ListGroupComponent } from "./list-group/list-group.component";

@NgModule({
    imports: [CommonModule],
    declarations: [ListGroupComponent],
    exports: [ListGroupComponent],
    providers: [],
})
export class BootstrapModule {}
