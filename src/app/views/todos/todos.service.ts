import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "src/app/shared/services/data.service";

@Injectable()
export class TodosService extends DataService {
    constructor(httpClient: HttpClient) {
        super("https://api.startupinspire.com", httpClient);
    }
}
