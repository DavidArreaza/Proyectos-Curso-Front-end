import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MinibioService } from '../shared/services/minibio.service';
import { faGithub, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { MiniBio } from '../shared/models/minibio';


@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  id: string = "";
  isDarkMode = false;

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
      }/*,
      {
        link: "https://www.google.com",
        title: "Portfolio",
        icon: faIdCard
      }*/
    ]
  }

  constructor(private bioService: MinibioService, private route: ActivatedRoute, private renderer: Renderer2) {
    let userId = this.route.snapshot.paramMap.get('userid') ?? ""
    let bioId = this.route.snapshot.paramMap.get('id') ?? ""

    this.bioService.getMiniBioPublic(userId, bioId).subscribe(data => {
      const minibio: MiniBio = data.data() as MiniBio;
      minibio.id = data.id;

      this.user.image = minibio.image;
      this.user.username = minibio.title;
      this.user.description = minibio.description;

      this.user.links[0].link = minibio.linktitle1;
      this.user.links[0].title = minibio.link1;

      this.user.links[1].link = minibio.linktitle2;
      this.user.links[1].title = minibio.link2;

      /*this.user.links[0].link = minibio.linktitle1;
      this.user.links[0].title = minibio.link1;*/

    })
   }

  ngOnInit(): void {
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
