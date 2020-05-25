<template>
  <v-data-table
    class="elevation-1 mx-12 mt-7"
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
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.userid" label="Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" v-model="editedItem.feel" label="Feel"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.text" label="Descripción"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.date" label="Fecha"></v-text-field>
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
        text: 'Des'+Math.floor(Math.random() * 100),
        date: ''
      },
      defaultItem: {
        userid: '',
        feel: 9,
        text: 'Des'+Math.floor(Math.random() * 100),
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
    created () {
      this.obtenerDatos()
    },

    methods: {
      ...mapMutations(['obtenerDatos', 'crearDato', 'editarDato','eliminarDato','observador']),
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
          this.array.push({
            date: new Date(),
            feel: this.editedItem.feel,
            text: this.editedItem.text,
            userid: this.user,
          })
        }
        this.close()
      },
    },
  }
</script>