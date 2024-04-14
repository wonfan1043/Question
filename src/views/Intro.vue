<script>
export default {

}
</script>

<template>
    <div class="bg">
        <div class="login">
            <router-link class="button user" to="/userHome">
                <button type="button">使用者登入</button>
            </router-link>
            <router-link class="button" to="/adminHome">
                <button type="button">管理員登入</button>
            </router-link>
            <router-view></router-view>
        </div>
        <div class="logo"></div>
        <div class="cover"></div>
    </div>
</template>

<style lang="scss" scoped>
.bg {
    // border: 1px solid black;
    width: 100dvw;
    height: 100dvh;
    background-image: url('../assets/Question_pics/bg.png');
    background-position: center;
    background-size: 200%;
    background-repeat: no-repeat;
    position: relative;

    .logo {
        // border: 1px solid black;
        width: 34dvw;
        height: 20dvh;
        background-image: url(../assets/Question_pics/Logo.png);
        background-position: center;
        background-size: 132%;
        background-repeat: no-repeat;
        position: absolute;
        top: 40%;
        left: 32.5%;
        animation: moveLogo 1s 3.3s forwards;

        @keyframes moveLogo {
            0% {
                background-size: 132%;
                top: 40%;
                left: 32.5%;
            }

            100% {
                background-size: 110%;
                top: 35%;
                left: 31.5%;
            }
        }
    }

    .cover {
        // border: 1px solid black;
        width: 34dvw;
        height: 20dvh;
        background-color: #EDFFFA;
        position: absolute;
        top: 40%;
        left: 32.5%;
        animation: showLogo 3.5s 1s forwards;

        @keyframes showLogo {
            0% {
                width: 34dvw;
                transform: scaleX(100%);
            }

            100% {
                width: 0dvw;
                transform: scaleX(0%);
            }
        }
    }

    .login {
        border: 5px solid #135d66;
        border-radius: 20px;
        background-color: #EDFFFA;
        width: 40dvw;
        height: 50dvh;
        top: 30%;
        left: 30%;
        position: relative;

        display: flex;
        justify-content: center;
        align-items: end;

        opacity: 0;
        animation: showLogin 1.2s 3.1s forwards;

        @keyframes showLogin {
            100% {
                opacity: 100;
            }
        }

        .button {
            width: 30%;
            height: 20%;
            border-color: #135d66;
            border-radius: 20px;
            background-color: #135d66;
            margin-bottom: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;

            button {
                color: #ceede5;
                font-size: large;
                font-weight: 600;
                background-color: transparent;
                border: none;
            }
        }

        .user {
            margin-right: 5%;
        }
    }
}
</style>