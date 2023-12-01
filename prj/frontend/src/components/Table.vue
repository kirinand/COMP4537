<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="header in headers" :key="header.key">
          {{ item[header.key] }}
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