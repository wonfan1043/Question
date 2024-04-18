<script>
import Search from '../components/Search.vue';
export default {
    data() {
        return {
            searchRes: [],
            list: [],
            interval: '',
            delete: []
        }
    },
    components: {
        Search
    },
    methods: {
        showResult(result) {
            console.log(result);
            this.list = [];
            for (let i = 0; i < result.quizList.length; i++) {
                if (!this.list.some(item => item.num === result.quizList[i].quiz_id)) {
                    let obj = {
                        num: "",
                        title: "",
                        startDate: "",
                        endDate: "",
                        status: ""
                    }
                    let start = new Date(`${result.quizList[i].start_date}`);
                    let end = new Date(`${result.quizList[i].end_date}`);
                    let published = result.quizList[i].is_published;
                    let now = new Date();

                    switch (true) {
                        //未發布
                        case published == false:
                            obj.num = result.quizList[i].quiz_id,
                                obj.title = result.quizList[i].quiz_name,
                                obj.startDate = result.quizList[i].start_date,
                                obj.endDate = result.quizList[i].end_date,
                                obj.status = "未發布"
                            this.list.push(obj);
                            break;
                        //進行中
                        case start < now && end > now && published == true:
                            obj.num = result.quizList[i].quiz_id,
                                obj.title = result.quizList[i].quiz_name,
                                obj.startDate = result.quizList[i].start_date,
                                obj.endDate = result.quizList[i].end_date,
                                obj.status = "進行中"
                            this.list.push(obj);
                            break;
                        //未開始
                        case start > now && end > now && published == true:
                            obj.num = result.quizList[i].quiz_id,
                                obj.title = result.quizList[i].quiz_name,
                                obj.startDate = result.quizList[i].start_date,
                                obj.endDate = result.quizList[i].end_date,
                                obj.status = "未開始"
                            this.list.push(obj);
                            break;
                        //已結束
                        case start < now && end < now && published == true:
                            obj.num = result.quizList[i].quiz_id,
                                obj.title = result.quizList[i].quiz_name,
                                obj.startDate = result.quizList[i].start_date,
                                obj.endDate = result.quizList[i].end_date,
                                obj.status = "已結束"
                            this.list.push(obj);
                            break;
                    }
                }
            }
            console.log(this.list);
        },
        sendQuizId(num){
            localStorage.setItem("quizId", String(num))
        },
        scrollLeft() {
            clearInterval(this.interval);
            // 向左滾動
            this.interval = setInterval(() => {
                this.$refs.list.scrollLeft -= 10; // 調整滾動距離
            }, 10);

            setTimeout(() => {
                this.stopScroll();
            }, 500);
        },
        scrollRight() {
            clearInterval(this.interval);
            // 向右滾動
            this.interval = setInterval(() => {
                this.$refs.list.scrollLeft += 10; // 調整滾動距離
            }, 10);

            setTimeout(() => {
                this.stopScroll();
            }, 500);
        },
        stopScroll() {
            // 停止持续动作
            clearInterval(this.interval); // 停止定时器
        },
        deleteQuiz(){
            let deleteReq = {
                quizIds: [...this.delete],
            }
            console.log(this.delete);
            console.log(deleteReq);
            console.log(deleteReq.quizIds);
            fetch("http://localhost:8080/quiz/delete_quiz", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deleteReq)
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
        }
    },
    beforeCreate() {
        let searchReq = {
            quizName: "",
            startDate: "",
            endDate: "",
            backend: true
        }
        fetch("http://localhost:8080/quiz/search", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchReq)
        })
            .then(res => res.json())
            .then((data) => {
                this.searchRes.push(data.quizList);
                console.log(this.searchRes);

                for (let i = 0; i < this.searchRes[0].length; i++) {
                    if (!this.list.some(item => item.num === this.searchRes[0][i].quiz_id)) {
                        let obj = {
                            num: "",
                            title: "",
                            startDate: "",
                            endDate: "",
                            status: ""
                        }
                        let start = new Date(`${this.searchRes[0][i].start_date}`);
                        let end = new Date(`${this.searchRes[0][i].end_date}`);
                        let published = this.searchRes[0][i].is_published;
                        let now = new Date();

                        switch (true) {
                            //未發布
                            case published == false:
                                obj.num = this.searchRes[0][i].quiz_id,
                                obj.title = this.searchRes[0][i].quiz_name,
                                obj.startDate = this.searchRes[0][i].start_date,
                                obj.endDate = this.searchRes[0][i].end_date,
                                obj.status = "未發布"
                                this.list.push(obj);
                                break;
                            //未開始
                            case start > now && published == true:
                                obj.num = this.searchRes[0][i].quiz_id,
                                obj.title = this.searchRes[0][i].quiz_name,
                                obj.startDate = this.searchRes[0][i].start_date,
                                obj.endDate = this.searchRes[0][i].end_date,
                                obj.status = "未開始"
                                this.list.push(obj);
                                break;
                            //進行中
                            case end > now && published == true:
                                obj.num = this.searchRes[0][i].quiz_id,
                                obj.title = this.searchRes[0][i].quiz_name,
                                obj.startDate = this.searchRes[0][i].start_date,
                                obj.endDate = this.searchRes[0][i].end_date,
                                obj.status = "進行中"
                                this.list.push(obj);
                                break;
                            //已結束
                            case end < now && published == true:
                                obj.num = this.searchRes[0][i].quiz_id,
                                obj.title = this.searchRes[0][i].quiz_name,
                                obj.startDate = this.searchRes[0][i].start_date,
                                obj.endDate = this.searchRes[0][i].end_date,
                                obj.status = "已結束"
                                this.list.push(obj);
                                break;
                        }
                    }
                }
                console.log(this.list);
            }
        )
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <Search @sendResult="showResult" />
    <div class="list">
        <div class="left">
            <br><br><br><br><br>
            <router-link class="link" to="/create">
                <i class="fa-solid fa-square-plus icon"></i>
            </router-link>
            <br><br><br><br><br><br><br>
            <i class="fa-solid fa-trash-can icon" @click="this.deleteQuiz"></i>
        </div>
        <div class="right" ref="list">
            <div class="ques" v-for="item in this.list">
                <input class="checkbox" type="checkbox" :value="item.num" v-model="this.delete">
                <p class="num text" v-text="`#${item.num}`" style=""></p>
                <h3 class="title text" v-text="item.title"></h3>
                <h1 class="status text" v-text="item.status"></h1>
                <p class="time text" v-text="`${item.startDate}~${item.endDate}`"></p>
                <router-link class="router" to="/createCheck"  @click="this.sendQuizId(item.num)">
                    <div class="enter text btn">進入</div>
                </router-link>
                <router-link class="router" to="/adminResult" v-if="item.status != '未開始'"  @click="this.sendQuizId(item.num)">
                    <div class="result text btn">結果</div>
                </router-link>
            </div>
        </div>
    </div>
    <div class="scrollBar">
        <i class="fa-solid fa-backward-fast bar" @click="this.scrollLeft()"></i>
        <i class="fa-solid fa-forward-fast bar" @click="scrollRight()"></i>
    </div>
