export default class Validations {
    static checkEmail(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    static checkName(name) {
        return /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
    }

    static minLength(name, minLength) {
        if (name.length < minLength) {
            return false;
        }
        return true;
    }
    static checkPhone(phone) {
        return phone.length === 11;
    }
}
