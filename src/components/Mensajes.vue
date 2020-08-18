<template>
  <div>
    <v-card>
      <v-card-text class="font-italic" v-html="mensaje"></v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Mensajes',
  data: () => ({
    mensajes: [
      `Más personas de las que <b>imaginas</b> esperan poder volver a darte un <b>abrazo</b>.`,
      `La gente te <b>quiere</b> y <b>valora</b> más de lo que imaginas.`,
      `Eres <b>único</b> y <b>puedes</b> cambiar el <b>mundo</b>.`,
      `<b>Todos</b> sabemos lo mucho que vales.`,
      `Muchos buscamos conocer personas como <b>tú</b>.`,
      `Tus historias <b>deben</b> que ser contadas.`
    ]
  }),
  computed: {
    mensaje() {
      return this.mensajes[Math.floor(Math.random() * 6)]
    }
  }
}
</script>