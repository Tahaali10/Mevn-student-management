<template>
    <TheNavigation />
    <the-loader v-if="showLoading"></the-loader>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue';
import { mapState } from 'vuex';
import { AUTO_LOGIN_ACTION } from './store/storeconstants';
import { defineAsyncComponent } from 'vue';

const TheLoader = defineAsyncComponent(() =>
    import(/* webpackChunkName: "Loader" */ './components/TheLoader.vue'),
);
export default {
    name: 'App',
    computed: {
        ...mapState({
            showLoading: (state) => state.showLoading,
            autoLogout: (state) => state.auth.autoLogout,
        }),
    },

    watch: {
        autoLogout(curValue, oldValue) {
            if (curValue && curValue != oldValue) {
                this.$router.replace('/login');
            }
        },
    },
    components: {
        TheNavigation,
        TheLoader,
    },
    created() {
        this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
    },
};
</script>
<style>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    background-color: #152733;
    color: #fff;
    font-family: Arial, sans-serif;
}   
</style>