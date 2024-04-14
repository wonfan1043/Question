<script>
import Logo from '../components/TopLogo.vue'
import Chart from '../components/Chart.vue'
export default {
    components: {
        Logo,
        Chart,
    }
}
</script>

<template>
    <Logo />
    <div class="imgL"></div>
    <div class="butterfly"></div>
    <div class="imgR"></div>
    <div class="main">
        <h1 class="title">我是問卷名稱</h1>
        <div class="content">
            <h3 class="question">我是問題名稱</h3>
            <div class="chart">
                <Chart />
            </div>
            <h3 class="question">我是問題名稱</h3>
            <div class="chart">
                <Chart />
            </div>
            <h3 class="question">我是問題名稱</h3>
            <div class="chart">
                <Chart />
            </div>
            <h3 class="question">我是問題名稱</h3>
            <p>我是簡答答案</p>
        </div>
    </div>
    <div class="btn border">
        <router-link class="router" to="/allRes">
            <button class="btn btnL" type="button">查看所有回答</button>
        </router-link>
        <router-link class="router" to="/adminHome">
            <button class="btn" type="button">返回</button>
        </router-link>
    </div>
    <div class="footer"></div>
</template>

<style lang="scss" scoped>
* {
    color: #135d66;
}

.imgL {
    width: 10%;
    height: 70dvh;
    background-image: url("../assets/Question_pics/leaves_left.png");
    background-position: left;
    background-size: cover;
    background-blend-mode: luminosity;
    background-repeat: no-repeat;
    position: fixed;
    right: 15.7%;
    top: 10%;
    opacity: 0;
    animation: showContent 0.8s 1.15s forwards;

    @keyframes showContent {
        100% {
            opacity: 1;
        }
    }
}

.butterfly {
    width: 5dvw;
    height: 10.3dvh;
    background-image: url("../assets/Question_pics/butterfly.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-blend-mode: luminosity;
    opacity: 0.6;
    position: fixed;
    right: 15%;
    top: 70%;
    opacity: 0;
    animation: showContent 0.8s 1.15s forwards;

    @keyframes showContent {
        100% {
            opacity: 1;
        }
    }
}

.imgR {
    width: 10%;
    height: 70dvh;
    background-image: url("../assets/Question_pics/leaves.png");
    background-position: right;
    background-size: cover;
    background-blend-mode: luminosity;
    background-repeat: no-repeat;
    position: fixed;
    right: 0;
    bottom: 0;
    opacity: 0;
    animation: showContent 0.8s 1.15s forwards;

    @keyframes showContent {
        100% {
            opacity: 1;
        }
    }
}

.main {
    // border: 1px solid black;
    margin-top: 5%;
    width: 75%;
    height: auto;
    padding-left: 5%;
    opacity: 0;
    animation: showContent 0.8s 1.15s forwards;

    @keyframes showContent {
        100% {
            opacity: 1;
        }
    }

    .title {
        width: 100%;
        text-align: center;
        margin-bottom: 1%;
        font-size: 300%;
        font-weight: 800;
    }

    .content {
        padding: 2% 7%;
        background-color: #ceede5;


        .question {
            background-color: transparent;
            font-size: 130%;
            font-weight: 550;
        }

        .chart {
            margin-top: 0.5%;
            margin-bottom: 1%;
            background-color: #abd8cc;
            padding: 1.5%;
            border-radius: 10px;
        }

        p {
            background-color: #abd8cc;
            margin-top: 0.5%;
            font-size: large;
            font-weight: 600;
            padding: 1.5%;
            border-radius: 10px;
        }
    }

}

.btn {
    margin-top: 1%;
    width: 75%;
    height: auto;
    padding-bottom: 1%;
    opacity: 0;
    animation: showContent 0.8s 1.15s forwards;

    @keyframes showContent {
        100% {
            opacity: 1;
        }
    }

    .router {
        text-decoration: none;
        background-color: transparent;

        .btnL{
            margin-left: 70%;
        }
        
        button {
            margin-right: 2%;
            width: auto;
            padding: 1%;
            border-radius: 10px;
            background-color: #135d66;
            color: #ceede5;
            font-size: larger;
            font-weight: 600;
            border: none;
    
            &:active {
                background-color: #abd8cc;
                color: #135d66;
            }
        }
    }

}

.footer {
    width: 100%;
    height: 5dvh;
}
</style>