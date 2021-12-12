import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SharedAnnService } from '../../services/shared-ann.service';


@Component({
  selector: 'EAP-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
    @ViewChild('addannoun')
    private divAnnoun = {} as ElementRef;

    title : string = '';
    explanation : string = '';
    notific = '';
    mesage1 : string = "The notification field can't be empty!... Please enter something.";
    mesage2 : string = "Your notification has been saved";
    isEmpty = true;
    mesage_active = false;

    message : string = '';
    //tit:String;
    list:any;
    constructor(private renderer: Renderer2, private _userData: SharedAnnService) {
      
    
    }
    
    addText(){
      const text = this.renderer.createText('ya aba abd allah');
      this.renderer.appendChild(this.divAnnoun.nativeElement, text);
      
    }

    
/*
    newMessage() {
      this.sharedService.nextMessage("Second Message")
    }
    
    shareData(){
      this.sharedService.sharedMessage.subscribe(message => this.message = message);
    }
    */
    submited(){
        if (this.notific.localeCompare('')==0){
            this.mesage2 = '';
            this.mesage1 = "The notification field can't be empty!... Please enter something.";
            this.mesage_active = true; 
        }
        else{
            this.isEmpty = false;
            this.mesage1 = '';
            this.mesage2 = "Your notification has been saved";
            this.mesage_active = true;
        }
        setTimeout(() => {
            this.mesage_active = false;
        }, 10000);
       this.addAnnouncement();
    }
    
    
    addAnnouncement(){
      this.list = [
        {name:'Anu',age:'20'}
      ]
      this.list.push({name: this.title, age: this.notific});
      this._userData.setUserData(this.list);
    }

  ngOnInit(): void {
  }

}
