<script>
import Logo from '../components/TopLogo.vue';
export default {
    data() {
        return {
            title: "我是問卷名稱",
            description: "我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明我是問卷說明",
            name: "我是名字",
            phone: "0800092000",
            email: "我是信箱",
            age: "18",
        }
    },
    components: {
        Logo,
    }
}
</script>

<template>
    <Logo />
    <div class="imgL"></div>
    <div class="butterfly"></div>
    <div class="imgR"></div>
    <div class="survey">
        <h1 class="title border" v-text="this.title"></h1>
        <div class="basicInfo border">
            <p class="description border" v-text="this.description"></p>
            <div class="personInfo border">
                <label for="">姓名</label> &nbsp;
                <input type="text" v-model="this.name"> &nbsp;
                <label for="">手機</label> &nbsp;
                <input type="number" v-model="this.phone"> <br>
                <label for="">信箱</label> &nbsp;
                <input type="text" v-model="this.email"> &nbsp;
                <label for="">年齡</label> &nbsp;
                <input type="number" v-model="this.age"> <br>
            </div>
        </div>
        <div class="answerSec border">
            <h3 class="question border">我是題目1</h3>
            <div class="border choice">
                <input class="single" type="radio" name="我是題目1" required>&nbsp;<label for="">我是單選選項</label><br>
                <input class="single" type="radio" name="我是題目1" required>&nbsp;<label for="">我是單選選項</label><br>
                <input class="single" type="radio" name="我是題目1" required>&nbsp;<label for="">我是單選選項</label><br>
                <input class="single" type="radio" name="我是題目1" required>&nbsp;<label for="">我是單選選項</label><br>
            </div>
            <h3 class="question border">我是題目2</h3>
            <div class="border choice">
                <input class="single" type="radio" name="我是題目2">&nbsp;<label for="">我是單選選項</label><br>
                <input class="single" type="radio" name="我是題目2">&nbsp;<label for="">我是單選選項</label><br>
                <input class="single" type="radio" name="我是題目2">&nbsp;<label for="">我是單選選項</label><br>
                <input class="single" type="radio" name="我是題目2">&nbsp;<label for="">我是單選選項</label><br>
            </div>
            <h3 class="question border">我是題目3</h3>
            <div class="border choice">
                <input class="multi" type="checkbox" name="我是題目3" required>&nbsp;<label for="">我是複選選項</label><br>
                <input class="multi" type="checkbox" name="我是題目3" required>&nbsp;<label for="">我是複選選項</label><br>
                <input class="multi" type="checkbox" name="我是題目3" required>&nbsp;<label for="">我是複選選項</label><br>
                <input class="multi" type="checkbox" name="我是題目3" required>&nbsp;<label for="">我是複選選項</label><br>
            </div>
            <h3 class="question border">我是題目4</h3>
            <div class="border choice">
                <textarea class="text" name="" id="" cols="30" rows="3"></textarea>
            </div>
        </div>
        <div class="btn border">
            <router-link class="router" to="/userHome">
                <button class="btnL" type="button">返回</button>
            </router-link>
            <router-link to="/answerCheck">
                <button type="button">下一步</button>
            </router-link>
        </div>
    </div>
    <div class="footer"></div>
</template>

<style lang="scss" scoped>
* {
    color: #135d66;
}

.survey {
    // border: 1px solid black;
    width: 87%;
    padding: 0;
    opacity: 0;
    animation: showContent 0.8s 1.15s forwards;

    @keyframes showContent {
        100% {
            opacity: 1;
        }
    }
}

.border {
    // border: 1px solid black;
    margin-left: 5%;
    width: 80%;
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
    right: 16.75%;
    top: 10%;
    z-index: 2;
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
    right: 13%;
    top: 70%;
    z-index: 2;
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

.title {
    margin-top: 5%;
    margin-bottom: .8%;
    text-align: center;
    font-size: 300%;
    font-weight: 800;
}

.basicInfo {
    background-color: #ceede5;
    height: auto;
    padding: 1%;

    .description {
        width: 90%;
        font-size: 130%;
        border-radius: 10px;
        background-color: #abd8cc;
        margin-top: 1%;
        margin-bottom: 2%;
        padding: 1% 3%;
        font-weight: 550;
    }

    .personInfo {
        width: 90%;
        border-radius: 10px;
        background-color: #abd8cc;
        padding: 1% 3%;
        font-size: 125%;

        label {
            background-color: transparent;
            font-weight: 1000;
        }

        input {
            padding: 0.5% 1.5%;
            width: 41%;
            font-size: large;
            font-weight: 600;
            border: none;
            border-radius: 30px;
            margin: 0.5% 0%;
        }
    }

}

.answerSec {
    background-color: #ceede5;
    height: auto;
    padding: 1%;

    .question {
        background-color: transparent;
        margin-bottom: 0.5%;
        font-size: x-large;
    }

    .border {
        background-color: transparent;
        font-weight: 600;
    }

    .choice {
        border-radius: 10px;
        width: 90%;
        height: auto;
        padding: 1%;
        background-color: #abd8cc;
        margin-bottom: 0.5%;
        font-size: large;
    }

    label {
        background-color: transparent;
    }

    .text {
        width: 100%;
        margin-top: 0.5%;
        font-weight: 600;
        padding: 1%;
        border-radius: 10px;
    }

}

.btn {
    margin-top: 1%;
    height: auto;
    padding-bottom: 1%;

    .router {
        text-decoration: none;
        background-color: transparent;
    }

    .btnL {
        margin-right: 2%;
        margin-left: 70%;
    }

    button {
        width: 10%;
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

.footer {
    width: 100%;
    height: 5dvh;
}
</style>