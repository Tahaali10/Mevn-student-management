<template>
<div class="form-body mt-5">
    <div class="row">
        <div class="form-holder">
            <div class="form-content">
                <div class="form-items">
                    <h3 class="text-center">Register Now</h3>
                    <div class="alert alert-danger" v-if="error">
                        {{ error }}
                    </div>
                    <form @submit.prevent="onSignup">
                        <div class="col-md-12">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model.trim="name" placeholder="Full Name" />
                            <div class="error" v-if="errors.name">
                                {{ errors.name }}
                            </div>
                        </div>

                        <div class="col-md-12">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model.trim="email" placeholder="Enter Email" />
                            <div class="error" v-if="errors.email">
                                {{ errors.email }}
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label>Password</label>
                            <input type="password" class="form-control" v-model.trim="password" placeholder="Full Password" />
                            <div class="error" v-if="errors.password">
                                {{ errors.password }}
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label>Phone</label>
                            <input type="text" class="form-control" v-model.trim="phone" placeholder="Full Phone" />
                            <div class="error" v-if="errors.phone">
                                {{ errors.phone }}
                            </div>
                        </div>
                        <div class="form-button mt-3">
                            <button id="submit" type="submit" class="btn btn-primary">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SignupValidations from '../services/SignupValidations';
import {
    mapActions,
    mapMutations
} from 'vuex';
import {
    LOADING_SPINNER_SHOW_MUTATION,
    SIGNUP_ACTION,
} from '../store/storeconstants';
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            phone: '',
            errors: [],
            error: '',
        };
    },
    beforeRouteLeave() {
        console.log('rote leaving');
        console.log(this.$store);
    },
    beforeRouteEnter(_, _1, next) {
        next((vm) => {
            console.log('route entering');
            console.log(vm.$store.state.auth);
        });
    },
    methods: {
        ...mapActions('auth', {
            signup: SIGNUP_ACTION,
        }),

        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        async onSignup() {
            let validations = new SignupValidations(
                this.name,
                this.email,
                this.password,
                this.phone
            );

            this.errors = validations.checkValidations();
            if ('name' in this.errors || 'email' in this.errors || 'password' in this.errors || 'phone' in this.errors) {
                return false;
            }
            //make spinner true
            this.showLoading(true);
            //signup registration
            try {
                await this.signup({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    phone: this.phone,
                });
            } catch (error) {
                this.error = error;
                this.showLoading(false);
            }
            this.showLoading(false);
        },
    },
};
</script>

<style scoped>
.form-body {
    color: #fff;
}

.form-holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-height: 100vh;
}

.form-holder .form-content {
    position: relative;
    text-align: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
}

.form-content .form-items {
    border: 3px solid #fff;
    padding: 18px 35px;
    display: inline-block;
    width: 100%;
    min-width: 500px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: left;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.form-content h3 {
    color: #fff;
    text-align: left;
    font-size: 28px;
    font-weight: 600;
}

.form-content p {
    color: #fff;
    text-align: left;
    font-size: 17px;
    font-weight: 300;
    line-height: 20px;
    margin-bottom: 30px;
}

.form-content label,
.was-validated .form-check-input:invalid~.form-check-label,
.was-validated .form-check-input:valid~.form-check-label {
    color: #fff;
}

.form-content input[type=text],
.form-content input[type=password],
.form-content input[type=email],
.form-content select {
    width: 100%;
    padding: 7px 12px;
    text-align: left;
    border: 0;
    outline: 0;
    border-radius: 6px;
    background-color: #fff;
    font-size: 15px;
    font-weight: 300;
    color: #8D8D8D;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    margin-top: 5px;
}

.btn-primary {
    outline: none;
    border: 0px;
    box-shadow: none;
}

.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active {
    background-color: #495056;
    outline: none !important;
    border: none !important;
    box-shadow: none;
}

.mv-up {
    margin-top: 0px !important;
    margin-bottom: 5px !important;
}

.invalid-feedback {
    color: #ff606e;
}

.valid-feedback {
    color: #2acc80;
}
</style>
