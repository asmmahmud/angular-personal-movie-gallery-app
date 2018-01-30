import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="row my-5">
      <div class="col-md-12 homepage">
        <h1 class="homepage-title">Personal Movie Gallery</h1>
        <div class="desc">
          <h5>This app has been implemented using Angular 5+, Node.js and MongoDB</h5>
          <p>
            Here you can create an account and can keep track of your watched movies and can add personal notes.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .homepage {
      text-align: center;
    }
    .homepage-title {
      font-size: 2rem;
    }
    .desc {
      margin: 2rem auto;
      width: 80%;
    }
    .desc h5 {
      font-size: 1.2rem;
    }
  `]
})
export class HomeComponent {
}
