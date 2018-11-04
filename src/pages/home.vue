<template>
  <f7-page>
    <f7-navbar sliding title="Parties"></f7-navbar>
    <f7-block inner>

      <f7-card v-for="party in parties"
               v-bind:key="party.id">
        <f7-card-header>
          {{party.title}}
          <i @click="removeParty(party.id)" class="link f7-icons">trash</i>
        </f7-card-header>
        <f7-card-content>
          {{party.date}}
        </f7-card-content>
        <f7-card-footer v-if="party.description">
          {{party.description}}
        </f7-card-footer>
      </f7-card>

      <f7-button @click="route" fill round>Add Party</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  import F7Navbar from 'framework7-vue/src/components/navbar';
  import F7Block from 'framework7-vue/src/components/block';
  import F7Page from 'framework7-vue/src/components/page';
  import F7Card from 'framework7-vue/src/components/card';
  import F7CardHeader from 'framework7-vue/src/components/card-header';
  import F7CardContent from 'framework7-vue/src/components/card-content';
  import F7Button from 'framework7-vue/src/components/button';
  import F7CardFooter from 'framework7-vue/src/components/card-footer';

  export default {
    name: 'Home',
    components: {F7CardFooter, F7Page, F7Block, F7Navbar, F7Button, F7CardContent, F7CardHeader, F7Card},
    data() {
      return {
        parties: []
      };
    },
    mounted() {
      let storage = localStorage.parties;

      if (storage !== undefined) {
        for (let party of JSON.parse(storage)) {
          this.addParty(party.title, party.description, party.date);
        }
      }
    },
    methods: {
      addParty(title, description, date) {
        this.parties.push({
          id: this.parties.length + 1,
          title: title,
          description: description,
          date: date
        });
      },
      route() {
        this.$f7router.navigate('/create-party/');
      },
      removeParty(id) {
        this.parties.splice(id - 1, 1);
        localStorage.parties = JSON.stringify(this.parties);
      }
    }
  };
</script>
