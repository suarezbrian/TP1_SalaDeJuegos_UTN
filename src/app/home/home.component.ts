import { Component, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanelMenuComponent } from '../panel-menu/panel-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PanelMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{


}
