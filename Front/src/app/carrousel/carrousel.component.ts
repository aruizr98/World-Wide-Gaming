import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("cajaLogo").setAttribute("class", "animarLogo");
    document.getElementById("listaMenu").setAttribute("class", "nav col-8 justify-content-end animarMenu");
  }

}
