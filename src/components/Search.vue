<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            word: "",
            from: "",
            to: "",
            backEnd: false,
            searchRes: {}
        }
    },
    methods: {
        reqestSearch() {
            if (this.$route.path.startsWith('/adminHome')) {
                this.backEnd = !this.backEnd;
            }
            let searchReq = {
                quizName: this.word,
                startDate: this.from,
                endDate: this.to,
                backend: this.backEnd
            }
            console.log(searchReq);
            fetch("http://localhost:8080/quiz/search", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(searchReq)
            })
                .then(res => res.json())
                .then((data) => {
                    this.searchRes = data;
                    console.log(this.searchRes);
                    this.$emit('sendResult', this.searchRes);
                }
                )
        }
    },
}
</script>

<template>
    <div class="search">
        <div class="keyword inner">
            <label class="text" for="">問卷名稱</label>
            <input class="text keywordText" type="text" v-model="this.word">
        </div>
        <div class="time inner">
            <label class="text" for="">日　　期</label>
            <input class="text  timeText" type="date" v-model="this.from">
            <label class="text" for="">到</label>
            <input class="text  timeText" type="date" v-model="this.to">
        </div>
        <button type="button" @click="this.reqestSearch()">搜尋</button>
    </div>
</template>

<style lang="scss" scoped>
.search {
    // border: 1px solid black;
    border-radius: 0px 100px 100px 0px;
    width: 0;
    height: 20dvh;
    background-color: #ceede5;
    margin-top: 1%;
    padding-top: 0.3%;
    position: relative;

    animation: showSearch 0.8s 0.5s forwards;
    overflow: hidden;

    @keyframes showSearch {
        0% {
            width: 0;
        }

        100% {
            width: 70%;
        }
    }

    .text {
        color: #135d66;
        font-weight: 1000;
        font-size: x-large;
        margin-right: 2%;
    }

    label {
        background-color: transparent;
    }

    input {
        background-color: #edfffa;
        border-radius: 10px;
        border: none;
    }

    .inner {
        // border: 1px solid black;
        margin: 0.8% 5%;
        background-color: transparent;
    }

    .keyword {
        width: 85%;
        height: 40%;
        padding: 1% 1%;

        opacity: 0;
        animation: showContent 0.8s 1.2s forwards;

        @keyframes showContent {
            100% {
                opacity: 1;
            }
        }

        .keywordText {
            width: 87%;
            margin-right: 0;
            padding: .2% 1%;
        }
    }

    .time {
        width: 73%;
        height: 40%;
        padding: 1% 1%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        opacity: 0;
        animation: showContent 0.8s 1.2s forwards;

        @keyframes showContent {
            100% {
                opacity: 1;
            }
        }

        .timeText {
            width: 37.5%;
            height: 100%;
            padding: 0.1% 1%;
            text-align: center;
        }
    }

    button {
        width: 10%;
        height: 28%;
        position: absolute;
        bottom: 13%;
        right: 10%;
        border-radius: 10px;
        border-color: #135d66;
        background-color: #135d66;
        color: #ceede5;
        font-weight: 1000;
        font-size: x-large;
        margin-right: 2%;

        opacity: 0;
        animation: showContent 0.8s 1.2s forwards;

        @keyframes showContent {
            100% {
                opacity: 1;
            }
        }

        border: none;

        &:active {
            background-color: #edfffa;
            color: #135d66;
        }
    }

}
</style>