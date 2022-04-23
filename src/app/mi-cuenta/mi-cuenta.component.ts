import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public nombreUsuario:string;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("nombreUsuario") !=undefined){
      this.nombreUsuario = localStorage.getItem("nombreUsuario")
    }else{
      this.nombreUsuario=sessionStorage.getItem("nombreUsuario")
    }
  }

}
