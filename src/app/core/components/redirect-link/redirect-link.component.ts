import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect-link',
  templateUrl: './redirect-link.component.html',
  styleUrls: ['./redirect-link.component.scss']
})
export class RedirectLinkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      window.location.href = "http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=32851";
    },1000);
  }

}
