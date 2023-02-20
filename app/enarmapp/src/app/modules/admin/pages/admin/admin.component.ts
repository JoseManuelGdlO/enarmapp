import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
  })
  export class AdminComponent implements OnInit {

    constructor(

    ){

    }

    async ngOnInit(): Promise<void> {
        console.log("Hola");
    }


  }