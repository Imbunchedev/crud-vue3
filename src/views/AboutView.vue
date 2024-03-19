<template>
  <Crud
    api="player"
    :fields="fields"
    u
    d
  />
</template>

<script>
export default {
  data(){
    return {
      // fields: [
      //   { text: "Jugador", name: "player", icon: ['fas','user'] },
      //   { text: "Equipo", name: "team", type: "select", icon: ['fas', 'shield'], options: {
      //             api: 'teams',
      //             attr: 'team',
      //             value: 'val',
      //           }, },
      //   { text: "Número", name: "number", type: "integer" },
      //   { text: "Altura", name: "indicator.height" },
      //   { text: "Peso", name: "indicator.weight", type: "integer" },
      //   { text: "Opciones", name: "operation", width: 90 }
      // ],
      fields: [
        { text: "Nombre", name: "name" },
        { text: "Apellido", name: "last_name" },
        { text: "Edad", name: "age", type: "integer" },
        { text: "Nacionalidad", name: "nationality" },
        { text: "Posición", name: "position" },
        { text: "Opciones", name: "operation", width: 90 }
      ]
    }
  }
}
// import type { Header, Item } from "vue3-easy-data-table";

// const headers: Header[] = [
//   { text: "PLAYER", value: "player" },
//   { text: "TEAM", value: "team"},
//   { text: "NUMBER", value: "number"},
//   { text: "POSITION", value: "position"},
//   { text: "HEIGHT", value: "indicator.height"},
//   { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true},
//   { text: "LAST ATTENDED", value: "lastAttended", width: 200},
//   { text: "COUNTRY", value: "country"},
// ];

// const items: Item[] = [
//   { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: {"height": '6-2', "weight": 185}, lastAttended: "Davidson", country: "USA"},
//   { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: {"height": '6-9', "weight": 250}, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA"},
//   { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: {"height": '6-10', "weight": 240}, lastAttended: "Texas-Austin", country: "USA"},
//   { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: {"height": '6-11', "weight": 242}, lastAttended: "Filathlitikos", country: "Greece"},
// ];
</script>
