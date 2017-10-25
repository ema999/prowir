import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent implements OnInit
{
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showSpinner: boolean;
    horizontalNav: boolean;
    currentAccount: any = {};

    constructor(
        private router: Router,
        private userService: UserService
    )
    {
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'us'
            },
            {
                'id'   : 'es',
                'title': 'Spanish',
                'flag' : 'es'
            },
            {
                'id'   : 'tr',
                'title': 'Turkish',
                'flag' : 'tr'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showSpinner = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showSpinner = false;
                }
            });

    }

    ngOnInit() {
        this.userService.getCurrentAccount()
          .subscribe(current => {
            this.currentAccount = JSON.parse(current._body);
          })
    }

    ngOnDestroy() {
        this.currentAccount.unsubscribe();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }
}
