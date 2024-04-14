<script>
export default {

}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="list">
        <div class="left">
            <br><br><br><br><br>
            <router-link class="link" to="/create">
                <i class="fa-solid fa-square-plus icon"></i>
            </router-link>
            <br><br><br><br><br><br><br>
            <i class="fa-solid fa-trash-can icon"></i>
        </div>
        <div class="right">
            <div class="ques">
                <input class="checkbox" type="checkbox">
                <p class="num text">#1</p>
                <h3 class="title text">我是問卷名稱</h3>
                <h1 class="status text">我狀態</h1>
                <p class="time text">2024-01-01~2024-12-31</p>
                <router-link class="router" to="/createCheck">
                    <div class="enter text btn">進入</div>
                </router-link>
                <router-link class="router" to="/adminResult">
                    <div class="result text btn">結果</div>
                </router-link>
            </div>
            <div class="ques"></div>
        </div>
    </div>
    <div class="scrollBar">
        <i class="fa-solid fa-backward-fast bar"></i>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <i class="fa-solid fa-forward-fast bar"></i>
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
    overflow: hidden;
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

        .icon {
            background-color: transparent;
            font-size: 250%;
            color: #135d66;
            cursor: pointer;

            &:active {
                color: #ceede5;
            }

            .link {
                text-orientation: none;
                background-color: none;
            }
        }
    }

    .right {
        // border: 1px solid black;
        width: 95%;
        height: 100%;
        background-color: transparent;
        display: flex;

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
            width: 20%;
            height: 100%;
            margin-right: 1.5%;
            background-color: #abd8cc;

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
    right: 43%;
    bottom: 3%;

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

        &:active {
            color: #ceede5;
        }
    }
}
</style>