import { Component } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';

@Component({
    selector   : 'users-screen',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss'],
    animations : fuseAnimations
})
export class UsersScreenComponent
{
    constructor()
    {
    }
}
