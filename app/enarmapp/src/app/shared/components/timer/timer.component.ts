import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'enarm-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    
    @Input() hour = '01:00:10';
    @Output() onPause = new EventEmitter();

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
                seconds--
            }

            if(seconds === 0) {
                seconds = 60
                if(minute === 0) {
                    minute = 60
                    hour--
                }
                minute--
            }
            const HOUR = hour.toString().length == 1 ? '0' + hour : hour;
            const MINUTES = minute.toString().length == 1 ? '0' + minute : minute;
            const SECONDS = seconds.toString().length == 1 ? '0' + seconds : seconds;

            this.completeTime = `${HOUR}:${MINUTES}:${SECONDS}`;
        }, 1000)
    }

    stop() {
        this.onpause = !this.onpause
        if (this.onpause) {
            this.onPause.emit('pause')
        }
    }

}