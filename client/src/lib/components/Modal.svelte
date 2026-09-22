<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    title?: string;
    content: Snippet;
    controls?: Snippet;
    onSave?: () => void;
    onReset?: () => void;
    onClose: () => void;
  };
  let { title, content, controls, onSave, onReset, onClose }: Props = $props();
</script>

<div class="modal-bg">
  <div class="modal-container">
    {#if title}
      <h3 class="title">{title}</h3>
    {/if}

    <div class="content-wrapper">
      {@render content()}
    </div>

    {#if controls}
      <!-- Render custom controls if provided -->
      {@render controls()}
    {:else}
      <!-- Render default save/reset/close buttons if onSave/onReset provided -->
      <div class="controls">
        {#if onSave}
          <button class="btn" onclick={onSave}>Save</button>
        {/if}

        <button class="btn" onclick={onClose}>Close</button>

        {#if onReset}
          <button class="btn" onclick={onReset}>Reset</button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .modal-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    justify-items: center;
    padding-top: 160px;

    background-color: var(--background-transparent);
  }

  .modal-container {
    padding: 16px;
    align-self: start;

    border: 2px solid var(--primary);
    background-color: var(--surface);
  }

  .title {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 2px solid var(--primary);
  }
  .content-wrapper {
    margin-bottom: 24px;
  }
  .controls {
    display: grid;
    grid-template-columns: min-content min-content 1fr;
    gap: 8px;
    justify-items: end;
  }
</style>
