import { Component, OnInit, Renderer2 } from '@angular/core';

import { faGithub, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun, faIdCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isDarkMode = false;
  moon = faMoon;
  sun = faSun;

  user = {
    image: "../assets/img/imgyo.jpg",
    username: "David Arreaza Gil",
    description: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma. Y aprendiendo Front-end",
    links: [
      {
        link: "https://github.com",
        title: "Mis proyectos de github",
        icon: faGithub
      },
      {
        link: "https://www.instagram.com/",
        title: "Mi Instagram",
        icon: faInstagram
      },
      {
        link: "https://www.linkedin.com",
        title: "Mi LinkedIn",
        icon: faLinkedin
      },
      {
        link: "https://www.google.com",
        title: "Portfolio",
        icon: faIdCard
      }
    ]
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      console.log("Dark mode ON")
    }
  }

  changeMode() {
    this.isDarkMode = !this.isDarkMode

    if(this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }
}

