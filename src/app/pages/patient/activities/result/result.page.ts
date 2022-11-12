import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  result = 2000;
  path = '/tabs/activities';
  constructor() { }

  ngOnInit() {
  }

}
