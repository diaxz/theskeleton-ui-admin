<template>
  <main-layout>
    <module-title slot="menu" :title="$t('admin.role.title')" :subtitle="addOrModifyLabel">
      <b-button :to="{ name: 'role-list' }">
        <i class="fa fa-list"></i> {{ $t('common.view', [$t('admin.role.label')]) }}
      </b-button>
    </module-title>
    <form slot="content" method="post" @submit.prevent @submit="save(role)">
      <div class="form-group">
        <label for="code" v-text="$t('admin.role.labelCode')"></label>
        <b-form-input id="code" name="code" v-model="role.code"></b-form-input>
      </div>
      <div class="form-group">
        <label for="description" v-text="$t('admin.role.labelDescription')"></label>
        <b-form-input id="description" name="description" textarea :rows="3" v-model="role.description"></b-form-input>
      </div>
      <div>
        <b-button variant="primary">
          <i class="fa fa-floppy-o"></i> {{ role.id ? $t('common.update', []) : $t('common.save') }}
        </b-button>
      </div>
    </form>
  </main-layout>
</template>

<script>
import MainLayout from 'components/MainLayout';
import ModuleTitle from 'components/ModuleTitle';

export default {
  components: {
    MainLayout,
    ModuleTitle
  },
  data() {
    return {
      originalRole: {}
    }
  },
  computed: {
    role() {
      return this.$store.state.role.role;
    },
    addOrModifyLabel() {
      const roleLabel = this.$t('admin.role.label');
      return this.role.id ? this.$t('common.modify', [roleLabel, this.originalRole.code]) : this.$t('common.addNew', [roleLabel]);
    }
  },
  methods: {
    save(role) {
      const router = this.$router;
      role.id = this.originalRole.code;
      this.$store.dispatch('saveRole', role).then(() => {
        this.$store.dispatch('findRoles', { q: role.code }).then(() => {
          router.push({ name: 'role-list' });
        });
      });
    }
  },
  mounted() {
    const self = this;
    if (this.$route.params.id === '+') {
      this.$store.commit('setRole', {});
    } else {
      this.$store.dispatch('findRoleByCode', this.$route.params.id).then(role => {
        this.originalRole = role;
      });
    }
  }
}
</script>
