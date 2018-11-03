<template>
  <f7-page>
    <f7-navbar sliding title="Parties"></f7-navbar>
    <f7-block inner>

      <f7-card v-for="party in parties"
               v-bind:key="party.id">
        <f7-card-header>
          {{party.title}}
        </f7-card-header>
        <f7-card-content>
          {{party.date}}
        </f7-card-content>
      </f7-card>

      <f7-button @click="emit" fill round>Add Party</f7-button>
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

  export default {
    name: 'Home',
    components: {F7Page, F7Block, F7Navbar, F7Button, F7CardContent, F7CardHeader, F7Card},
    data() {
      return {
        parties: [
          {
            id: 1,
            title: 'Party Example',
            date: 'Tuesday 30 October 2018 - 21:00'
          },
          {
            id: 2,
            title: 'Party Example 2',
            date: 'Thursday 25 October 2018 - 17:00'
          }
        ]
      };
    },
    methods: {
      test: function () {
        this.parties.push({
          id: this.parties.length + 1,
          title: 'party',
          date: 'idc'
        });
      },
      route() {
        this.$f7router.navigate('/create-party/', 'test');
      },
      emit() {
        console.log('emit');
        this.$emit('test');
      }
    }
  };
</script>
