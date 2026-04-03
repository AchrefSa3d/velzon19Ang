import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Comptes de test locaux — pas besoin de backend
const DEMO_USERS = [
  { email: 'admin@tijara.tn',  password: 'Admin123',  role: 'admin',  firstName: 'Admin',   lastName: 'Tijara'  },
  { email: 'vendor@tijara.tn', password: 'Vendor123', role: 'vendor', firstName: 'Mohamed', lastName: 'Ben Ali' },
  { email: 'user@tijara.tn',   password: 'User123',   role: 'user',   firstName: 'Sami',    lastName: 'Khiari'  },
];

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

    loginForm!: UntypedFormGroup;
    submitted     = false;
    loading       = false;
    error         = '';
    fieldTextType = false;
    year          = new Date().getFullYear();

    demoUsers = DEMO_USERS;

    constructor(
        private fb: UntypedFormBuilder,
        private router: Router,
    ) {
        // Si déjà connecté, rediriger directement
        try {
            const raw = sessionStorage.getItem('currentUser');
            if (raw) {
                const user = JSON.parse(raw);
                if (user?.role) { this.redirectByRole(user.role); }
            }
        } catch {
            sessionStorage.removeItem('currentUser');
        }
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email:    ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    get f() { return this.loginForm.controls; }

    toggleFieldTextType(): void { this.fieldTextType = !this.fieldTextType; }

    fillDemo(user: typeof DEMO_USERS[0]): void {
        this.loginForm.patchValue({ email: user.email, password: user.password });
    }

    onSubmit(): void {
        this.submitted = true;
        this.error = '';
        if (this.loginForm.invalid) return;

        this.loading = true;
        const email    = this.f['email'].value.trim().toLowerCase();
        const password = this.f['password'].value;

        setTimeout(() => {
            const found = DEMO_USERS.find(
                u => u.email.toLowerCase() === email && u.password === password
            );
            this.loading = false;
            if (found) {
                sessionStorage.setItem('currentUser', JSON.stringify(found));
                this.redirectByRole(found.role);
            } else {
                this.error = 'Email ou mot de passe incorrect.';
            }
        }, 600);
    }

    private redirectByRole(role: string): void {
        if (role === 'admin')        this.router.navigate(['/admin/reclamations']);
        else if (role === 'vendor')  this.router.navigate(['/ent/dashboard']);
        else                         this.router.navigate(['/users/dashboard']);
    }
}
