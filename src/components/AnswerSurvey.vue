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
            mail:[]
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
            let index = this.multiAns.indexOf(ans);
            if (index !== -1) {
                this.multiAns.splice(index, 1);
            } else {
                this.multiAns.push(ans);
            }
        },
        saveText(id, text) {
            this.textAns[id] = id + '|' + text;
        },
        saveAll(){
            this.reply.push(this.singleAns);
            this.reply.push(this.multiAns);
            this.reply.push(this.textAns);
            // console.log(this.reply);
            this.mail.push(this.title);
            this.mail.push(this.description);
            this.mail.push(this.content);
            this.mail.push(this.name);
            this.mail.push(this.phone);
            this.mail.push(this.email);
            this.mail.push(this.age);
            this.mail.push(this.quizId);
            this.mail.push(this.reply);
            console.log(this.mail);
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
    <div class="survey">
        <!-- 表單開頭 -->
        <form action="" method="">
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
                    <input type="text" pattern="886-9\d{8}" id="phone" name="phone" v-model="this.phone"
                        placeholder="必填，格式：886-9XXXXXXXX" required> <br>
                    <!-- 信箱 -->
                    <label for="email">信箱&nbsp;</label>
                    <input type="email" id="email" name="email" v-model="this.email" placeholder="必填" required>
                    <!-- 年齡 -->
                    <label for="age">&nbsp;年齡&nbsp;</label>
                    <input type="number" min="0" max="120" id="age" name="age" v-model.number="this.age"> <br>
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
                    <input class="single" type="radio" :id="option" :name="item.questionId" :value="item.questionId+'|'+option"
                        :required="item.required" v-model="this.singleAns[item.questionId]"><label :for="option"
                        :key="option" v-if="item.type == 1">&nbsp;{{
                            option }}</label><br>
                </div>
                <!-- 題型：複選 -->
                <div class="border choice" v-for="option in item.choice" v-if="item.type == 2">
                    <input class="multi" type="checkbox" :id="option" :name="item.questionId" :value="option" @change="this.saveMulti(item.questionId + '|' + option)"><label
                        :for="option" :key="option" v-if="item.type == 2">&nbsp;{{ option }}</label><br>
                </div>
                <!-- 題型：簡答 -->
                <div class="border choice" v-if="item.type == 0">
                    <textarea class="text" cols="30" rows="3" placeholder="點此作答" style="font-size: larger;"
                        :required="item.required" v-model="this.textContent[item.questionId]" @change="this.saveText(item.questionId, this.textContent[item.questionId])"></textarea>
                </div>
            </div>
            <div class="btn border">
                <router-link class="router" to="/userHome">
                    <button class="btnL" type="button" @click="this.deleteLocalStorage()">返回</button>
                </router-link>
                <button type="submit" @click="saveAll()">下一步</button>
            </div>
        </form>
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