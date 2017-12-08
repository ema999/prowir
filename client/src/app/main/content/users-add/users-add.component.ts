import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { UserModel } from '../../../core/models/user.model';
import { fuseAnimations } from '../../../core/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector   : 'users-add',
    templateUrl: './users-add.component.html',
    styleUrls  : ['./users-add.component.scss'],
    animations : fuseAnimations
})
export class UsersAdd implements OnInit
{
    userId: number;
    user: any = {};
    form: FormGroup;
    formErrors: any;
    saving : boolean = false;
    roles : any = [];

    constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder )
    {

      this.formErrors = {
          first_name : {},
          last_name  : {},
          email      : {},
          password   : {},
          role      : {}
      };

      this.roles = [
        {
            value    : 'admin',
            viewValue: 'Administrador'
        },
        {
            value    : 'editor',
            viewValue: 'Editor'
        }
      ];
    }

    ngOnInit()
    {

      this.user = new UserModel({});

      this.form = this.formBuilder.group({
          first_name : ['', Validators.required],
          last_name  : ['', Validators.required],
          email      : ['', Validators.required],
          password   : ['', Validators.required],
          role       : ['', Validators.required]
      });

      this.form.valueChanges.subscribe(() => {
          this.onFormValuesChanged();
      });
    }

    onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }

        }

    }

    getFormValues()
    {
      let data = {};
      for (let prop in this.user) {
        if(this.form.controls[''+prop+'']){
          data[''+prop+''] = this.form.controls[''+prop+''].value;
        }
      }
      return data;
    }

    hasFormError()
    {
      let hasError = false;
      for (let prop in  this.formErrors) {
        if( Object.keys(this.formErrors[prop]).length > 0 ) hasError = true;
      }

      return hasError;
    }

    addUser()
    {
      this.onFormValuesChanged();
      if (this.hasFormError()) return;
      this.saving = true;
      let userData = Object.assign(this.user,this.getFormValues());
      this.userService.addUser(userData, (err, user)=>{
        this.saving = false;
        return this.router.navigateByUrl('/users');
      });
    }


}
