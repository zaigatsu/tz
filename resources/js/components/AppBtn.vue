<template>
    <button
        @click.prevent.stop="$emit('click')"
        class="app-btn"
        :class="{
            [color]: color,
            small: small,
            big: big,
            icon: icon
        }"
    >
        <span v-if="icon" class="icon" :class="icon"></span>
        <span class="text" v-if="!icon">
            <slot></slot>
        </span>
    </button>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ""
        },
        small: {
            type: Boolean,
            default: false
        },
        big: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: "default"
        }
    }
}
</script>
