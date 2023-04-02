import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Meta, Title, TransferState } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TodosService } from "../todos.service";

@Component({
    selector: "todos-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.scss"],
})
export class ShowComponent {
    element: any;
    slideshowList: any;
    elements:  any = [];
    data: any[];
    public list: any;

    constructor(
    private route: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: TodosService,
    private ts: TransferState,
    private router: Router
    ) {

        this.route.paramMap.subscribe((params) => {
            const id = this.route.snapshot.paramMap.get("id");

            this.service.get_id(id).subscribe((pData) => {
                this.elements = pData;
                this.title.setTitle(this.elements.startup_name + ' | Inspiration gallery for startups');

                this.getTodos();
              });
    
          });

    }


    public getTodos(): void {

        const paramsOther = {
            page: '', 
            size: 4, 
            orderBy: 'random', 
            orderByType: 'page_id'
          };

        this.service.get_all_startups(paramsOther).subscribe((pData) => {
            this.list = pData;
          });
}
}
