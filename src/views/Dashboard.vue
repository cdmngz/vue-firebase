<template>
    <div class="mx-12 mt-7">
        <h1>Hola perro ya estas dentro -> Hola Mundo!!</h1>
        <Calendar/>
        <Chart/>
    </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import Chart from '@/components/Chart'

export default {
    name: 'Dashboard',
    components: {
        Calendar,
        Chart
    }
}
</script>