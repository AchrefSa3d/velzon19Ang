import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements OnInit {

    signupForm!: UntypedFormGroup;
    submitted = false;
    error = '';
    fieldTextType = false;
    year: number = new Date().getFullYear();

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName:  ['', [Validators.required]],
            email:     ['', [Validators.required, Validators.email]],
            password:  ['', [Validators.required, Validators.minLength(8)]],
            role:      ['user', [Validators.required]],
        });
    }

    get f() { return this.signupForm.controls; }

    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    onSubmit() {
        this.submitted = true;
        if (this.signupForm.invalid) return;

        this.authenticationService.register(
            this.f['email'].value,
            this.f['firstName'].value,
            this.f['password'].value,
            this.f['lastName'].value,
            this.f['role'].value
        ).pipe(first()).subscribe({
            next: () => this.router.navigate(['/auth/login']),
            error: (err: any) => this.error = err?.error?.message || 'Erreur lors de l\'inscription'
        });
    }
}
