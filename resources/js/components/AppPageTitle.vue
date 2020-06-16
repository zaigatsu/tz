<template>
    <div class="app-page-title">
        <h5>
            {{ title }}
        </h5>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    created() {
        document.title = `TZ: ${this.title}`
    }
}
</script>
