<template>
  <div>
    <h1>Hello world!</h1>
    <button @click="getUser">get user</button>
    <button @click="getUsers">get users</button>
    <button @click="createUser">create user</button>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData() {
    return {
      result: [],
    }
  },
  methods: {
    getUsers() {
      axios.get('/api/users').then((res) => {
        console.log(res.data)
        this.result = res.data
      })
    },
    getUser() {
      axios.get('/api/users/8580d5ab-ec45-26dc-11f5-1ed3a4622282').then((res) => {
        console.log(res.data)
        this.result = res.data
      })
    },
    createUser() {
      axios.post('/api/users', {}).then((res) => {
        console.log(res.data)
        this.result = res.data
      })
    },
  },
}
</script>
