import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../client.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register-doc',
  templateUrl: './register-doc.component.html',
  styleUrls: ['./register-doc.component.css']
})
export class RegisterDocComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private client: ClientService, private route: Router, public atuh: AuthService) { }
  hide = true;
  notification: boolean;
  ngOnInit(): void {
    if (this.atuh.isLogedIn) {
      // tslint:disable-next-line: no-unused-expression
      this.route.navigate['/'];
    }
    this.form = this.fb.group({
      id_d: ['', Validators.required],
      name_d: ['',  Validators.required],
      mail_d: ['', Validators.required],
      specialty: ['', Validators.required],
      phone: ['', Validators.required],
      password_d:['',Validators.required],


    })
  }

  async onSubmit(){
    // Se recupera el token
    if (this.form.valid){
      console.log(this.form);
      this.client.postRequest(
        'http://127.0.0.1:5000/api/register',
        {
          id_d: this.form.value.id_d,
          name_d: this.form.value.name_d,
          mail_d: this.form.value.mail_d,
          specialty: this.form.value.specialty,
          phone: this.form.value.phone,
          password_d: this.form.value.Password_d,
          role_d: "2"
        },
        // Se envia el token
      ).subscribe(
        (response: any) => {
          console.log(response);
          this.form.reset();

        }
      ),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error.status);

      };
    }else{
      console.log('Error en la entrada de datos del formulario del cliente');
      this.notification = true;

    }

  }

}
