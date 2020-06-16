<template>
    <app-content>
        <app-row>
            <app-col :md="2"></app-col>
            <app-col :md="8">
                <app-page-title :title="pageTitle" />
                <app-spacer />
                <app-form ref="form" v-model="isValidForm">
                    <app-text-field
                        label="ФИО"
                        v-model="form.name"
                        :rules="[rules.required]"
                    />
                    <app-text-field
                        label="Дата рождения"
                        v-model="form.birthdate"
                        :rules="[
                            rules.required,  
                            rules.date
                        ]"
                    />
                    <app-text-field
                        label="Должность"
                        v-model="form.position"
                        :rules="[rules.required]"
                    />
                    <app-btn 
                        color="success" 
                        @click="onSave"
                    >
                        {{btnTitle}}
                    </app-btn>
                    <app-btn 
                        color="error" 
                        class="m-l-10"
                        @click="onDelete" 
                        v-if="!isNewEmployee"
                    >
                        Удалить
                    </app-btn>
                </app-form>
            </app-col>
            <app-col :md="2"></app-col>
        </app-row>
    </app-content>
</template>

<script>
export default {
    inject: ['employeeRepository'],
    methods: {
        async onDelete() {
            await this.employeeRepository.delete(this.form.id)
            this.$router.push({name: "employee"})
        },
        async onSave() {
            if (await this.$refs.form.validate() ) {
                this.isNewEmployee ? this.insertEmployee() : this.updateEmployee()
            }
        },
        async insertEmployee() {
            await this.employeeRepository.insert(this.form)
            this.$router.push({name: "employee"})
        },
        async updateEmployee() {
            await this.employeeRepository.update(this.form)
            this.$router.push({name: "employee"})
        },
    },
    computed: {
        pageTitle() {
            return this.isNewEmployee ? "Добавление сотрудника" : "Редактирование сотрудника"
        },
        btnTitle() {
            return this.isNewEmployee ? "Добавить" : "Обновить"
        },
        isNewEmployee() {
            return this.id === 'new'
        }
    },
    data() {
        return {
            isValidForm: false,
            id: null,
            form: this.employeeRepository.fields(),
            rules: {
                required: (val) => !!val || "Поле обязательно для заполнения",
                date:  (val) => /\d{4}\-\d{2}\-\d{2}/.test(val) || "Неверный формат даты (ГГГГ-ММ-ДД)"
                    
            }
        }
    },
    async mounted() {
        this.id = this.$route.params.id
        this.form = this.employeeRepository.fields()
        if ( !this.isNewEmployee ) {
            const res = await this.employeeRepository.findOne(this.id)
            if ( res ) {
                this.form = res
            }
        }
    },
}
</script>
