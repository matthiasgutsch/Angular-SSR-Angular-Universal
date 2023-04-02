import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { makeStateKey, Title, TransferState } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { isPlatformServer } from "@angular/common";
import { IListGroup } from "../../../shared/components/bootstrap/list-group/interface";
import { ITodo } from "../interfaces";
import { TodosService } from "../todos.service";

@Component({
    selector: "todos-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"],
})
export class IndexComponent {
    public todosProps = {} as IListGroup;
    private todosKey = makeStateKey<ITodo[]>("todos");
    public list: any;
    workDetail: any;
    elements: any;
    nameFilter: any;
    descriptionFilter: any;
    codeFilter: string;
    bathroomsFilter: string;
    floorsFilter: string;
    codeIntFilter: string;
    sizeFromFilter: string;
    sizeToFilter: string;
    categoryFilter: any;
    orderBy: string;
    orderByType: string;
    roomFromFilter: string;
    roomToFilter: string;
  
    priceFromFilter: string;
    priceToFilter: string;
  
  
    floorFilter: string;
    bathroomFilter: string;
    locationFilter: any;
    brandFilter: string;
    typeFilter: any;
    pageSize = 8;
    page = 1;
    mapOptions: any = [];
    searchTitle: string;
    count = 0;
    markers: any = [];
    categories: any = [];
    comuni: any = [];
    numberList: any[];
    sizeList: any[];
    roomList: any[];
    priceList: any[];
    typeList: any[];
    name = ""
    display: boolean;
    clientsProvinces: any = [];
    clientsCompanies: any = [];
    clientsSectores: any = [];
    responsive: boolean;
    zoom = 8;
    selectedCategories: any[];
    infoContent = '';
    data1: any = [];
    error: string;
    trackByFn(item: any) {
      return item.id;
    }
  
    basePath: string;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private service: TodosService,
        private ts: TransferState,
        private router: Router,
        private title: Title,
        private route: ActivatedRoute,

    ) {

        this.title.setTitle('Inspiration gallery for startups');


        let params = this.getRequestParams(
            this.nameFilter,
            this.orderBy = 'desc',
            this.orderByType = 'startup_id',
            this.page,
            this.pageSize
          );

            this.service.get_all_startups(params).subscribe((pData) => {
              this.list = pData;
              this.count = this.service.size;

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


    getRequestParams(
        searchTitle: string,
        orderBy: string,
        orderByType: string,
        page: number,
        pageSize: string | number): any {
        // tslint:disable-next-line:prefer-const
        let path = 'todos';
        let params: any = {};
        let adder = '?';
    
        if (page) {
          params[`page`] = page - 1;
          path += adder + 'page=' + (page - 1);
          adder = '&';
        }
    
        if (searchTitle) {
          params[`name`] = searchTitle;
          path += adder + 'name=' + searchTitle;
          adder = '&';
        }
    
        if (orderBy) {
          params[`orderBy`] = orderBy;
          adder + 'orderBy=' + orderBy;
        }
    
        if (orderByType) {
          params[`orderByType`] = orderByType;
          adder + 'orderByType=' + orderByType;
        }
    
    
        if (pageSize) {
          params[`size`] = pageSize;
          path += adder + 'size=' + pageSize;
        }
    
        return params;
    
      }
}
