import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {}

  goTo(path: string) {
    this.route.navigate([path]);
  }
}
