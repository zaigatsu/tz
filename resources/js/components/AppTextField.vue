<template>
    <div
        class="app-text-field"
        :class="{ error: errorMsg.length, [size]: size }"
    >
        <div class="app-text-field__label">
            <label>{{ label }}</label>
        </div>
        <div class="app-text-field__input">
            <input
                :type="type"
                :value="value"
                :class="{ error: errorMsg.length }"
                @input="$onInput"
                @blur="$onBlur"
            />
        </div>
        <div class="app-text-field__error text-right">
            <span>{{ errorMsg }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "app-input",
    watch: {
        value: function(val, old) {
            if (val !== old) {
                this.content = val;
            }
        }
    },
    methods: {
        $onBlur(e) {
            this.errorMsg = "";
            this.$emit("blur", e.target.value);
        },
        $onInput(e) {
            this.hasError = false;
            this.content = e.target.value;
            this.$emit("input", this.content);
        },
        $validate() {
            this.errorMsg = "";
            this.hasError = false;
            this.rules.forEach(rule => {
                if (rule instanceof Function) {
                    const res = rule(this.content);
                    if (typeof res === "string") {
                        this.errorMsg = res;
                        this.hasError = true;
                    }
                }

                if (Array.isArray(rule)) {
                    const validateFn = rule[0];
                    const params = rule[1];
                    const res = validateFn(this.content, params);
                    if (typeof res === "string") {
                        this.errorMsg = res;
                        this.hasError = true;
                    }
                    if (res instanceof Promise) {
                        res.then(data => {
                            if (typeof data === "string") {
                                this.errorMsg = data;
                                this.hasError = true;
                            }
                        });
                    }
                }
            });
            return !this.hasError;
        }
    },
    data() {
        return {
            hasError: false,
            content: this.value,
            errorMsg: ""
        };
    },
    props: {
        min: {
            type: [Boolean, Number],
            default: false
        },
        max: {
            type: [Boolean, Number],
            default: false
        },
        size: {
            type: String,
            default: ""
        },
        rules: {
            type: Array,
            default: () => []
        },
        label: {
            type: String,
            default: ""
        },
        floatFixed: {
            type: Number,
            default: 0
        },
        value: {
            type: [String, Number],
            default: ""
        },
        type: {
            type: String,
            default: "text"
        }
    }
};
</script>
