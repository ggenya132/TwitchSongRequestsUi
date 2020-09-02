import { Component, OnInit } from '@angular/core';
import {
  NgWizardConfig,
  THEME,
  StepChangedArgs,
  NgWizardService,
} from 'ng-wizard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    this.route.fragment.subscribe((fragment: string) => {
      console.log('My hash fragment is here => ', fragment);

      // TODO: include robust logic to check for access code -- for now, we'll default to simple impl
      if (fragment && fragment.includes('access_token')) {
        const access_token = window.location.href.match(
          /\#(?:access_token)\=([\S\s]*?)\&/
        )[1];
        this.isLoading = true;

        //simulate api response of one second
        setTimeout(() => {
          this.accessToken = access_token;
          this.isLoading = false;
        }, 1000);
        //TODO: invoke service to pass to api, await api response before allowing user to continue
      }
    });
  }
  // config: NgWizardConfig = {
  //   selected: 0,
  //   theme: THEME.arrows,
  //   toolbarSettings: {
  //     toolbarExtraButtons: [
  //       { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
  //   }
  // };

  ngOnInit(): void {}
  stepChanged(event) {
    console.log({ event });
  }
  isLoading = false;

  accessToken = undefined;

  redirectPathTwo =
    'https://id.twitch.tv/oauth2/authorize?client_id=n43pmbmxpn1xgtd36oraj6y4xxpp2h&redirect_uri=http%3A%2F%2Flocalhost%3A4200&response_type=token&scope=channel%3Aread%3Aredemptions';
}
