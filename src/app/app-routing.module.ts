import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "todos",
        pathMatch: "full",
    },
    {
        path: "todos",
        loadChildren: () =>
            import("./views/todos/todos.module").then((m) => m.TodosModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
