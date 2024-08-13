<template>
<section class="" id="home-section">
    <div class="container">
        <div class="row">
            <div class="row d-flex align-items-stretch">
                <div class="colmd-12 col-lg-12 pl-lg-12 pb-12">
                    <div class="row justify-content-start pb-12">
                        <div class="col-md-12 heading-section">
                            <h3 class="mt-4 big">Home</h3>
                            <p>This Is Student's Data Management App.</p>
                        </div>
                    </div>
                    <div class="counter-wrap d-flex mt-md-3">   
                        <div class="text">
                            <p>To visit home page
                                <router-link to="/form">Go to form page</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {};
</script>

<style scoped>
#home-section {
    /* background-color: #152733; */
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.heading-section h3 {
    font-weight: 600;
    color: #fff;
}

.counter-wrap a {
    color: #007bff;
    text-decoration: underline;
}
</style>
