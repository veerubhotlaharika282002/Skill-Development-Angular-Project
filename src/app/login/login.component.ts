import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userid = '';
  myForm: FormGroup;
  constructor(private auth: AuthService , private router: Router , private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: '',
      password : '',
    }) ;
    }

  // tslint:disable-next-line: typedef
  loginUser(){
    console.log(this.myForm.value);
    if (this.myForm.value.username === '' && this.myForm.value.passowrd === '')
    {
        alert('Please enter username and password');
    }
    else{
    this.auth.loginUser(this.myForm.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token) ;
        this.router.navigate(['/regular']) ;

      },
      err => {console.log(err);
        // tslint:disable-next-line: align
        alert(' You entered wrong UserName or Password ');
      }
    );
   }
  }
}

