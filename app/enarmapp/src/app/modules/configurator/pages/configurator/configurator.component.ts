import { Component, OnInit } from "@angular/core";
import { ConfiguratorService } from "../../services/configurator.service";

@Component({
    templateUrl: './configurator.component.html',
    styleUrls: ['./configurator.component.scss']
  })
  export class ConfiguratorComponent implements OnInit {

    constructor(
      public configuratorService: ConfiguratorService
    ){

    }

    async ngOnInit(): Promise<void> {
        console.log("Hola");
    }


  }