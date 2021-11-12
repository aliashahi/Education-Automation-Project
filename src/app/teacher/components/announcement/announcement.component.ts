import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
//import {SharedService } from '../../service/shared.service';

@Component({
  selector: 'EAP-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
    @ViewChild('addannoun')
    private divAnnoun = {} as ElementRef;
    message : string = '';
    constructor(private renderer: Renderer2) {}
    
    addText(){
      const text = this.renderer.createText('ya aba abd allah');
      this.renderer.appendChild(this.divAnnoun.nativeElement, text);
      
    }

    title : string = '';
    explanation : string = '';
    notific = '';
    mesage1 : string = "The notification field can't be empty!... Please enter something.";
    mesage2 : string = "Your notification has been saved";
    isEmpty = true;
    mesage_active = false;
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
            this.title = '';
            this.explanation = ''; 
            this.notific = '';
        }
        setTimeout(() => {
            this.mesage_active = false;
        }, 10000);
    }
    
    
    addAnnouncement(){
    
    }

    getColor(){
        return this.isEmpty== true ? 'green' : 'green';
    }  
 


  ngOnInit(): void {
  }

}
