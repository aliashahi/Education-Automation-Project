import {Component, HostListener, ViewChild, OnInit, Input, TemplateRef} from '@angular/core';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'EAP-rollcall',
  templateUrl: './rollcall.component.html',
  styleUrls: ['./rollcall.component.scss']
})
export class RollcallComponent implements OnInit {

  constructor(private modalService: BsModalService) { }
    modalRef!: BsModalRef;
    message: string | undefined;

    time: string = '';
    currentTime = new Date();

    @ViewChild(MdbTableDirective, { static: true })
    mdbTable!: MdbTableDirective;
    elements: any = [];
    headElements = ['ID', 'First', 'Absence', 'Delay'];
    searchText: string = '';
    previous: string | undefined;
    //---------
    private _success = new Subject<string>();

    staticAlertClosed = false;
    successMessage = '';
  
    @ViewChild('staticAlert', { static: false })
    staticAlert!: NgbAlert;
    @ViewChild('selfClosingAlert', { static: false })
    selfClosingAlert!: NgbAlert;
  
    public changeSuccessMessage() { this._success.next(` Saved successfully.`); }

    //---------

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
       
    }
     
     confirm(): void {
        this.message = 'Confirmed!';
        this.modalRef.hide();
        this.changeSuccessMessage();
    }
     
    decline(): void {
        this.message = 'Declined!';
        this.modalRef.hide();
    }


    @HostListener('input') oninput() {
        this.searchItems();
    }

    ngOnInit(): void {
        for (let i = 1; i <= 10; i++) {
            this.elements.push({
                id: i.toString(), first: 'StudentName ' + i.toString(),  Absence: '', Delay: ''
            });
        }
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();
        this.time = this.currentTime.toLocaleDateString();


        //------
        setTimeout(() => this.staticAlert.close(), 20000);
  
      this._success.subscribe(message => this.successMessage = message);
      this._success.pipe(debounceTime(5000)).subscribe(() => {
        if (this.selfClosingAlert) {
          this.selfClosingAlert.close();
        }
      });
    }

    searchItems() {
        const prev = this.mdbTable.getDataSource();
        if (!this.searchText) {
            this.mdbTable.setDataSource(this.previous);
            this.elements = this.mdbTable.getDataSource();
        }
        if (this.searchText) {
            this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['first', 'last']);
            this.mdbTable.setDataSource(prev);
        }
    }


    dateDisplay() {
        

    }

   

}
