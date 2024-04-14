<script>
import Logo from '../components/TopLogo.vue';
export default {
    data() {
        return {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
        }
    },
    components: {
        Logo,
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <Logo />
    <div class="imgL"></div>
    <div class="butterfly"></div>
    <div class="imgR"></div>
    <div class="survey">
        <input class="title border" v-text="this.title" type="text" placeholder="點此輸入問卷名稱">
        <div class="basicInfo border">
            <input class="description border" v-text="this.description" type="text" placeholder="點此輸入問卷說明">
            <div class="time border">
                <label for="">開始時間</label> &nbsp;
                <input type="date" v-model="this.startDate"> &nbsp;
                <br>
                <label for="">結束時間</label> &nbsp;
                <input type="date" v-model="this.endDate"> &nbsp;
                <br>
            </div>
        </div>
        <div class="answerSec border">
            <input class="question border" type="text" placeholder="點此輸入題目名稱"><br>
            <div class="border qSet">
                <div class="block1">
                    <input class="input" type="radio" name="q_type" required><label>單選題</label>
                    <input class="input" type="radio" name="q_type" required><label>多選題</label>
                    <input class="input" type="radio" name="q_type" required><label>簡答題</label>
                    <input class="input checkbox" type="checkbox"><label>必填</label>
                </div>
                <div class="block2">
                    <i class="fa-solid fa-trash-can icon"></i>
                </div>
            </div>
            <div class="border choice">
                <textarea name="" id="" placeholder="點此輸入選項，不同選項請以半形分號「;」隔開&#10;(例)選項1;選項2;選項3;選項4" cols="100"
                    rows="5"></textarea>
            </div>
            <i class="fa-solid fa-square-plus icon">&nbsp;&nbsp;新增問題</i>
        </div>

        <div class="btn border">
            <router-link class="router" to="/adminHome">
                <button class="btnL" type="button">返回</button>
            </router-link>
            <router-link to="/createCheck">
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
    z-index: 0;

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
    background-color: #edfffa;
    padding: 1%;
    border-radius: 10px;
    border: none;
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
        border: none;
    }

    .time {
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
            background-color: #edfffa;
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
        border: none;
        padding: .5%;
        border-radius: 10px;
    }

    .border {
        background-color: transparent;
        font-weight: 600;
    }

    .qSet {
        display: flex;
        justify-content: space-between;

        .block1 {
            width: 99%;
            background-color: transparent;
        }

        .block2 {
            width: 1%;
            background-color: transparent;

            .icon {
                cursor: pointer;
                background-color: transparent;

                &:active {
                    color: #ceede5;
                }
            }
        }

        .input {
            margin: 0% .5%;
        }

        .checkbox {
            margin-left: 7%;
            margin-right: .5%;
        }

        label {
            background-color: transparent;
        }
    }


    .choice {
        border-radius: 10px;
        width: 90%;
        height: auto;
        padding: 1%;
        background-color: #abd8cc;
        margin-top: 0.5%;
        margin-bottom: 0.5%;
        font-size: large;

        textarea {
            margin-top: 0.5%;
            padding: 1%;
            border-radius: 10px;
        }
    }
}

.icon {
    margin-top: 1%;
    margin-left: 6%;
    background-color: transparent;
    font-weight: 700;
    cursor: pointer;

    &:active {
        color: #ceede5;
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