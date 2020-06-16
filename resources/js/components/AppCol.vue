<template>
    <div
        :class="{
            [`col-xl-${this.xl}`]: this.xl,
            [`col-lg-${this.lg}`]: this.lg,
            [`col-md-${this.md}`]: this.md,
            [`col-sm-${this.sm}`]: this.sm
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        xl: {
            type: [Number, String],
            default: ""
        },
        lg: {
            type: [Number, String],
            default: ""
        },
        md: {
            type: [Number, String],
            default: 12
        },
        sm: {
            type: [Number, String],
            default: ""
        }
    }
}
</script>
