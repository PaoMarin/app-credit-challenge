<template>
  <v-app>
    <div class="blue--text mb-2">
      Welcome to Credit Challenge!
    </div>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    Check the amount to pay for a microloan.
    Fill out the following form:
    <v-container>
      <v-row class="justify-center">
        <v-col
          cols="10"
          md="4"
        >
          <v-text-field
            v-model="client.name"
            :rules="client.nameRules"
            label="Full name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col
          cols="10"
          md="4"
        >
          <v-text-field
            v-model="client.email"
            :rules="client.emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row  class="justify-center">
        <v-col
          cols="10"
          md="4"
        >
          <v-text-field
            v-model="client.totalIngress"
            type="number"
            prefix="$"
            :rules="client.totalIngressRules"
            label="Total ingress per month"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row  class="justify-center">
        <v-col
          cols="10"
          md="4"
        >
          <v-select
            v-model="client.sector"
            :items="sector"
            :menu-props="{ top: true, offsetY: true }"
            label="Sector for which you work"
            :rules="[(v) => !!v || 'Sector is required']"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row  class="justify-center">
        <v-col
          cols="10"
          md="4"
        >
          <v-text-field
            v-model="client.workYears"
            type="number"
            :rules="client.workYearsRules"
            label="Years of Work"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row  class="justify-center">
        <v-col
          cols="10"
          md="4"
        >
          <v-text-field
            v-model="client.amount"
            type="number"
            prefix="$"
            :rules="client.amountRules"
            label="Amount you want to request"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      Payment Frecuency
      <v-row class="justify-center">
        <v-radio-group v-model="client.frecuency">
          <v-radio
            label="Monthly"
            value="1"
          ></v-radio>
          <v-radio
            label="Biweekly"
            value="2"
          ></v-radio>
        </v-radio-group>
      </v-row>
      <v-row class="justify-center">
        <v-col
          cols="10"
          md="4"
        >
          <v-select
            v-model="client.paytime"
            :items="paytime"
            label="Paytime (months)"
            return-object
          ></v-select>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          :disabled="!valid"
          @click="saveClient"
          class="mr-4"
          type="submit"
        >
          Submit
        </v-btn>
      </template>
        <v-card>
          <v-card-title>
            <span class="headline">Results</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <div v-if="dataID">
                    <ul>
                      <li v-for="(item, index) in dataID.data" :key="`item-${index}`">
                        {{ item.amount}}
                        {{ item.calculation}}
                      </li>
                    </ul>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-form>
  </v-app>
</template>
<script>
import axios from 'axios'

export default {
  name: 'NewClient',
  data: function () {
    return {
      dataID: null,
      valid: true,
      sector: ['Public', 'Private'],
      paytime: ['3', '6', '12', '18', '24', '36'],
      dialog: false,
      client: {
        name: '',
        nameRules: [
          v => !!v || 'Name is required'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        totalIngress: '',
        totalIngressRules: [
          v => !!v || 'Total Ingress is required'
        ],
        workYears: '',
        workYearsRules: [
          v => !!v || 'Years of Work is required'
        ],
        amount: '',
        amountRules: [
          v => !!v || 'Amount is required',
          v => (v && v >= 100) || 'Amount should be above $100',
          v => (v && v <= 2000) || 'Max should not be above $2000'
        ]
      }
    }
  },
  methods: {
    saveClient: function () {
      this.$refs.form.validate()
      var data = {
        name: this.client.name,
        email: this.client.email,
        totalIngress: this.client.totalIngress,
        sector: this.client.sector,
        workYears: this.client.workYears,
        amount: this.client.amount,
        frecuency: this.client.frecuency,
        paytime: this.client.paytime
      }
      axios.post('http://localhost:3000/clients', data) // eslint-disable-next-line
        .then(response => {
          this.dataID = response.data
          console.log(response.data)
          this.client = {}
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
