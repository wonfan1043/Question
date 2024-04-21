<script>
import Search from '../components/Search.vue';
export default {
    data() {
        return {
            moveQues: true,
            moveBar: false,
            searchRes: [],
            list: [],
            showList: [],
            interval: '',
        }
    },
    components: {
        Search
    },
    methods: {
        showResult(result) {
            // console.log(result);
            this.moveBar = false;
            setTimeout(() => {
                this.list = [];
                this.showList = [];
            }, 50)
            setTimeout(() => {
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
                                break;
                                //未開始
                                case start > now && published == true:
                                    obj.num = result.quizList[i].quiz_id;
                                    obj.title = result.quizList[i].quiz_name;
                                    obj.startDate = result.quizList[i].start_date;
                                    obj.endDate = result.quizList[i].end_date;
                                obj.status = "未開始";
                                this.list.push(obj);
                                // this.showList.push(obj);
                                break;
                                //進行中
                                case end > now && published == true:
                                    obj.num = result.quizList[i].quiz_id;
                                    obj.title = result.quizList[i].quiz_name;
                                    obj.startDate = result.quizList[i].start_date;
                                    obj.endDate = result.quizList[i].end_date;
                                    obj.status = "進行中"
                                    this.list.push(obj);
                                    // this.showList.push(obj);
                                    break;
                                    //已結束
                                    case end < now && published == true:
                                        obj.num = result.quizList[i].quiz_id;
                                        obj.title = result.quizList[i].quiz_name;
                                        obj.startDate = result.quizList[i].start_date;
                                        obj.endDate = result.quizList[i].end_date;
                                        obj.status = "已結束"
                                        this.list.push(obj);
                                        // this.showList.push(obj);
                                        break;
                                    }
                                }
                            }
                console.log(this.list);
                for(let i = 0; i < 10; i++){
                    if(this.list[i] != undefined){
                        this.showList.push(this.list[i]);
                    }
                }
                this.moveBar = !this.moveBar;
                console.log(this.showList);
            }, 50)
            },
            showPage(index){
            // let test1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
            // let test2 = [];
            this.moveQues = false;
            this.showList = [];
            let start = (index - 1) * 10;
            setTimeout(()=>{
                for(let i = start; i < (start + 10); i++){
                    if(this.list[i] != undefined){
                        this.showList.push(this.list[i]);
                    }
                }
            }, 0.0001)
            this.moveQues = !this.moveQues;
            // console.log(test2);
        },
        scrollLeft() {
            // 向左滾動
            this.interval = setInterval(() => {
                this.$refs.list.scrollLeft -= 20; // 調整滾動距離
            }, 10);

            setTimeout(() => {
                this.stopScroll();
            }, 500);
        },
        scrollRight() {
            // 向右滾動
            this.interval = setInterval(() => {
                this.$refs.list.scrollLeft += 20; // 調整滾動距離
            }, 10);

            setTimeout(() => {
                this.stopScroll();
            }, 500);
        },
        stopScroll() {
            // 停止滾動
            clearInterval(this.interval); 
        },
        sendQuizId(num){
            localStorage.setItem("quizId", String(num))
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
                // console.log(this.searchRes);

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
                // console.log(this.list);
                for(let i = 0; i < 10; i++){
                    if(this.list[i] != undefined){
                        this.showList.push(this.list[i]);
                    }
                }
                console.log(this.showList);
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
    <div class="list" ref="list">
        <div class="ques" :class="{quesMove: this.moveQues}" v-for="item in this.showList">
            <p class="num text" v-text="`#${item.num}`"></p>
            <h3 class="title text" v-text="item.title"></h3>
            <h1 class="status text" v-text="item.status"></h1>
            <p class="time text" v-text="`${item.startDate}~${item.endDate}`"></p>
            <router-link class="router" to="/answer" v-if="item.status == '進行中'" @click="this.sendQuizId(item.num)">
                <div class="enter text btn">進入</div>
            </router-link>
            <router-link class="router" to="/userResult" v-if="item.status != '未開始'"  @click="this.sendQuizId(item.num)">
                <div class="result text btn">結果</div>
            </router-link>
        </div>
    </div>
    <div class="scrollBar">
        <i class="fa-solid fa-backward-fast bar" @click="this.scrollLeft()" :class="{barMove: this.moveBar}"></i>
        <button type="button" class="page" v-for="index in Math.ceil(this.list.length/10)" @click="this.showPage(index)" :class="{barMove: this.moveBar}">{{ index }}</button>
        <i class="fa-solid fa-forward-fast bar" @click="scrollRight()" :class="{barMove: this.moveBar}"></i>
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
    padding: 2%;

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 22%;
    scrollbar-width: none;
    overflow: auto;

    .quesMove{
        opacity: 0;
        animation: showQues 0.8s 0.75s forwards;
    
        @keyframes showQues {
            100% {
                opacity: 1;
            }
        }
    }

    .ques {
        // border: 1px solid black;
        border-radius: 7px;
        width: 280px;
        height: 370px;
        margin-right: 1.5%;
        background-color: #abd8cc;
        box-shadow: 0px 4px 4px 3px rgb(19, 93, 102, 0.3);

        .text {
            // border: 1px solid black;
            background-color: transparent;
            text-align: center;
            color: #135d66;
        }

        .num {
            margin-top: 10%;
            font-size: larger;
            font-weight: 700;
        }

        .title {
            margin-bottom: 5%;
            font-size: x-large;
            font-weight: 600;
        }
        
        .status {
            font-size: 400%;
            font-weight: 700;
        }
        
        .time {
            margin-bottom: 10%;
            font-size: large;
            font-weight: 600;
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

.scrollBar {
    width: 100%;
    position: fixed;
    // left: 35%;
    bottom: 4%;
    display: flex;
    justify-content: center;
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
        margin: 0 3dvw;

        &:active {
            color: #ceede5;
        }
    }

    .page{
        border: none;
        font-size: 80%;
        font-weight: 600;
        text-decoration: underline;
        color: #135d66;
        cursor: pointer;
        margin: 0% .5%;
    }
}

.barMove{
    opacity: 0;
    animation: showBar 0.8s 0.75s forwards;

    @keyframes showBar {
        100% {
            opacity: 1;
        }
    }
}
</style>