import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-foro',
  templateUrl: './menu-foro.component.html',
  styleUrls: ['./menu-foro.component.css']
})
export class MenuForoComponent implements OnInit {
  public juego: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.juego = this.route.snapshot.paramMap.get("juego");
    document.getElementById("titulo").innerHTML = "Foros de " + localStorage.getItem("juego");
  }
}
