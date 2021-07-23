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
    description: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma. Desarrollor web con Angular. Aprendiendo más y más",
    links: [
      {
        link: "https://github.com/DavidArreaza",
        title: "Mis proyectos de github",
        icon: faGithub
      },
      {
        link: "https://www.linkedin.com/in/davidarreazagil/",
        title: "Mi LinkedIn",
        icon: faLinkedin
      },
      {
        link: "https://drive.google.com/file/d/11HdFwNLJGzYFqfhKjs5-iH3PVlSileEM/view?usp=sharing",
        title: "Currículum Vitae",
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

