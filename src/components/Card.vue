<script>
export default {
    
}
</script>

<template>
    <div>
        <div class="ques">
            <p class="num text">#1</p>
            <h3 class="title text">我是問卷名稱</h3>
            <h1 class="status text">我狀態</h1>
            <p class="time text">2024-01-01~2024-12-31</p>
            <router-link class="router" to="/answer">
                <div class="enter text btn">進入</div>
            </router-link>
            <router-link class="router" to="/userResult">
                <div class="result text btn">結果</div>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
</style>