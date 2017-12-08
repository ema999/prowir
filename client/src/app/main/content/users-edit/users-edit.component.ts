import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { UserModel } from '../../../core/models/user.model';
import { fuseAnimations } from '../../../core/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    form: FormGroup;
    formErrors: any;
    saving : boolean = false;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder )
    {
      this.route.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });

      this.formErrors = {
          first_name : {},
          last_name  : {},
          email   : {}
      };
    }

    ngOnInit()
    {
      this.userService.getAccount(this.userId, (err, user)=>{

        if(err || !user) return this.router.navigateByUrl('/pages/errors/error-404');
        this.user = new UserModel(user);

        for (let prop in user) {
          if(this.form.controls[''+prop+'']){
            this.form.controls[''+prop+''].setValue(this.user[''+prop+'']);
          }
        }

      });

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

    editUser()
    {
      this.onFormValuesChanged();
      if (this.hasFormError()) return;
      this.saving = true;
      let userData = Object.assign(this.user,this.getFormValues());
      this.userService.editUser(userData, (err, user)=>{
        this.saving = false;
      });
    }


}
