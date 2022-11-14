import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  result = 2000;
  path = '/tabs/activities';

  patientId: string;
  patientName: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.patientId = queryParams.id;
      this.patientName = queryParams.name;
    });
  }
}
