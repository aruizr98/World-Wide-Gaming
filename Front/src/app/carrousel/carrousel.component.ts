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
    document.getElementById("navbarNav").setAttribute("class", "collapse navbar-collapse justify-content-end animarMenu");
  }

}
