import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { fuseAnimations } from '../../../core/animations';

@Component({
    selector   : 'users-screen',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss'],
    animations : fuseAnimations
})
export class UsersScreenComponent implements OnInit
{
    users: any = {};
    loading: boolean = false;
    page: number = 0;
    limit: number = 10;
    usersTotal: number = 0;

    constructor(private userService: UserService)
    {

    }

    ngOnInit()
    {
      this.loading = true;
      this.setPage({ offset: 0 });
      this.userService.userList$.subscribe((users)=>{ this.users = users; });
      this.userService.userListTotal$.subscribe((total)=>{ this.usersTotal = total; })
    }

    setPage(pageInfo){
      this.userService.getUserList({
          limit: this.limit,
          page: pageInfo.offset
      }, () => {
        this.loading = false
        this.page = pageInfo.offset;
      });
    }

}
