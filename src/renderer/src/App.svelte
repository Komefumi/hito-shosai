<script lang="ts">
  import Modal from './component-lib/modal/default.svelte';
  console.log('why');

  let isActive = false;

  function showModal() {
    isActive = true;
  }

  function confirm() {
    isActive = false;
  }
  function cancel() {
    isActive = false;
  }
</script>

<Modal {isActive} {confirm} close={cancel} />

<div class="columns is-mobile">
  <div class="column">One</div>
  <div class="column">Two</div>
  <div class="column">Three</div>
  <div class="column">
    <button on:click={showModal} class="button is-primary is-fullwidth">Click</button>
  </div>
</div>

<style lang="scss">
</style>
