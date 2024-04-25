import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanelMenuComponent } from '../panel-menu/panel-menu.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, PanelMenuComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
