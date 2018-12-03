<template>
  <f7-page>
    <f7-navbar sliding title="Create new party"></f7-navbar>
    <f7-block inner>
      <f7-list form>
        <f7-list-item>
          <f7-label>Title</f7-label>
          <f7-input type="text" :value="title" @input="title = $event.target.value"
                    placeholder="Party Title"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Location</f7-label>
          <f7-input type="text" :value="location" @input="location = $event.target.value"
                    placeholder="Party Location"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Description</f7-label>
          <f7-input type="text" :value="description" @input="description = $event.target.value"
                    placeholder="Party Description"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Start Date</f7-label>
          <f7-input type="datetime-local" :value="date" @input="date = $event.target.value"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Duration (in hours)</f7-label>
          <f7-input type="number" :value="duration" @input="duration = $event.target.value"></f7-input>
        </f7-list-item>
      </f7-list>

      <f7-button fill round @click="addContact">Add Contact</f7-button>

      <f7-card v-for="contact in contacts"
               v-bind:key="contact.id">
        <f7-card-header>
          {{contact.name}}
        </f7-card-header>
        <f7-card-content>
          {{contact.mail}}
        </f7-card-content>
      </f7-card>

      <!--
      https://github.com/framework7io/framework7-vue/issues/383
      This git issue is the reason why the button was not disabled here with:
      :disabled="title.length === 0 || date.length === 0 || contacts.length === 0 || duration <= 0"
      -->
      <f7-button @click="createParty" fill round>
        Send Invitations
      </f7-button>

      <!-- Popup -->
      <!--<f7-popup id="popup">
        <f7-view>
          <f7-page>
            <f7-navbar title="Popup">
              <f7-nav-right>
                <f7-link popup-close>Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>
              <f7-list form>
                <f7-list-item>
                  <f7-label>Name</f7-label>
                  <f7-input type="text" :value="name" @input="name = $event.target.value"
                            placeholder="Contact Name"></f7-input>
                </f7-list-item>
                <f7-list-item>
                  <f7-label>E-Mail</f7-label>
                  <f7-input type="email" :value="mail" @input="mail = $event.target.value"
                            placeholder="Contact E-mail"></f7-input>
                </f7-list-item>
              </f7-list>

              <f7-button fill round popup-close @click="addContact" :disabled="name.length === 0 || mail.length === 0">
                Add Contact
              </f7-button>
            </f7-block>
          </f7-page>
        </f7-view>
      </f7-popup>-->
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
  import F7Popup from 'framework7-vue/src/components/popup';
  import F7View from 'framework7-vue/src/components/view';
  import F7NavRight from 'framework7-vue/src/components/nav-right';
  import F7Link from 'framework7-vue/src/components/link';

  export default {
    name: 'create-party',
    components: {
      F7Link,
      F7NavRight,
      F7View,
      F7Popup,
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
    data() {
      return {
        contacts: [],
        title: '',
        location: '',
        description: '',
        date: '',
        duration: 0
      };
    },
    methods: {
      addContact() {
        navigator.contacts.pickContact(contact => {
          if (contact.emails === null) {
            console.log('The following contact has been selected:' + JSON.stringify(contact));
            alert('This contact does not have a mail!');
          } else {
            console.log('email: ' + contact.emails[0].value);
            this.contacts.push({
              id: contact.id,
              name: contact.displayName,
              mail: contact.emails[0].value
            });
          }
        }, err => {
          console.log('Error: ' + err);
        });
      },
      createParty() {
        if (this.title.length === 0 || this.location.length === 0 || this.date.length === 0 || this.contacts.length === 0 || this.duration <= 0) {
          alert('Additional data is required, please recheck the input fields');
          cordova.plugins.email.open();
        } else {
          let party = {
            title: this.title,
            description: this.description,
            date: this.date,
            contacts: []
          };
          for (let contact of this.contacts) {
            party.contacts.push(contact);
          }

          let storage = localStorage.parties;
          if (storage === undefined) {
            localStorage.parties = JSON.stringify([party]);
          } else {
            let parties = JSON.parse(storage);
            parties.push(party);
            localStorage.parties = JSON.stringify(parties);
          }

          this.$f7router.navigate('/');
        }
      },
      sendMail() {
        let start = new Date(this.date);
        let end = new Date(start.getTime() + (this.duration * 60 * 60 * 1000));

        let mail = {
          to: this.getInvitationMails(),
          subject: 'Party invitation: ' + this.title,
          body: this.description + '<br><br>Location: ' + this.location + '<br>Time: ' + start + ' - ' + end,
          isHtml: true
        };

        navigator.email.open(mail);
      },
      getInvitationMails() {
        let mails = [];
        for (let contact of this.contacts) {
          mails.push(contact.mail);
        }
        return mails;
      }
    }
  };
</script>
