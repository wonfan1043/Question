<script>
import Logo from '../components/TopLogo.vue';
export default {
    data() {
        return {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            quesNum: [1], //題號陣列，同時用來生成對應數量的題目框
            ques: [], //題目陣列，index為題號，value為題目
            quesType: [], //題型陣列，index為題號，value為題型
            isRequired: [], //是否必填陣列，index為題號，value為是否必填
            choices: [], //選項陣列，index為題號，value為選項
            mail: [] //用來emit的陣列
        }
    },
    components: {
        Logo,
    },
    methods: {
        addQues(){
            this.quesNum.push((this.quesNum.length+1));
        },
        deleteQues(index){
            if(this.quesNum.length > 1){
                // console.log('=====更新題號前=====');
                this.quesNum.splice(index, 1);
                // console.log('題號');
                // console.log(this.quesNum);
                this.ques.splice(index+1, 1);
                // console.log('題目');
                // console.log(this.ques);
                this.quesType.splice(index+1, 1);
                // console.log('題型');
                // console.log(this.quesType);
                this.isRequired.splice(index+1, 1);
                // console.log('必填');
                // console.log(this.isRequired);
                this.choices.splice(index+1, 1);
                // console.log('選項');
                // console.log(this.choices);
                for(let i = index; i < this.quesNum.length; i++){
                    this.quesNum[i] = (this.quesNum[i]-1);
                    // console.log('=====更新題號後=====');
                    // console.log('題號');
                    // console.log(this.quesNum);
                    // console.log('題目');
                    // console.log(this.ques);
                    // console.log('題型');
                    // console.log(this.quesType);
                    // console.log('必填');
                    // console.log(this.isRequired);
                    // console.log('選項');
                    // console.log(this.choices);
                }

            } else {
                console.log(index);
                return alert("最少需要一個問題！");
            }
        },
        goCheck(){
            if(!this.title){
                return alert("請輸入問卷名稱！");
            }
            if(!this.startDate || !this.endDate){
                return alert("請設定日期！");
            }
            if(new Date(this.startDate) < new Date()){
                return alert("開始日期不可晚於現在日期！");
            }
            if(new Date(this.endDate) < new Date()){
                return alert("開始日期不可晚於現在日期！");
            }
            if(this.startDate > this.endDate){
                return alert("開始日期不可晚於結束日期！");
            }
            if(this.ques.length !== (this.quesNum.length+1)){
                return alert("請輸入題目！");
            }
            if(this.quesType.length !== (this.quesNum.length+1)){
                return alert("請選擇題型！");
            }
            this.mail.push(this.title);
            this.mail.push(this.description);
            this.mail.push(this.startDate);
            this.mail.push(this.endDate);
            this.mail.push(this.quesNum);
            this.mail.push(this.ques);
            this.mail.push(this.quesType);
            this.mail.push(this.isRequired);
            this.mail.push(this.choices);
            this.$emit('sendMail', this.mail);
        },
        test(){
            console.log('=====剛新增完問題=====');            
            console.log('我是問卷名稱');
            console.log(this.title);
            console.log('我是問卷說明');
            console.log(this.description);
            console.log('我是開始日期');
            console.log(this.startDate);
            console.log('我是結束日期');
            console.log(this.endDate);
            console.log('我是題號');
            console.log(this.quesNum);
            console.log('我是問題');
            console.log(this.ques);
            console.log('我是種類');
            console.log(this.quesType);
            console.log('我是必填');
            console.log(this.isRequired);
            console.log('我是選項');
            console.log(this.choices);
        }
    },
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
        <input class="title border" v-model="this.title" type="text" placeholder="點此輸入問卷名稱">
        <div class="middle">
            <div class="basicInfo border">
                <div class="description">
                    <p>問卷說明</p>
                    <textarea v-model="this.description" placeholder="點此輸入問卷說明" cols="90" rows="5" style="margin-left: .5%; font-size: large; font-weight: 600; padding-left: 1.5%;"></textarea>
                </div>
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
                <div class="border choice" v-for="quesId in this.quesNum">
                    <span class="quId">{{ `${quesId}.` }}</span>
                    <input class="question border" type="text" placeholder="點此輸入題目名稱" v-model="this.ques[quesId]">
                    <i class="fa-solid fa-trash-can icon" @click="deleteQues((quesId-1))"></i>
                    <div class="border qSet" style="margin-left: .5%;">
                        <div class="block1">
                            <input class="input" :id="`${quesId}single`" type="radio" :name="`${quesId}type`" value="1" required v-model="this.quesType[quesId]"><label :for="`${quesId}single`">單選題</label>
                            <input class="input" :id="`${quesId}multi`" type="radio" :name="`${quesId}type`" value="2" required v-model="this.quesType[quesId]"><label :for="`${quesId}multi`">複選題</label>
                            <input class="input" :id="`${quesId}text`" type="radio" :name="`${quesId}type`" value="0" required v-model="this.quesType[quesId]"><label :for="`${quesId}text`">簡答題</label>
                            <input class="input checkbox" type="checkbox" :id="`${quesId}isRequire`" :name="`${quesId}require`" value="1" v-model="this.isRequired[quesId]"><label :for="`${quesId}isRequire`">必填</label>
                        </div>
                    </div>
                    <textarea v-model="this.choices[quesId]" v-if="this.quesType[quesId] != 0" placeholder="點此輸入選項，不同選項請以半形分號「;」隔開&#10;(例)選項1;選項2;選項3;選項4" cols="90"
                        rows="5"
                        style="margin-left: .5%; font-size: large; font-weight: 600; padding-left: 1.5%;"></textarea>
                </div>
                <div class="addQues">
                    <i class="fa-solid fa-square-plus icon" @click="addQues"></i>
                </div>
            </div>
        </div>

        <div class="btn border">
            <router-link class="router" to="/adminHome">
                <button class="btnL" type="button">返回</button>
            </router-link>
            <button type="button" @click="goCheck">下一步</button>
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
    // margin-left: 5%;
    width: 84.2%;
}

