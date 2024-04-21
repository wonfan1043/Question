<script>
import Logo from '../components/TopLogo.vue';
export default {
    data() {
        return {
            num: "",
            title: "",
            description: "",
            content: [],
            single: "（單選）",
            multi: "（複選）",
            text: "（簡答）",
            name: "",
            phone: "",
            email: "",
            age: "",
            quizId: localStorage.getItem("quizId"),
            singleAns: [],
            multiAns: [],
            textContent: [],
            textAns: [],
            reply: [],
            mail: [],
        }
    },
    components: {
        Logo,
    },
    methods: {
        deleteLocalStorage() {
            localStorage.removeItem("quizId");
        },
        saveMulti(ans) {
            // let arr = [...this.multiAns]
            // console.log(arr);
            // console.log(ans);
            let index = this.multiAns.indexOf(ans);
            // console.log(index);
            if (index != -1) {
                this.multiAns.splice(index, 1);
                // console.log("x");
                // console.log(this.multiAns);
            } else {
                this.multiAns.push(ans);
                // console.log("x");
                // console.log(this.multiAns);
            }
        },
        saveText(id, text) {
            this.textAns[id] = id + '|' + text;
        },
        saveAll() {
            this.mail = [];

            //確認基本資料是否填寫
            if (!this.name || !this.phone || !this.email) {
                return alert("請填寫姓名/手機/信箱！");
            }

            //確認手機格式是否正確
            let phonePattern = /09\d{8}/;
            if (phonePattern.test(this.phone) != true) {
                return alert("手機格式錯誤！");
            }

            //確認email格式是否正確
            //參考連結：https://ithelp.ithome.com.tw/articles/10094951
            let emailPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            if (emailPattern.test(this.email) != true) {
                return alert("信箱格式錯誤！")
            }

            //確認年紀是否合理
            if (this.age < 0 || this.age > 120) {
                return alert("請重新確認年齡！")
            }

            //確認必填問題是否都已填寫
            //(1)先整理出所有必填問題的題號
            let requiredQ = [];
            this.content.forEach(item => {
                if (item.required == true) {
                    requiredQ.push(item.questionId);
                }
            })
            //(2)整理所有有回答的單選題題號
            let answeredSingle = [];
            this.singleAns.forEach(item => {
                let str = item.split("|");
                answeredSingle.push(str[0]);
            })
            //(3)整理所有有回答的複選題題號
            let answeredmulti = [];
            this.multiAns.forEach(item => {
                let str = item.split("|");
                answeredmulti.push(str[0]);
            })
            //(4)整理所有有回答的簡答題題號
            let answeredtext = [];
            this.textAns.forEach(item => {
                let str = item.split("|");
                answeredtext.push(str[0]);
            })
            //(5)將所有有回答的問題題號放進同一個陣列中，並宣告一個名為error的陣列用來放等等檢查到沒有被回答的必填問題題號
            let allAns = [...answeredSingle, ...answeredmulti, ...answeredtext];
            let error = [];
            //(6)遍歷第一步整理出的所有必填問題題號，如果所有有回答的問題題號陣列不包含其值，並且error陣列也還未放入，就push進去error
            requiredQ.forEach(quId => {
                if (!allAns.includes(quId.toString()) && !error.includes(quId.toString())) {
                    error.push(quId);
                }
            })
            //(7)如果必填都有回答，error陣列應為空陣列，因此若長度不為0就跳出警示窗並提醒是哪幾題
            if (error.length != 0) {
                let message = "";
                error.forEach(ques => {
                    message += ques + "、";
                })
                return alert(`第${message.slice(0, (message.length - 1))}題未作答！`);
            }

            //作答沒問題，將所有回答儲存後傳到下一層
            this.reply.push(this.singleAns);
            this.reply.push(this.multiAns);
            this.reply.push(this.textAns);
            this.mail.push(this.title);
            this.mail.push(this.description);
            this.mail.push(this.content);
            this.mail.push(this.name);
            this.mail.push(this.phone);
            this.mail.push(this.email);
            this.mail.push(this.age);
            this.mail.push(this.quizId);
            this.mail.push(this.reply);
            // console.log(this.mail);
            this.$emit('sendMail', this.mail);
        }
    },
    mounted() {
        this.num = localStorage.getItem("quizId");
        console.log(this.num);
        fetch("http://localhost:8080/quiz/search_quiz", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.num)
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data.quizList);
                data.quizList.forEach(item => {
                    this.title = item.quiz_name;
                    this.description = item.quiz_description;
                    let obj = {
                        questionId: item.question_id,
                        question: item.question_name,
                        required: item.is_necessary,
                        type: item.question_type,
                        choice: item.question_options.split(";")
                    }
                    this.content.push(obj);
                });
                // console.log(this.title);
                // console.log(this.description);
                // console.log(this.content);
            });
    },

}
</script>

