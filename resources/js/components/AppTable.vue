<template>
    <div class="app-table-wrapper">
        <table
            class="app-table"
            :class="{
                hovered: hoverable,
                ellipsis: textOverflow
            }"
        >
            <thead class="app-table__header">
                <tr>
                    <th
                        v-for="({ title, width, align }, index) of headers"
                        :key="index"
                        :class="{
                            [`text-${align}`]: align
                        }"
                        :style="{
                            width: `${width}px`
                        }"
                        class="app-table__header__cell"
                    >
                        <div :style="{ width: `${width}px` }">
                            {{ title }}
                        </div>
                    </th>
                    <th class="app-table__header__cell"></th>
                </tr>
            </thead>
            <tbody class="app-table__body">
                <tr
                    v-for="(item, index) of items"
                    :key="index"
                    class="app-table__body__row"
                    @click="onRowClick(item)"
                >
                    <td
                        v-for="({ field, width, formatter, align },
                        headerIndex) of headers"
                        class="app-table__body__cell"
                        :class="{
                            [`text-${align}`]: align
                        }"
                        :key="headerIndex"
                    >
                        <div
                            v-if="formatter"
                            v-html="
                                formatter.callback(getFieldValue(item, field))
                            "
                        ></div>
                        <div v-else :style="{ width: `${width}px` }">
                            {{ getFieldValue(item, field) }}
                        </div>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    methods: {
        onRowClick(item) {
            this.$emit("row-click", item)
        },
        getFieldValue(item, field) {
            if (field.indexOf(".") > -1) {
                const splittedField = field.split(".")
                let value = item[splittedField[0]]
                if (value) {
                    for (let i = 1; i < splittedField.length; i++) {
                        try {
                            value = value[splittedField[i]]
                        } catch {
                            value = null
                        }
                    }
                }
                return value
            }
            return item[field]
        },
    },
    props: {
        textOverflow: {
            type: Boolean,
            default: false
        },
        hoverable: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: () => []
        },
        headers: {
            type: Array,
            default: () => []
        }
    },
}
</script>
