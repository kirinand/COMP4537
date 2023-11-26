<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="header in headers" :key="header">
          {{ item[header] }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
    }
  }
</script>