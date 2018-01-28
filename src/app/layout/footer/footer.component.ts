import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer id="footer">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <ul class="footer-links">
              <li routerLinkActive="active"><a routerLink="/home">Home</a></li>
              <li routerLinkActive="active"><a routerLink="/about-us">About</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    ul.footer-links {
      text-align: center;
    }

    ul.footer-links li {
      display: inline-block;
      margin-right: 1rem;
    }

    ul.footer-links li.active a {
      color: rgba(0, 0, 0, 0.9);
    }
  `]
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
