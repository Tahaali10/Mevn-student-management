<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link class="nav-link" to="/login"
                        >Login</router-link
                    >
                </li>
                <li class="nav-item" v-if="!isAuthenticated">
                    <router-link class="nav-link" to="/signup"
                        >Signup</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <router-link class="nav-link" to="/form"
                        >Form</router-link
                    >
                </li>
                <li class="nav-item" v-if="isAuthenticated">
                    <a
                        href="#"
                        class="nav-link"
                        @click.prevent="onLogout()"
                        >Logout</a
                    >
                </li>
            </ul>
        </div>
    </nav>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
    IS_USER_AUTHENTICATE_GETTER,
    LOGOUT_ACTION,
} from '../store/storeconstants';
export default {
    computed: {
        ...mapGetters('auth', {
            isAuthenticated: IS_USER_AUTHENTICATE_GETTER,
        }),
    },
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION,
        }),
        onLogout() {
            this.logout();
            this.$router.replace('/login');
        },
    },
};
</script>
<style>
.navbar {
  background-color: #f8f9fa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
}

.navbar-brand {
  font-weight: bold;
  color: #343a40;   

}
.navbar-toggler {
  border-color: #ced4da;
}
.nav-link {
  color: #343a40; 
  font-weight: 500;
}
.nav-link:hover {
  color: #007bff;
  text-decoration: none; 
}

.dropdown-menu {
  background-color: #fff;
  border: 1px solid #ced4da;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  color: #343a40;
  padding: 0.5rem 1rem;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}
</style>