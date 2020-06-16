<template>
    <form novalidate class="app-form" :value="value" @input="onInput">
        <slot></slot>
    </form>
</template>

<script>
import Vue from "vue"
const eventBus = { $eventBus: new Vue() }

export default {
    provide: eventBus,
    methods: {
        onInput() {
            this.$emit("input", this.isValid)
        },
        componentValidate(input) {
            this.isValid = input.$validate()
            this.$emit("input", this.isValid)
        },
        validateAllInput(children) {
            children.forEach((child) => {
                if (child.$options.name === "app-input") {
                    this.inputs.push(child)
                }
                if (child.$children && child.$children.length) {
                    this.validateAllInput(child.$children)
                }
            })

            return (this.isValid = false)
        },
        async validate() {
            this.isValid = true
            await this.inputs.forEach(async (input) => {
                const isValid = await input.$validate()
                if (!isValid) {
                    this.isValid = false
                }
            })
            this.$emit("input", this.isValid)
            return this.isValid
        }
    },
    beforeDestroy() {
        eventBus.$eventBus.$off("form:validate", this.componentValidate)
    },
    mounted() {
        eventBus.$eventBus.$on("form:validate", this.componentValidate)
        this.validateAllInput(this.$children)
    },
    data() {
        return {
            inputs: [],
            isValid: this.value
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>
