import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { fuseAnimations } from '../../../core/animations';
import { ToolBarTable } from '../../../core/components/toolbartable/toolbartable.component';
import { MatDialog, MatDialogRef} from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

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
    usersSelected: any = [];
    buttons: any = [{
        icon: 'person_add',
        text: 'Nuevo Usuario',
        action: 'add'
      },
      {
        icon: 'edit',
        text: 'Editar Usuario',
        action: 'edit',
        onlyActive: 1
      },
      {
        icon: 'delete',
        text: 'Eliminar Usuario',
        action: 'delete',
        atLeastOne: 1
      }
    ];

    constructor(private userService: UserService, public dialog: MatDialog, private router: Router)
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

    onSelect({ selected }) {
        this.usersSelected.splice(0, this.usersSelected.length);
        this.usersSelected.push(...selected);
    }

    onAction(action) {
        if (action == 'delete') this.deleteUsers();
        if (action == 'add') this.addUsers();
        if (action == 'edit') this.editUser();
    }

    editUser() {
        this.router.navigateByUrl('/users/edit/'+ this.usersSelected[0].id);
    }

    addUsers() {
        this.router.navigateByUrl('/users/add');
    }

    deleteUsers() {
        this.openDialog({
          confirmMessage: '¿Estás seguro que quieres eliminar el usuario?',
          textOk: 'Ok',
          textCancel: 'Cancelar',
          title: 'Eliminar'
        },(result) => {
          if (!result) return;
          this.loading = true;
          this.userService.deleteUsers(this.users, this.usersSelected, () => { this.loading = false });
        });
    }

    openDialog(data, action): void {
      let dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        width: '350px',
        data: data
      });

      dialogRef.afterClosed().subscribe(action);
    }

}
