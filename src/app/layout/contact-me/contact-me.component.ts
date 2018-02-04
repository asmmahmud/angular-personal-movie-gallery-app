import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent {

  imgMouseOver(img: HTMLImageElement) {
    img.src = 'assets/upwork.svg';
  }
  imgMouseLeave(img: HTMLImageElement) {
    img.src =  'assets/upwork-hover.svg';
  }

}
