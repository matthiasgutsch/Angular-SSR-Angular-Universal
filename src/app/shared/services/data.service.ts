import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { delay, map, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataService {
    size: number;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      private authToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  
      
    constructor(
        @Inject(String) private url: string,
        private http: HttpClient
    ) {}



  getParams(params: HttpParams, pars: any): HttpParams {
    if (pars.name) {
      params = params.append('name', pars.name);
    }
    if (pars.description) {
      params = params.append('description', pars.description);
    }
    if (pars.code) {
      params = params.append('code', pars.code);
    }
    if (pars.brand) {
      params = params.append('brand', pars.brand);
    }
    if (pars.dateFrom) {
      params = params.append('date_from', pars.dateFrom);
    }
    if (pars.employee) {
      params = params.append('employee', pars.employee);
    }
    if (pars.dateTo) {
      params = params.append('date_to', pars.dateTo);
    }

    if (pars.category) {
      params = params.append('category', pars.category);
    }
    if (pars.type) {
      params = params.append('type', pars.type);
    }
    if (pars.location_id) {
      params = params.append('location_id', pars.location_id);
    }
    if (pars.bathrooms) {
      params = params.append('bathrooms', pars.bathrooms);
    }
    if (pars.floors) {
      params = params.append('floors', pars.floors);
    }

     if (pars.sizeFrom) {
      params = params.append('sizeFrom', pars.sizeFrom);
    }
    if (pars.sizeTo) {
      params = params.append('sizeTo', pars.sizeTo);
    }

    if (pars.roomFrom) {
      params = params.append('roomFrom', pars.roomFrom);
    }
    if (pars.roomTo) {
      params = params.append('roomTo', pars.roomTo);
    }
    if (pars.priceFrom) {
      params = params.append('priceFrom', pars.priceFrom);
    }
    if (pars.priceTo) {
      params = params.append('priceTo', pars.priceTo);
    }

    params = params.append('_start', pars.page);
    if (pars.size) {
      params = params.append('_limit', pars.size);
    }
    if (pars.orderBy) {
      params = params.append('orderBy', pars.orderBy);
    }
    if (pars.orderByType) {
      params = params.append('orderByType', pars.orderByType);
    }
    return params;
  }


    public getAll() {
        return this.http.get(this.url);
    }


    get_id(id: string) {
        const header = new HttpHeaders().set(
          "Authorization",
           this.authToken,
        );
        
        return this.http.get(`${this.url}/startups/id_public/` + id, {headers:header}).pipe(delay(1000));
      }




    public get_all_startups(pars: any): Observable<any[]> {
        const header = new HttpHeaders().set(
          "Authorization",
           this.authToken,
        );
        let params = new HttpParams();
        params = this.getParams(params, pars);
        return this.http
          .get<HttpResponse<any[]>>(`${this.url}/startups/list_public`, {headers:header,
            observe: 'response',
            params,
          })
          .pipe(
            map((res: any) => {
              this.size =
              res.headers.get('x-total-count') != null ? + res.headers.get('x-total-count') : 0;
              const ts: any = res.body;
              return ts;
            }),
            delay(1000)
          );
      }
}
