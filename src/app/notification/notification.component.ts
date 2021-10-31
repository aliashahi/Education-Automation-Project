import {Component} from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class notificationComponent {
    title : string = '';
    explanation : string = '';
    notific : string = '';
    mesage1 : string = "The notification field can't be empty!... Please enter something.";
    mesage2 : string = "Your notification has been saved";
    mesage_active = false;
    submited(){
        if (this.notific.localeCompare('')==0){
            this.mesage2 = '';
            this.mesage1 = "The notification field can't be empty!... Please enter something.";
            this.mesage_active = true; 
        }
        else{
            this.mesage1 = '';
            this.mesage2 = "Your notification has been saved";
            this.mesage_active = true;
            this.title = '';
            this.explanation = ''; 
            this.notific = '';
        }
        setTimeout(() => {
            this.mesage_active = false;
        }, 10000);
    }

    getColor(){
        return this.mesage2 === '' ? 'red' : 'green';
    }
}