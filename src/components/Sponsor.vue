// Sponsor.vue
<template>
  <div class="container">

    <div class="spacer1">
    </div>

    <div class="logo">
      <img src="../assets/VOSlogo.png" width=100% height=100%>
    </div>

    <template v-if="presubmission">
      <div class="info">
        <h1>Thank you for your support!</h1>
        <p>Please enter the total amount you listed in the registration form in the space below:</p>
          <label for="amount">$</label>
          <input type="number" placeholder="Enter amount" v-model.number="sponsoramt" id="amount">
          <button @click="checkout">Sponsor Payment</button>
      </div>
    </template>

    <template v-if="showthankyou">
      <div class="info">
        <h1>Thank you!</h1>
        <p>You should expect an email receipt from us soon; if you do not receive anything in the next 24-48 hours,
          please email us at <a href="mailto:vetophthosurgerymeeting@gmail.com">vetophthosurgerymeeting@gmail.com</a>
        </p>
      </div>
    </template>

    <template v-if="showerror">
      <div class="info">
        <p>Whoops! Unfortunately there was an error processing your payment. Please email us at <a href="mailto:vetophthosurgerymeeting@gmail.com"
      vetophthosurgerymeeting@gmail.com></a>to let us know if the problem persists!</p>.
      </div>
    </template>

    <div class="spacer2">
    </div>

    <template v-if="!showthankyou">
      <div class="footer">
        <!-- Questions? Problems? Please contact us at <a href="mailto:vetophthosurgerymeeting@gmail.com">vetophthosurgerymeeting@gmail.com</a> -->
        Questions? Problems? Please contact us at <a href="mailto:exhibits.vosm@gmail.com">exhibits.vosm@gmail.com</a>
      </div>
    </template>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      sponsoramt: null,
      presubmission: true,
      showthankyou: false,
      showerror: false
    }
  },
  methods: {
    checkout () {
      // var spamount = this.sponsoramt
      this.$checkout.open({
        name: 'VOSM Sponsorship',
        currency: 'USD',
        amount: this.sponsoramt * 100,
        token: (token) => {
          console.log('token ->', token)
          console.log('this.sponsoramt ->', this.sponsoramt)
          axios.post(`https://tchen.webfactional.com/vosm_payment/charge`, {
            stripeToken: token.id,
            amount: this.sponsoramt * 100,
            email: token.email
          },
          {
            config: { headers: { 'Content-Type': 'application/json' } }
          })
            .then(response => {
              console.log('Response:')
              console.log(response)
              this.showthankyou = true
              this.presubmission = false
              // this.randomNumber = response.data.randomNumber
            })
            .catch(error => {
              console.log('Error:' + error)
              this.showerror = true
              console.log('Show error:' + this.showerror)
              this.presubmission = false
              console.log('Show presubmission:' + this.presubmission)
            })
        }
      })
    }
  }
}
</script>

<style>

.container {
  display: grid;
  min-height: 100%;
  /* grid-template-columns: 1f; */
  /* grid-template-rows: 1fr 1fr 1fr; */
  justify-items: center;
  align-items: center;
  grid-template-areas: "logo"
                        "info"
                        "footer";
}

.info {
  grid-area: info;
  text-align: center;
  padding: 2rem;
}

.logo {
  grid-area: logo;
}
.footer {
  padding: 2.5rem;
  grid-area: footer;
}

img {
  max-width: 70%;
  height: auto;
}

@media only screen and (min-width: 1100px) {
  .container {
    display: grid;
    min-height: 100%;
    grid-template-columns: 0.75fr 1fr 1fr 0.75fr;
    grid-template-rows: 1fr 100px;
    justify-items: center;
    align-items: center;
    grid-template-areas: "spacer1 logo info spacer2" "footer footer footer footer";
  }
  .info {
    grid-area: info;
    text-align: left;
    padding: 2rem;
  }
  .spacer1 {
    grid-area: spacer1;
  }
  .spacer2 {
    grid-area: spacer2;
  }
  img {
    max-width: 90%;
    height: auto;
  }

}

</style>
