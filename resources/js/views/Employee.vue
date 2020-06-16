<template>
    <app-content>
        
        <app-row>
            <app-col :md="2"></app-col>
            <app-col :md="8">
                <app-row class="p-t-20 p-b-20">
                    <app-btn 
                        color="success" 
                        @click="onAddEmployee"
                    >
                        Добавить сотрудника
                    </app-btn>
                </app-row>
                <app-row>
                    <app-table 
                        :headers="headers"
                        :items="items"
                        :hoverable="true"
                        @row-click="onRowClick"
                    />
                </app-row>
            </app-col>
            <app-col :md="2"></app-col>
        </app-row>
    </app-content>
</template>

<script>
import AppTable from "../components/AppTable"

export default {
    inject: ['employeeRepository'],
    methods: {
        onAddEmployee() {
            this.$router.push({name: 'employee-form', params: {id: 'new'}})
        },
        onRowClick({id}) {
            this.$router.push({name: "employee-form", params: {id}})
        },
    },
    async created() {
        this.items = await this.employeeRepository.find()
    },
    data() {
        return {
            items: [],
            headers: [
                {
                    field: "id",
                    title: "#",
                    width: 50,
                    align: "center",
                },
                {
                    field: "name",
                    title: "ФИО",
                },
                {
                    field: "birthdate",
                    title: "Дата рождения",
                },
                {
                    field: "position",
                    title: "Должность",
                }
            ]
        }
    },
    components:{
        AppTable
    }
}
</script>

<style>

</style>