.middle {
    margin-left: 5%;
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
    // margin-bottom: .8%;
    text-align: center;
    font-size: 300%;
    font-weight: 800;
    background-color: #edfffa;
    padding: 1%;
    border-radius: 10px;
    border: none;
    outline: none;
}


textarea {
            margin-top: 0.5%;
            padding: 1%;
            border-radius: 10px;
            resize: vertical;
        }

.basicInfo {
    background-color: #ceede5;
    height: auto;
    padding-top: 1%;
    padding-left: 5%;

    .description {
        width: 90%;
        font-size: 130%;
        border-radius: 10px;
        background-color: #abd8cc;
        margin-top: 1%;
        margin-bottom: 2%;
        padding: 1% 1%;
        font-weight: 600;
        border: none;

        p{
            background-color: transparent;
            font-size: 110%;
            padding: 1%;
            padding-top: 0;
            font-weight: 600;
        }
    }

    .time {
        width: 90%;
        border-radius: 10px;
        background-color: #abd8cc;
        padding: 1% 3%;
        font-size: 130%;

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
    padding-left: 5%;

    .question {
        background-color: transparent;
        margin-bottom: 0.5%;
        font-size: x-large;
        border: none;
        padding: .5% 1%;
        border-radius: 10px;
    }

    .border {
        background-color: transparent;
        font-weight: 600;
    }

    .qSet {
        display: flex;
        justify-content: space-between;
        font-size: 105%;

        .block1 {
            width: 99%;
            background-color: transparent;
            padding-top: 1%;
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
            font-weight: 600;
        }
    }


    .choice {
        border-radius: 10px;
        width: 91.3%;
        height: auto;
        padding: 1%;
        background-color: #abd8cc;
        margin-top: 0.5%;
        margin-bottom: 2%;
        font-size: large;
        position: relative;

        .quId{
            background-color: transparent;
            font-weight: 600;
            font-size: x-large;
            margin-left: 1%;
        }

        .fa-trash-can {
            position: absolute;
            top: 9%;
            right: 3.5%;
            font-size: x-large;
            cursor: pointer;
            background-color: transparent;

            &:active {
                color: #ceede5;
            }
        }
    }
}

.addQues {
    background-color: transparent;

    .icon {
        margin-top: 1%;
        margin-left: 2%;
        margin-bottom: 1%;
        background-color: transparent;
        font-size: 130%;
        font-weight: 700;
        cursor: pointer;

        &:active {
            color: #ceede5;
        }

        &::after {
            content: " 新增問題";
            background-color: transparent;
            font-family: "Klee One", cursive;
            font-weight: 600;
            font-style: normal;
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