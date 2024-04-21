<script>
import Logo from '../components/TopLogo.vue';
import Revise from '../components/Revise.vue';
export default {
    data() {
        return {
            switch: false,
            receivedMail: [],
            quizId: "",
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            quIdList: [],
            quesList: [],
            quesTypeList: [],
            isRequiredList: [],
            choiceList: [],
        }
    },
    components: {
        Logo,
        Revise
    },
    methods: {
        receiveMail(mail) {
            this.switch = !this.switch;
            this.receivedMail = [...mail];
            // console.log(mail);
            // console.log(this.receivedMail);
            this.title = mail[0];
            this.description = mail[1];
            this.startDate = mail[2];
            this.endDate = mail[3];
            this.quIdList = [...mail[4]];
            this.quesList = [...mail[5]];
            this.quesTypeList = [...mail[6]];
            this.isRequiredList = [...mail[7]];
            this.choiceList = [...mail[8]];
            console.log(this.isRequiredList);
            console.log(this.choiceList);
            for(let i = 0; i < this.isRequiredList.length; i++){
                if(this.isRequiredList[i] === undefined){
                    this.isRequiredList[i] = false
                }
            }
            console.log(this.isRequiredList);
            for(let i = 0; i < this.choiceList.length; i++){
                if(this.choiceList[i] === undefined ){
                    this.choiceList[i] = "　";
                }
            }
            console.log(this.choiceList);
        },
        change(){
            this.switch = !this.switch
        },
        saveOnly() {
            this.quizId = localStorage.getItem("quizId");
            console.log(this.quizId);
            this.quesList.splice(0, 1);
            console.log(this.quesList);
            this.quesTypeList.splice(0, 1);
            console.log(this.quesTypeList);
            this.isRequiredList.splice(0, 1);
            console.log(this.isRequiredList);
            this.choiceList.splice(0, 1);
            console.log(this.choiceList);
            let quizList = [];
            for(let i = 0; i < this.quIdList.length; i++){
                let quiz = {
                    quiz_id: this.quizId,
                    question_id: this.quIdList[i],
                    quiz_name: this.title,
                    quiz_description: this.description,
                    start_date: this.startDate,
                    end_date: this.endDate,
                    question_name: this.quesList[i],
                    question_type: String(this.quesTypeList[i]),
                    is_necessary: this.isRequiredList[i],
                    question_options: this.choiceList[i],
                    is_published: false
                    }
                    quizList.push(quiz);
                }
            console.log(quizList);
            let req = {
                quiz_list: [...quizList],
                is_published: false
            }
            console.log(req);
            fetch("http://localhost:8080/quiz/update", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                }
                )
            localStorage.removeItem("quizId");
        },
        saveAndPublish(){
            this.quizId = localStorage.getItem("quizId");
            console.log(this.quizId);
            this.quesList.splice(0, 1);
            console.log(this.quesList);
            this.quesTypeList.splice(0, 1);
            console.log(this.quesTypeList);
            this.isRequiredList.splice(0, 1);
            console.log(this.isRequiredList);
            this.choiceList.splice(0, 1);
            console.log(this.choiceList);
            let quizList = [];
            for(let i = 0; i < this.quIdList.length; i++){
                let quiz = {
                    quiz_id: this.quizId,
                    question_id: this.quIdList[i],
                    quiz_name: this.title,
                    quiz_description: this.description,
                    start_date: this.startDate,
                    end_date: this.endDate,
                    question_name: this.quesList[i],
                    question_type: String(this.quesTypeList[i]),
                    is_necessary: this.isRequiredList[i],
                    question_options: this.choiceList[i],
                    is_published: true
                    }
                    quizList.push(quiz);
                }
            console.log(quizList);
            let req = {
                quiz_list: [...quizList],
                is_published: true
            }
            console.log(req);
            fetch("http://localhost:8080/quiz/update", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                }
                )
            localStorage.removeItem("quizId");
        }
    }
}
</script>

<template>
    <Logo />
    <div class="imgL"></div>
    <div class="butterfly"></div>
    <div class="imgR"></div>
    <div v-show="!this.switch">
        <Revise @sendMail="receiveMail" />
    </div>
    <div class="survey" v-if="this.switch">
        <h1 class="title border">{{ this.title }}</h1>
        <div class="basicInfo border">
            <div class="description border">
                <p style="font-size: larger;">問卷說明</p>
                <p>{{ this.description }}</p>
            </div>
            <div class="time border">
                <label style="font-size: larger">開始日期</label> &nbsp;
                <span>{{ this.startDate }}</span> <br>
                <label style="font-size: larger">結束日期</label> &nbsp;
                <span>{{ this.endDate }}</span> <br>
            </div>
        </div>
        <div class="answerSec border" v-for="quId in this.quIdList">
            <div class="border questionSec">
                <span>{{ `${quId}.` }}</span>&nbsp;
                <span>{{ this.quesList[quId] }}</span>&nbsp;&nbsp;&nbsp;
                <span v-if="this.quesTypeList[quId] == 1">(單選題)</span>
                <span v-if="this.quesTypeList[quId] == 2">(複選題)</span>
                <span v-if="this.quesTypeList[quId] == 0">(簡答題)</span>
                <span v-if="this.isRequiredList[quId] == 1">&nbsp;&nbsp;&nbsp;*必填</span>
            </div>
            <div class="border choice">
                <p v-for="option in String(this.choiceList[quId]).split(';')" v-if="this.quesTypeList[quId] != 0">{{
                    option }}</p>
                <p class="textAns" v-if="this.quesTypeList[quId] == 0">(簡答題無選項)</p>
            </div>
        </div>
        <div class="btn border">
            <button class="btnL" type="button" @click="change">編輯</button>
            <router-link class="router" to="/adminHome">
                <button class="btnM" type="button" @click="saveOnly">儲存</button>
            </router-link>
            <router-link class="router" to="/adminHome">
                <button type="button" @click="saveAndPublish">儲存並發布</button>
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

        p {
            background-color: transparent;
            font-size: 100%;
            font-weight: 600;
        }
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

        span {
            background-color: transparent;
            padding: 0;
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

    .questionSec {
        font-size: 140%;
        margin-bottom: .5%;
        padding-left: 1%;
    }

    span {
        background-color: transparent;
        font-weight: 600;
    }

    p {
        background-color: transparent;
        font-size: 110%;
        font-weight: 600;
        padding: .5% 1%;
    }

    .question {
        background-color: transparent;
        margin-bottom: 0.5%;
        font-size: x-large;
    }

    .border {
        background-color: transparent;

    }

    .choice {
        border-radius: 10px;
        width: 90%;
        height: auto;
        padding: 1%;
        background-color: #abd8cc;
        margin-bottom: 0.5%;
        font-size: large;

        .textAns {
            color: rgb(19, 93, 102, 0.5);
        }
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

    .btnM {
        margin-right: 2%;
    }

    button {
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

.footer {
    width: 100%;
    height: 5dvh;
}
</style>