<script>
import Logo from '../components/TopLogo.vue';
import Search from '../components/Search.vue';
import List from '../components/AdminList.vue';

export default {
    components:{
        Logo,
        Search,
        List
    }
}
</script>

<template>
    <Logo />
    <Search />
    <div class="plant"></div>
    <List />
</template>

<style lang="scss" scoped>
    .plant {
    width: 20dvw;
    height: 20dvh;
    background-image: url("../assets/Question_pics/plant.png");
    background-color: transparent;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-blend-mode: luminosity;
    opacity: 0.6;
    position: fixed;
    right: 12%;
    top: 10.5%;
    z-index: 2;
    opacity: 0;
    animation: showContent 0.8s 1.15s forwards;

    @keyframes showContent {
        100% {
            opacity: 1;
        }
    }
}
</style>