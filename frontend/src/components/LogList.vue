<template>
    <div>
        <h2>Recent Logs</h2>
        <ul>
            <li v-for="log in logs" :key="log._id">
                [{{ log.level }}] {{ log.service }}: {{ log.message }}
            </li>
        </ul>
    </div>
</template>

<script setup>
// 引入 Vue Composition API 中的 ref 和生命周期钩子 onMounted
import { ref, onMounted } from 'vue'

// 定义一个响应式变量 logs，用来保存从后端获取到的日志列表
const logs = ref([])

// onMounted 表示组件挂载完成后执行的逻辑
onMounted(async () => {
    const res = await fetch('/api/logs');
    logs.value = await res.json();
});
</script>

<style scoped>
h2 {
    margin-bottom: 0.5rem;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 0.25rem 0;
    border-bottom: 1px solid #eee;
}
</style>
