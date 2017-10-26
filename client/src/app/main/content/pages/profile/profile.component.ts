import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
    selector     : 'fuse-profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseProfileComponent implements OnInit
{
    about: any;

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router)
    {
      profileService.aboutOnChanged.subscribe((data)=>{
        //if(!this.about) this.router.navigateByUrl('/pages/errors/error-404');
        if(!data) this.router.navigateByUrl('/');
        this.about = data;
      });
    }

    ngOnInit()
    {

    }
}
