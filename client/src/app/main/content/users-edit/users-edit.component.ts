import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { fuseAnimations } from '../../../core/animations';
import { ToolBarTable } from '../../../core/components/toolbartable/toolbartable.component';
import { MatDialog, MatDialogRef} from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector   : 'users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls  : ['./users-edit.component.scss'],
    animations : fuseAnimations
})
export class UsersEdit implements OnInit
{
    userId: number;
    user: any = {};

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router )
    {
      this.route.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });
    }

    ngOnInit()
    {
      this.userService.getAccount(this.userId, (err, user)=>{
        if(err || !user) return this.router.navigateByUrl('/pages/errors/error-404');
        this.user = user;
      });
    }


}
