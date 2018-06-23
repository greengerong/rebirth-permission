import {Component} from '@angular/core';
import {AuthorizationService} from 'rebirth-permission';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


  constructor(private authorizationService: AuthorizationService) {

  }

  roles(role) {
    this.authorizationService.setCurrentUser({roles: [role]});
    window.location.reload();
  }

}
