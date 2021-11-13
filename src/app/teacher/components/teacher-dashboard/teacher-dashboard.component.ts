import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {SharedService } from '../../service/shared.service';



@Component({
  selector: 'EAP-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
})
export class TeacherDashboardComponent implements OnInit {
  @ViewChild('addannoun')
  private divAnnoun = {} as ElementRef;
  message : string = '';
 

  constructor(private route : Router, private renderer: Renderer2) {}
  
  
  addText(){
    const text = this.renderer.createText('ya aba abd allah');
    this.renderer.appendChild(this.divAnnoun.nativeElement, text);
    
  }
 

  clickme(){
    this.route.navigate(['/announcement']);
  }

 
  ngOnInit(): void {}
}
  