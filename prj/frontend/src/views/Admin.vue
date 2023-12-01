<template>
  <v-container>
    <v-tabs
      v-model="tab"
      align-tabs="center"
    >
      <v-tab :value="0">{{ constants.Endpoint }}</v-tab>
      <v-tab :value="1">{{ constants.User }}</v-tab>
    </v-tabs>
    <Spinner v-if="(tab === 0 && endpoint.loading) || (tab === 1 && user.loading)"></Spinner>
    <v-window v-else v-model="tab">
      <v-window-item
        key="0"
        value="0"
      >
        <v-container fluid>
          <v-col>
            <Table
              :headers="endpoint.headers"
              :items="endpoint.items"
            ></Table>
          </v-col>
        </v-container>
      </v-window-item>
      <v-window-item
        key="1"
        value="1"
      >
        <v-container fluid>
          <v-col>
            <Table
              :headers="user.headers"
              :itens="user.items"
            ></Table>
          </v-col>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
  import constants from '@/constants'
  import Table from '@/components/Table.vue'
  import Spinner from '@/components/Spinner.vue'
  import axios from 'axios'

  export default {
    components: {
      Table,
      Spinner,
    },
    data: () => ({
      constants,
      tab: null,
      endpoint: {
        headers: [constants.Method, constants.Endpoint, constants.NumRequests],
        items: [],
        loading: true,
      },
      user: {
        headers: [constants.Email, constants.TotalNumRequests],
        items: [],
        loading: false,
      },
      methods: {
        async getEndpointData() {
          axios.get(`${API_URL}/stats`,
            { withCredentials: true }
          )
            .then(response => {
              const { stats } = response.data
              this.endpoint.items = stats
              this.endpoint.loading = false
            })
            .catch(error => {
              console.log(error)
            })
        },
        async getUserData() {
          axios.get(`${API_URL}/consumption`,
            { withCredentials: true }
          )
            .then(response => {
              const { consumption } = response.data
              this.user.items = consumption
              this.user.loading = false
            })
            .catch(error => {
              console.log(error)
            })
        },
      },
      mounted() {
        this.endpoint.loading = true
        this.user.loading = true
        this.getEndpointData()
        this.getUserData()
      }
    }),
  }
</script>