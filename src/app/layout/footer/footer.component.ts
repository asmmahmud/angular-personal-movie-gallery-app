import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styles: [`
    .upwork-icon {
      width: 32px;
    }
    #myFooter {
      background-color: #3c3d41;
      color: white;
      margin-top: 2rem;
    }
    #myFooter .footer-copyright {
      background-color: #333333;
      padding-top: 3px;
      padding-bottom: 3px;
      text-align: center;
    }
    #myFooter .row {
      margin-bottom: 2rem;
    }
    #myFooter .navbar-brand {
      margin-top: 45px;
      height: 65px;
    }
    #myFooter .footer-copyright p {
      margin: 10px;
      color: #ccc;
    }
    #myFooter ul {
      list-style-type: none;
      padding-left: 0;
      line-height: 1.7;
    }
    #myFooter h5 {
      font-size: 18px;
      color: white;
      font-weight: bold;
      margin-top: 30px;
    }
    #myFooter h2 a {
      font-size: 50px;
      text-align: center;
      color: #fff;
    }
    #myFooter a {
      color: #d2d1d1;
      text-decoration: none;
    }
    #myFooter a:hover,
    #myFooter a:focus {
      text-decoration: none;
      color: #d84b6b;
    }
    #myFooter a.btn,
    #myFooter a.btn {
      font-weight: bold;
    }
    #myFooter a.btn:hover,
    #myFooter a.btn:focus {
      text-decoration: none;
      color: #5d1928;
    }
    #myFooter .social-networks {
      text-align: center;
      padding-top: 30px;
      padding-bottom: 16px;
    }
    #myFooter .social-networks a {
      font-size: 32px;
      color: #f9f9f9;
      padding: 10px;
      transition: 0.2s;
    }
    #myFooter .social-networks a:hover {
      text-decoration: none;
      color: #d84b6b;
    }
    #myFooter .btn {
      color: white;
      background-color: #d84b6b;
      border-radius: 20px;
      border: none;
      width: 150px;
      display: block;
      margin: 0 auto;
      margin-top: 10px;
      line-height: 25px;
    }
    #myFooter {
      flex: 0 0 auto;
      -webkit-flex: 0 0 auto;
    }
    @media screen and (max-width: 767px) {
      #myFooter {
        text-align: center;
      }
    }

  `]
})
export class FooterComponent {

  imgMouseOver(img: HTMLImageElement) {
    img.src = 'assets/upwork-hover.svg';
  }
  imgMouseLeave(img: HTMLImageElement) {
    img.src = 'assets/upwork.svg';
  }
}
