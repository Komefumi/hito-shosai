<script lang="ts">
  import Modal from './component-lib/modal/default.svelte';

  let isActive = false;
  let databaseList = [];

  /*
  function showModal() {
    isActive = true;
  }
  */

  function confirm() {
    isActive = false;
  }
  function cancel() {
    isActive = false;
  }
</script>

<Modal {isActive} {confirm} close={cancel} />

<div class="py-4 px-6">
  <article class="panel is-primary">
    <div class="panel-heading is-flex is-align-items-center is-justify-content-center">
      <h2>Databases</h2>
      <button class="ml-auto button is-inverted is-primary is-outlined">Create Database</button>
    </div>

    {#if databaseList.length > 0}
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-primary" type="text" placeholder="Search" />
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      {#each databaseList as db (db.id)}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          {db.name}
        </a>
      {/each}
    {:else}
      <div class="panel-block p-6 is-flex is-align-items-center is-justify-content-center">
        No database? <button class="mx-2 button is-primary">Click here</button> to create one
      </div>
    {/if}
  </article>
  <!-- <div class="mt-2">
    <div class="columns is-mobile">
      <div class="column">One</div>
      <div class="column">Two</div>
      <div class="column">Three</div>
      <div class="column">
        <button on:click={showModal} class="button is-primary is-fullwidth">Click</button>
      </div>
    </div>
  </div> -->
</div>

<style lang="scss">
</style>
