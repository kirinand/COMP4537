<template>
  <v-container>
    <v-tabs
      v-model="tab"
      align-tabs="center"
    >
      <v-tab :value="0">{{ constants.Endpoint }}</v-tab>
      <v-tab :value="1">{{ constants.User }}</v-tab>
    </v-tabs>
    <Spinner v-if="(tab === '0' && endpoint.loading) || (tab === '1' && user.loading)"></Spinner>
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
              :items="user.items"
            ></Table>
          </v-col>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import constants from '@/constants'
  import Table from '@/components/Table.vue'
  import Spinner from '@/components/Spinner.vue'
  import { API_URL } from '@/config'

  const endpointHeaders = [
    {
      key: 'Method',
      title: constants.Method,
    },
    {
      key: 'Endpoint',
      title: constants.Endpoint,
    },
    {
      key: 'Requests',
      title: constants.NumRequests,
    },
  ]

  const userHeaders = [
    {
      key: 'email',
      title: constants.Email,
    },
    {
      key: 'calls_made',
      title: constants.TotalNumRequests,
    },
  ]

  export default {
    components: {
      Table,
      Spinner,
    },
    data: () => ({
      constants,
      tab: "0",
      endpoint: {
        headers: endpointHeaders,
        items: [],
        loading: false,
      },
      user: {
        headers: userHeaders,
        items: [],
        loading: false,
      },
    }),

    methods: {
      async getEndpointData() {
        this.endpoint.loading = true
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
        this.user.loading = true
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
      this.getEndpointData()
      this.getUserData()
    }
  }
</script>