<template>
    <Logo />
    <div class="imgL"></div>
    <div class="butterfly"></div>
    <div class="imgR"></div>
    <!-- 表單開頭 -->
    <div class="survey1">
        <!-- 問卷名稱 -->
        <h1 class="title border">{{ this.title }}</h1>
        <!-- 第一區：說明及基本資料 -->
        <div class="basicInfo border">
            <!-- 問卷說明 -->
            <p class="description border">{{ this.description }}</p>
            <div class="personInfo border">
                <!-- label的for屬性配上input的id屬性可以提升使用者體驗 → 點擊label的字時關聯的input會自動被選起 -->
                <!-- 姓名 -->
                <label for="name">姓名&nbsp;</label>
                <input type="text" id="name" name="name" v-model="this.name" placeholder="必填" required>
                <!-- 手機 -->
                <label for="phone">&nbsp;手機&nbsp;</label>
                <input type="text" pattern="" id="phone" name="phone" v-model="this.phone"
                    placeholder="必填，格式：09XXXXXXXX" required> <br>
                <!-- 信箱 -->
                <label for="email">信箱&nbsp;</label>
                <input type="email" id="email" name="email" v-model="this.email" placeholder="必填" required>
                <!-- 年齡 -->
                <label for="age">&nbsp;年齡&nbsp;</label>
                <input type="number" id="age" name="age" v-model.number="this.age"> <br>
            </div>
        </div>
        <!-- 第二區：作答 -->
        <!-- content陣列中放了所有問題，對其遍歷來生成相對應數量的問題區塊 -->
        <div class="answerSec border" v-for="item in this.content">
            <!-- 問題編號+問題 -->
            <span class="question border">{{ `${item.questionId}. ${item.question}` }}</span>
            <!-- 根據0、1、2判別題型 -->
            <span class="type" v-if="item.type == 0">{{ this.text }}</span>
            <span class="type" v-if="item.type == 1">{{ this.single }}</span>
            <span class="type" v-if="item.type == 2">{{ this.multi }}</span>
            <!-- 根據是否必填顯示提示字 -->
            <span class="necessary" v-if="item.required == true">*必填</span>
            <!-- 題型：單選 -->
            <div class="border choice" v-for="option in item.choice" v-if="item.type == 1">
                <input class="single" type="radio" :id="option" :name="item.questionId"
                    :value="item.questionId + '|' + option" :required="item.required"
                    v-model="this.singleAns[item.questionId]">
                <label :for="option" :key="option" v-if="item.type == 1" style="font-weight: 700;">&nbsp;{{ option
                    }}</label><br>
            </div>
            <!-- 題型：複選 -->
            <div class="border choice" v-for="option in item.choice" v-if="item.type == 2">
                <input class="multi" type="checkbox" :id="option" :name="item.questionId" :value="option"
                    @change="this.saveMulti(item.questionId + '|' + option)">
                <label :for="option" :key="option" v-if="item.type == 2" style="font-weight: 700;">&nbsp;{{ option
                    }}</label><br>
            </div>
            <!-- 題型：簡答 -->
            <div class="border choice" v-if="item.type == 0">
                <textarea class="text" cols="30" rows="3" placeholder="點此作答" style="font-size: larger;"
                    :required="item.required" v-model="this.textContent[item.questionId]"
                    @change="this.saveText(item.questionId, this.textContent[item.questionId])"></textarea>
            </div>
        </div>
        <div class="btn border">
            <router-link class="router" to="/userHome">
                <button class="btnL" type="button" @click="deleteLocalStorage">返回</button>
            </router-link>
            <button type="submit" @click="saveAll">下一步</button>
        </div>
    </div>
    <div class="footer"></div>
</template>

<style lang="scss" scoped>
* {
    color: #135d66;
}

.survey1 {
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
        font-size: 120%;

        label {
            background-color: transparent;
            font-weight: 1000;
        }

        input {
            padding: 0.5% 1.5%;
            width: 43%;
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

    .type {
        background-color: transparent;
        font-weight: 600;
        font-size: large;
        padding-bottom: 1%;
    }

    .necessary {
        margin-left: 3%;
        background-color: transparent;
        font-weight: 600;
        font-size: large;
        padding-bottom: 1%;
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