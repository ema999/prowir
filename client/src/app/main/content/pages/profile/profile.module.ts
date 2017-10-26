import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseProfileComponent } from './profile.component';
import { FuseProfileTimelineComponent } from './tabs/timeline/timeline.component';
import { FuseProfileAboutComponent } from './tabs/about/about.component';
import { FuseProfilePhotosVideosComponent } from './tabs/photos-videos/photos-videos.component';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../../../../core/services/authguard.service';


const routes = [
    {
        path     : 'pages/profile/:id',
        component: FuseProfileComponent,
        resolve: [AuthGuard, ProfileService]
    }
];

@NgModule({
    declarations: [
        FuseProfileComponent,
        FuseProfileTimelineComponent,
        FuseProfileAboutComponent,
        FuseProfilePhotosVideosComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
