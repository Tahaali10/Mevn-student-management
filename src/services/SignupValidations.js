import Validations from './Validations';

export default class SignupValidations {
    constructor(name, email, password, phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    checkValidations() {
        let errors = [];

        // Email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }

        // Name validations
        if (!Validations.checkName(this.name)) {
            errors['name'] = 'Invalid Name';
        }

        // Password validations
        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'Password should be at least 6 characters';
        }

        // Phone validations
        if (!Validations.checkPhone(this.phone)) {
            errors['phone'] = 'Phone number should be exactly 11 digits';
        }

        return errors;
    }

    static getErrorMessageFromCode(errorCode) {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
            default:
                return 'Unexpected error occurred. Please try again';
        }
    }
}
