import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BootstrapModule } from "src/app/shared/components/bootstrap/bootstrap.module";
import { IndexComponent } from "./index/index.component";
import { TodosService } from "./todos.service";
import { ShowComponent } from "./show/show.component";

@NgModule({
    imports: [
        CommonModule,
        BootstrapModule,
        RouterModule.forChild([
            { path: "", component: IndexComponent },
            { path: ":id", component: ShowComponent },
        ]),
    ],
    exports: [],
    declarations: [IndexComponent, ShowComponent],
    providers: [TodosService],
})
export class TodosModule {}