</template>

<style lang="scss" scoped>
.list {
    animation: showList 1s 0.5s ease-out forwards;
    opacity: 0;

    @keyframes showList {
        0% {
            width: 1%;
            opacity: 1;
        }

        100% {
            width: 97%;
            opacity: 1;
        }
    }

    // border: 1px solid black;
    border-radius: 10px 0px 0px 10px;
    width: 97%;
    height: 63dvh;
    background-color: #ceede5;

    position: fixed;
    right: 0%;
    bottom: 11%;
    padding: 1.5%;
    display: flex;

    .left {
        opacity: 0;
        animation: showIcon 0.8s 1.15s forwards;

        @keyframes showIcon {
            100% {
                opacity: 1;
            }
        }

        // border: 1px solid black;
        width: 4%;
        height: 100%;
        background-color: transparent;

        .link {
            text-orientation: none;
            background-color: transparent;
        }

        .icon {
            background-color: transparent;
            font-size: 250%;
            color: #135d66;
            cursor: pointer;

            &:active {
                color: #ceede5;
                background-color: transparent;
            }

        }
    }

    .right {
        // border: 1px solid black;
        width: 95%;
        height: 100%;
        background-color: transparent;

        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 22%;
        scrollbar-width: none;
        overflow-x: auto;
        margin-top: .7%;
        padding-left: 1%;

        .ques {
            opacity: 0;
            animation: showQues 0.8s 1.15s forwards;

            @keyframes showQues {
                100% {
                    opacity: 1;
                }
            }

            // border: 1px solid black;
            border-radius: 7px;
            width: 280px;
            height: 370px;
            margin-right: 1.5%;
            background-color: #abd8cc;
            box-shadow: 0px 4px 4px 3px rgb(19, 93, 102, 0.3);

            .checkbox {
                margin-top: 5%;
                margin-left: 5%;
            }

            .text {
                // border: 1px solid black;
                background-color: transparent;
                text-align: center;
                color: #135d66;
            }

            .num {
                margin-top: 4%;
                font-size: larger;
                font-weight: 700;
            }

            .title {
                margin-bottom: 10%;
                font-size: x-large;
            }

            .status {
                font-size: 400%;
            }

            .time {
                margin-bottom: 10%;
                font-size: large;
                font-weight: 550;
            }

            .router {
                text-decoration: none;
            }

            .btn {
                width: 40%;
                height: 10%;
                padding-top: 2%;
                font-size: large;
                font-weight: 600;
                margin-left: 30%;
                border-radius: 30px;
                background-color: #135d66;
                color: #ceede5;

                &:active {
                    background-color: #ceede5;
                    color: #135d66;
                }
            }

            .enter {
                margin-bottom: 7%;
            }

        }
    }
}

.scrollBar {
    position: fixed;
    left: 40%;
    bottom: 4%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: xx-large;
    color: #135d66;

    opacity: 0;
    animation: showBar 0.8s 1.15s forwards;

    @keyframes showBar {
        100% {
            opacity: 1;
        }
    }

    .bar {
        cursor: pointer;
        margin: 0 5dvw;

        &:active {
            color: #ceede5;
        }
    }
}
</style>