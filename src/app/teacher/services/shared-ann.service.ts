import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedAnnService {
  list:any;
  constructor() { }
 
   getUserData(){ 
      return this.list; 
   } 
   setUserData(data:any[]){
       this.list = data;
   }
}
