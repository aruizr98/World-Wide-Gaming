import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  public sessionStorage:boolean;
  public localStorage:boolean;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("nombreUsuario") !=undefined){
      this.localStorage=true;
      console.log(this.localStorage);
    }else{
      this.localStorage=false;
      console.log(this.localStorage);
      if(sessionStorage.getItem("nombreUsuario") !=undefined){
        this.sessionStorage=true;
        console.log("SessionStorage");
      }
    }
  }

}
