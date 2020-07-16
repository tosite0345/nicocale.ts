<template>
  <div>
    <h1>Users API</h1>
    <div>
      <button @click="getUsers">get users</button>
    </div>

    <div>
      <input type="text" v-model="userId" />
      <button @click="getUser">get user</button>
    </div>

    <div>
      <input type="text" v-model="createparams.name" />
      <input type="number" v-model="createparams.point" />
      <button @click="createUser">create user</button>
    </div>

    <div>
      <input type="text" v-model="loginparams.username" />
      <input type="text" v-model="loginparams.password" />
      <button @click="login">login user</button>
    </div>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData() {
    return {
      result: [],
      userId: '8580d5ab-ec45-26dc-11f5-1ed3a4622282',
      createparams: {
        name: '',
        point: 0,
      },
      loginparams: {
        username: 'hoge',
        password: 'fuga',
      },
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
      axios.get(`/api/users/${this.userId}`).then((res) => {
        console.log(res.data)
        this.result = res.data
      })
    },
    createUser() {
      console.log(this.createparams)
      axios.post('/api/users', this.createparams).then((res) => {
        console.log(res.data)
        this.result = res.data
      })
    },
    login() {
      console.log(this.loginparams)
      axios
        .post('/api/login', this.loginparams)
        .then((res) => {
          console.log(res.data)
          this.result = res.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>
