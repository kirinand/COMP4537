<template>
  <v-container>
    <v-tabs
      v-model="tab"
      align-tabs="center"
    >
      <v-tab :value="0">{{ constants.Endpoint }}</v-tab>
      <v-tab :value="1">{{ constants.User }}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
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

  export default {
    components: {
      Table
    },
    data: () => ({
      constants,
      tab: null,
      endpoint: {
        headers: ['Method', 'Endpoint', '# of Requests'],
        items: [],
      },
      user: {
        headers: ['Username', 'Email', 'Token', 'Total # Requests'],
        items: [],
      },
    }),
  }
</script>