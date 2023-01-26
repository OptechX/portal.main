import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {
  
  updateProfileForm: FormGroup;
  user: any;
  countries: any;
  
  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private commonService: CommonServiceService
  ) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.getCountryList();
    this.updateProfileForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      company: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      taxId: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: [''],
      notifications: [false, Validators.required]
    }, { validators: this.MatchPassword })
    this.getUserProfile()
  }

  MatchPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ ConfirmPassword: true });
    } else {
      // return null;
    }
  }
  getUserProfile(){
    this.dashboardService.getUserProfile(this.user.id).subscribe((res: any) => {
      this.updateProfileForm.patchValue({
        'email':res.email,
        'password':res.password,
        'company': res.company,
        'firstName': res.firstName,
        'lastName': res.lastName,
        'city': res.city,
        'postCode': res.postCodeZip,
        'taxId': res.taxID,
        'phone': res.phone,
        'address': res.address,
        'state': res.state,
        'country': res.country,
        'notifications': res.accountNotifications
      })
    })
  }

  updateUserProfile(id){
    this.dashboardService.updateUserProfile(id, this.updateProfileForm.value).subscribe((res: any) => {
      console.log('res --- ', res)
    })
  }

  createCountryForm(): FormGroup {
    return this.fb.group({
      id: new FormControl(null)
    })
  }

  getCountryList(){
    this.commonService.countryList().subscribe(res =>{ 
      this.countries = res;
    });
}
}
