<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn flat dense round icon="arrow_back" aria-label="Back" @click="goBack" />

        <q-toolbar-title @click="goHome" class="text-center">
          Movie
        </q-toolbar-title>

        <q-btn v-if="!isSearchPage" flat dense round icon="search" aria-label="Search" @click="goToSearch" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

defineOptions({
  name: 'MainLayout'
});

const router = useRouter();
const route = useRoute();

const isSearchPage = computed(() => route.name === 'SearchMovie');

function goHome() {
  router.push({ name: 'Home' });
}

function goToSearch() {
  router.push({ name: 'SearchMovie' });
}

function goBack() {
  router.back();
}
</script>
