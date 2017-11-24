import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
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

    constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder )
    {

      this.formErrors = {
          first_name : {},
          last_name  : {},
          email   : {}
      };
    }

    ngOnInit()
    {
      this.form = this.formBuilder.group({
          first_name : ['', Validators.required],
          last_name  : ['', Validators.required],
          email      : ['', Validators.required]
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

            if ( control && control.dirty && !control.valid )
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

    addUser()
    {
      this.saving = true;
      let userData = Object.assign(this.user,this.getFormValues());
      this.userService.editUser(userData, (err, user)=>{
        this.saving = false;
      });
    }


}
