import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'enarm-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    
    @Input() hour = '01:05:41';
    @Output() onClick = new EventEmitter();

    onpause = false;

    completeTime = '';

    constructor(
        
    ){

    }

    async ngOnInit(): Promise<void> {
        this.startTimer()
    }

    startTimer() {
        const separe = this.hour.split(':');
        let hour = Number(separe[0])
        let minute =  Number(separe[1])
        let seconds =  Number(separe[2])
        setInterval( () => {
            if(!this.onpause) {
                seconds++
            }

            if(seconds === 60) {
                seconds = 0
                minute++
                if(minute === 60) {
                    minute = 0
                    hour++
                }
            }
            const HOUR = hour.toString().length == 1 ? '0' + hour : hour;
            const MINUTES = minute.toString().length == 1 ? '0' + minute : minute;
            const SECONDS = seconds.toString().length == 1 ? '0' + seconds : seconds;

            this.completeTime = `${HOUR}:${MINUTES}:${SECONDS}`;
        }, 1000)
    }

    stop() {
        this.onpause = !this.onpause
    }

}