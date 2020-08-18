<template>
  <v-container class="mt-12">
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="arrayTable"
    :sortDesc="true"
    no-results-text="tomatelaa"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="620px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mx-2" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
          </template>
          <v-card>
            <v-container>
              <v-card-title class="text--secondary">{{ formTitle }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-btn
                      class="ma-2"
                      :color="editedItem.feel > 6 ? 'success' : editedItem.feel > 2 ? 'warning' : 'error'"
                      @click="editedItem.feel = n"
                      dark
                      fab
                      :key="n"
                      :outlined="editedItem.feel===n ? false : true"
                      depressed
                      small
                      v-for="n in 10"
                      >
                      {{n}}
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="9">
                    <v-row>
                      <v-text-field
                        v-model="editedItem.text"
                        @keyup.enter="save"
                        label="Descripción"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-btn
                          class="mb-2 mr-2"
                          @click="editedItem.act = item.name"
                          :color="item.color"
                          dark
                          :key="index"
                          :outlined="editedItem.act===item.name ? false : true"
                          v-for="(item, index) in activities"
                          :value="item.name"
                          >
                          <v-icon left>{{item.icon}}</v-icon>{{item.name}}
                        </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="success" text @click="save">Enviar</v-btn>
              </v-card-actions>
            </v-container>
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
      <div>Aún no hay datos...</div>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { auth, db } from '../main'
  import { cloneDeep } from "lodash"
  
  export default {
    name: 'Feelings',
    data: () => ({
      dialog: false,
      headers: [
        // {
        //   text: 'UserId',
        //   align: 'start',
        //   sortable: false,
        //   value: 'userid',
        // },
        { text: 'Feel', value: 'feel', align: 'center'},
        { text: 'Descripción', value: 'text' },
        { text: 'Actividad', value: 'act' },
        { text: 'Fecha', value: 'date' },
        { text: '', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        feel: 8,
        text: '',
        act: '',
        date: ''
      },
      defaultItem: {
        feel: 8,
        text: '',
        act: '',
        date: ''
      },
    }),
    computed: {
      ...mapState(['array', 'activities']),
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar Feel' : 'Editar Feel'
      },
      arrayTable() {
        let temp = _.cloneDeep(this.array)
        temp.reverse()
        temp.forEach((element, index) => {
          temp[index].date = this.formatDate(element.date)
        });
          return temp
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      ...mapMutations(['obtenerDatos', 'editarDato','eliminarDato']),
      crearDato() {
        let objeto = Object.assign({}, this.editedItem)
        db.collection("eventos").add({
          date: new Date(),
          feel: objeto.feel,
          text: objeto.text,
          act: objeto.act,
          userid: auth.currentUser.uid
        })
          .then(res => this.array.push({
            docid: res.id,
            date: new Date(),
            feel: objeto.feel,
            text: objeto.text,
            act: objeto.act,
            userid: auth.currentUser.uid
          }))
          .catch(e => console.log("Error creando el feel: ", e.message))
      },
      editItem (item) {
        this.editedIndex = this.arrayTable.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.arrayTable.indexOf(item)
        this.eliminarDato(item)
        this.array.splice(index, 1)
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          this.arrayTable[this.editedIndex].feel = this.editedItem.feel
          this.arrayTable[this.editedIndex].text = this.editedItem.text
          this.arrayTable[this.editedIndex].act = this.editedItem.act
          this.editarDato(this.editedItem)
        } else {
          this.crearDato()
        }
        this.close()
      },
      formatDate(date) {
        const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString(undefined, options)
      }
    }
  }
</script>