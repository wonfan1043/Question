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
            <table>
                <tr>
                    <th>編號</th>
                    <th>姓名</th>
                    <th>填寫時間</th>
                    <th></th>
                </tr>
                <tr>
                    <td>#1</td>
                    <td>欸欸欸</td>
                    <td>2024-01-31 11:59:59</td>
                    <router-link class="router" to="/checkRes">
                        <td>查看</td>
                    </router-link>
                </tr>
            </table>
        </div>
    </div>
    <div class="btn border">
        <router-link class="router" to="/adminResult">
            <button class="btn btnL" type="button">返回</button>
        </router-link>
        <router-link class="router" to="/adminHome">
            <button class="btn" type="button">回主頁</button>
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
        min-height: 50dvh;

        table{
            text-align: center;
            width: 100%;
            table-layout: auto;
            background-color: transparent;
            border-collapse: separate;
            border-spacing: 4.5px;
            
            th{
                padding: 1%;
                background-color: #abd8cc;
                font-size: xx-large;
            }
            
            td{
                font-size: x-large;
                font-weight: 550;
            }

            .router{
                text-decoration: none;
                cursor: pointer;
            }
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
            margin-left: 80%;
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