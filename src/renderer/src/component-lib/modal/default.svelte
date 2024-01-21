<script lang="ts">
  export let isActive: boolean;
  export let close: () => void;
  export let confirm: () => void;
  export let confirmText = 'Confirm';
  export let cancelOp: () => void | undefined = undefined;
  export let cancelText = 'Cancel';

  function cancel() {
    if (cancelOp) cancelOp();
    close();
  }
</script>

<div class="modal{isActive ? ' is-active' : ''}">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={cancel} class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button on:click={cancel} class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">Modal Card Body Content</section>
    <footer class="modal-card-foot">
      <button on:click={confirm} class="button is-success">{confirmText}</button>
      <button on:click={cancel} class="button">{cancelText}</button>
    </footer>
  </div>
</div>

<style>
  .modal-background {
    cursor: pointer;
  }
</style>
