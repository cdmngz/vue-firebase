<template>
<v-container>
  <v-data-table
    class="elevation-1 mt-12"
    :headers="headers"
    :items="array"
    sort-by="date"
    :sort-desc="true"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{user}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mx-2" v-on="on">agregar feel</v-btn>
            <v-btn color="primary" dark class="mx-2" @click="obtenerDatos"></>Obtener</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}<v-icon>mdi-menu-right</v-icon>{{editedItem.feel}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-btn class="ma-1" @click="editedItem.feel = n" fab dark small color="success" v-for="n in 10" :key="n">{{n}}</v-btn>
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-row><v-text-field v-model="editedItem.text" @keyup.enter="save" label="Descripción" autofocus></v-text-field></v-row>
                    <v-row>
                      <v-btn class="mr-2 mb-2" outlined color="warning"><v-icon left>mdi-glass-mug-variant</v-icon>Cerveza</v-btn>
                      <v-btn class="mr-2 mb-2" outlined color="indigo"><v-icon left>mdi-account-cash</v-icon>Sueldo</v-btn>
                      <v-btn class="mr-2 mb-2" outlined color="grey"><v-icon left>mdi-devices</v-icon>Programar</v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="obtenerDatos">traer datos</v-btn>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'Feelings',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'DocId',
          align: 'start',
          sortable: false,
          value: 'docid',
        },
        {
          text: 'UserId',
          align: 'start',
          sortable: false,
          value: 'userid',
        },
        { text: 'Feel', value: 'feel' },
        { text: 'Descripción', value: 'text' },
        { text: 'Fecha', value: 'date' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        userid: '',
        feel: 9,
        text: '',
        date: ''
      },
      defaultItem: {
        userid: '',
        feel: 9,
        text: '',
        date: ''
      },
    }),
    computed: {
      ...mapState(['array', 'email', 'user']),
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar Feel' : 'Editar Feel'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      ...mapMutations(['obtenerDatos', 'crearDato', 'editarDato','eliminarDato']),
      editItem (item) {
        this.editedIndex = this.array.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.array.indexOf(item)
        this.eliminarDato(item)
        this.array.splice(index, 1)
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          console.log('editar')
          this.array[this.editedIndex].feel = this.editedItem.feel
          this.array[this.editedIndex].text = this.editedItem.text
          this.editarDato(this.editedItem)
        } else {
          console.log('crear')
          this.crearDato(this.editedItem)
          this.obtenerDatos()
        }
        this.close()
      },
    },
  }
</script>