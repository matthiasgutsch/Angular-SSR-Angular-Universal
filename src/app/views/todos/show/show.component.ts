import { Component, OnInit } from "@angular/core";

@Component({
    selector: "todos-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.scss"],
})
export class ShowComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        const { data } = history.state;
        console.log(data);
    }
}
