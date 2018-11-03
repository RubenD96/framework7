<template>
  <f7-page>
    <f7-navbar sliding title="Create new party"></f7-navbar>
    <f7-block inner>
      <f7-list form>
        <f7-list-item>
          <f7-label>Title</f7-label>
          <f7-input type="text" placeholder="Party Title"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>{{test}}</f7-label>
          <f7-input type="text" placeholder="Party Description"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Date</f7-label>
          <f7-input type="date"></f7-input>
        </f7-list-item>
      </f7-list>

      <f7-button fill round popup-open="#popup">Add Contact</f7-button>

      <f7-card v-for="contact in contacts"
               v-bind:key="contact.id">
        <f7-card-header>
          {{contact.name}}
        </f7-card-header>
        <f7-card-content>
          {{contact.mail}}
        </f7-card-content>
      </f7-card>

      <f7-button href="/" fill round>Send Invitations</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
  import F7Navbar from 'framework7-vue/src/components/navbar';
  import F7Block from 'framework7-vue/src/components/block';
  import F7Page from 'framework7-vue/src/components/page';
  import F7ListItem from 'framework7-vue/src/components/list-item';
  import F7Label from 'framework7-vue/src/components/label';
  import F7Input from 'framework7-vue/src/components/input';
  import F7List from 'framework7-vue/src/components/list';
  import F7Button from 'framework7-vue/src/components/button';
  import F7Card from 'framework7-vue/src/components/card';
  import F7CardHeader from 'framework7-vue/src/components/card-header';
  import F7CardContent from 'framework7-vue/src/components/card-content';

  export default {
    name: 'create-party',
    components: {
      F7CardContent,
      F7CardHeader,
      F7Card,
      F7Button,
      F7List,
      F7Input,
      F7Label,
      F7ListItem,
      F7Page,
      F7Block,
      F7Navbar
    },
    props: ['test'],
    data() {
      return {
        contacts: [
          {
            id: 1,
            name: 'Ruben',
            mail: 'mail@mail.nl'
          }
        ]
      };
    },
    methods: {
      reverseMessage: function () {
        this.parties.push({
          id: this.parties.length + 1,
          title: 'party',
          date: 'idc'
        });
      },
      createParty: function () {
        this.$emit('create-party');
      }
    }
  };
</script>
