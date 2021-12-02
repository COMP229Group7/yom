import { Component, OnInit } from '@angular/core';
import { ActivatedRoute}  from '@angular/router';

@Component({
  selector: 'app-basepage',
  templateUrl: './basepage.component.html',
  styleUrls: ['./basepage.component.css']
})
export class BasepageComponent implements OnInit {

  title: String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.title = this.route.snapshot.data.title;
  }

}
