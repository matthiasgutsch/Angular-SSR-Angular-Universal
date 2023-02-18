import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { IListGroup } from "../../../shared/components/bootstrap/list-group/interface";
import { ITodo } from "../interfaces";
import { TodosService } from "../todos.service";

@Component({
    selector: "todos-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
    public todosProps = {} as IListGroup;
    private todosKey = makeStateKey<ITodo[]>("todos");

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private service: TodosService,
        private ts: TransferState,
        private router: Router
    ) {}

    public ngOnInit() {
        if (this.ts.hasKey(this.todosKey)) {
            this.todosProps.list = this.ts.get(this.todosKey, []);
            this.todosProps.key = "title";
        } else {
            this.getTodos();
        }
    }

    public getTodos(): void {
        this.service.getAll().subscribe({
            next: (response: ITodo[]) => {
                if (isPlatformServer(this.platformId)) {
                    this.ts.set<ITodo[]>(this.todosKey, response);
                }
                this.todosProps.list = response;
                this.todosProps.key = "title";
            },
        });
    }

    public handleClick(currentItem): void {
        this.navigateTo(currentItem);
    }

    private navigateTo(currentItem: any): void {
        this.router.navigate([`/todos/${currentItem.id}`], {
            state: {
                data: { currentItem },
            },
        });
    }
}
