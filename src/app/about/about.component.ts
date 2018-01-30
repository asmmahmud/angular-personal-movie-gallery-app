import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="row my-5">
      <div class="col-md-12 about-us">
        <h1 class="title">About Me</h1>
        <div class="desc">
          <h5>I'm an React.js, Angular, Vue.js, Node.js Developer.</h5>
          <p>
           My contact email: asmmahmud@gmail.com
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-us {
      text-align: center;
    }
    .title {
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
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
