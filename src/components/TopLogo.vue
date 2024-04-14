<script>
export default {

}
</script>

<template>
    <router-link class="link" to="/">
        <div class="topLogo"></div>
    </router-link>
</template>

<style lang="scss" scoped>
    .link{
        text-decoration: none;
        background-color: none;
    }

    .topLogo {
        width: 24dvw;
        height: 10dvh;
        background-image: url("../assets/Question_pics/Logo.png");
        background-size: contain;
        background-repeat: no-repeat;
        position: fixed;
        top: 5%;
        right: -5.5%;

        opacity: 0;
        animation: showLogo 0.8s 1.15s forwards;

        @keyframes showLogo {
            100% {
                opacity: 1;
            }
        }
    }
</style>