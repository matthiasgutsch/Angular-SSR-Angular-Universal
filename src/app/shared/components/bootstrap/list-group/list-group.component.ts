import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IListGroup } from "./interface";

@Component({
    selector: "list-group",
    templateUrl: "./list-group.component.html",
    styleUrls: ["./list-group.component.scss"],
})
export class ListGroupComponent {
    @Input() props = {} as IListGroup;
    @Output('handleClick') click = new EventEmitter();



    public handleClick(current): void {
        this.click.emit(current)
    }

}
