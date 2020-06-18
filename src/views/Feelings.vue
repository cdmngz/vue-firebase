<template>
<v-container>
  <v-data-table
    class="elevation-1 mt-12"
    :headers="headers"
    :items="arrayTable"
    :sortDesc="true"
    no-results-text="tomatelaa"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mx-2" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}<v-icon>mdi-menu-right</v-icon>{{editedItem.feel}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-btn class="ma-1" @click="editedItem.feel = n" fab dark small color="success" outlined active-class v-for="n in 10" :key="n">{{n}}</v-btn>
                  </v-col>
                  <v-col cols="12" sm="9">
                    <v-row>
                      <v-text-field v-model="editedItem.text" @keyup.enter="save" label="Descripción" autofocus></v-text-field>
                    </v-row>
                    <v-row>
                        <v-btn
                          class="mb-2 mr-2"
                          :color="item.color"
                          :key="index"
                          outlined
                          :value="item.name"
                          v-for="(item, index) in activities"
                          @click="editedItem.act = item.name"
                          >
                          <v-icon left>{{item.icon}}</v-icon>{{item.name}}
                        </v-btn>
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
      <div>Aún no hay datos...</div>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { auth, db } from '../main'
  
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
        { text: 'Act', value: 'act' },
        { text: 'Fecha', value: 'date' },
        { text: '', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        feel: 9,
        text: '',
        act: '',
        date: ''
      },
      defaultItem: {
        feel: 9,
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
        if(this.array.length > 0) {

          let temp = this.array.slice(0)
          temp.reverse()
        // temp.forEach((element, index) => {
          //   let mes = ('0'+(element.date.getMonth()+1)).slice(-2)
        //   let dia = ('0'+element.date.getDate()).slice(-2)
        //   let hora = ('0'+element.date.getHours()).slice(-2)
        //   let min = ('0'+element.date.getMinutes()).slice(-2)
        //   temp[index].date = `${hora}:${min} ${dia}/${mes}`
        // });
          return temp
        }
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
        this.editedIndex = this.array.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.array.indexOf(item)
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
          console.log('editar')
          this.array[this.editedIndex].feel = this.editedItem.feel
          this.array[this.editedIndex].text = this.editedItem.text
          this.array[this.editedIndex].act = this.editedItem.act
          this.editarDato(this.editedItem)
        } else {
          console.log('crear')
          this.crearDato()
        }
        this.close()
      },
    }
  }
</script>