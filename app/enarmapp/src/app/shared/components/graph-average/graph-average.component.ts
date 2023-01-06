import { Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'enarm-graph-average',
    templateUrl: './graph-average.component.html',
    styleUrls: ['./graph-average.component.scss']
})
export class GraphAverageComponent implements OnInit {
    
    @Input() text = '';
    @Input() percentage = '';

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        
    }

}