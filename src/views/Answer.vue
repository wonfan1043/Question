<script>
import Logo from '../components/TopLogo.vue';
import AnswerSurvey from '../components/AnswerSurvey.vue';
export default {
    data() {
        return {
            switch: false,
            response: [],
            ansList: [],
        }
    },
    components: {
        Logo,
        AnswerSurvey
    },
    methods: {
        iputFromAnswerSurvey(x) {
            this.switch = !this.switch
            this.ansList = [];
            this.response = x;
            // console.log(this.response);
            //單選答案
            this.response[8][0].forEach(item => {
                if (item != undefined) {
                    let str = item.split("|");
                    this.ansList[str[0]] = str[1];
                }
            });
            //複選答案
            this.response[8][1].forEach(item => {
                let str = item.split("|");
                if (this.ansList[str[0]] == undefined) {
                    this.ansList[str[0]] = str[1];
                } else {
                    this.ansList[str[0]] += '\n' + str[1];
                }
            })
            //簡答答案
            this.response[8][2].forEach(item => {
                if (item != undefined) {
                    let str = item.split("|");
                    this.ansList[str[0]] = str[1];
                }
            })
        },
        backToAnswerPage() {
            this.switch = !this.switch
        },
        saveAns(){
            // console.log(this.ansList);
            // console.log(this.response);
            let reqList = [];
            let surveyId = localStorage.getItem("quizId");
            let Name = this.response[3];
            let Phone = this.response[4];
            let Email = this.response[5];
            let Age = this.response[6];
            this.ansList.forEach(item => {
                let obj = {
                    name: Name,
                    phone: Phone,
                    email: Email,
                    age: Age,
                    quizId: surveyId,
                    quId: this.ansList.indexOf(item),
                    answer: String(item).replace('\n', ';')
                }
                console.log(obj);
                reqList.push(obj);
            })
            // console.log(reqList);
            let req = {
                answerList: reqList,
            }
            fetch("http://localhost:8080/quiz/answer", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
        localStorage.removeItem("quizId");
        }
    },
}
</script>

<template>
    <Logo />
    <div class="imgL"></div>
    <div class="butterfly"></div>
    <div class="imgR"></div>
    <div v-show="!this.switch">
        <AnswerSurvey @sendMail="iputFromAnswerSurvey"/>
    </div>
    <div class="survey2" v-if="this.switch">
        <h1 class="title border">{{ this.response[0] }}</h1>
        <div class="basicInfo border">
            <p class="description border">{{ this.response[1] }}</p>
            <div class="personInfo border">
                <label>姓名：&nbsp;</label>
                <span>{{ this.response[3] }}</span> <br>
                <label>手機：&nbsp;</label>
                <span>{{ this.response[4] }}</span> <br>
                <label>信箱：&nbsp;</label>
                <span>{{ this.response[5] }}</span> <br>
                <label>年齡：&nbsp;</label>
                <span>{{ this.response[6] }}</span> <br>
            </div>
        </div>
        <!-- 題目區 -->
        <div class="answerSec border" v-for="item in response[2]">
            <!-- 題目 -->
            <h3 class="question border">{{ `(${item.questionId}) ${item.question}` }}</h3>
            <!-- 選項 -->
            <pre class="border choice">{{ this.ansList[item.questionId] }}</pre><br>
        </div>
        <!-- 按鈕 -->
        <div class="btn border">
            <button class="btnL" type="button" @click="backToAnswerPage">返回</button>
            <!-- <router-link to="/userHome"> -->
            <button type="button" @click="saveAns">送出</button>
            <!-- </router-link> -->
            <div class="footer"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    color: #135d66;
}

.survey2 {
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
        font-weight: 600;
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

        span {
            background-color: transparent;
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
        height: fit-content;
        padding: 1%;
        background-color: #abd8cc;
        margin-bottom: 0.5%;
        font-size: x-large;
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