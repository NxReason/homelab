<script lang="ts">
  import type { Component } from 'svelte';
  import AppBar from './AppBar.svelte';
  import Button from './Button.svelte';
  import Checkbox from './Checkbox.svelte';
  import TextField from './TextField.svelte';
  import Radio from './Radio.svelte';

  let CurrentComponent: Component | null = $state(null);

  function showComponent(cmp: any) {
    CurrentComponent = cmp;
  }
</script>

<div class="container">
  <h1>Library</h1>
  <ul class="cmp-list">
    {@render option('App Bar', AppBar)}
    {@render option('Button', Button)}
    {@render option('Checkbox', Checkbox)}
    {@render option('Radio', Radio)}
    {@render option('Text Field', TextField)}
  </ul>

  <div class="display">
    {#if CurrentComponent}
      <CurrentComponent />
    {:else}
      Select component
    {/if}
  </div>
</div>

{#snippet option(title: string, cmp: any)}
  <li class={[ 'cmp-option', CurrentComponent === cmp && 'active' ]}>
    <button onclick={() => showComponent(cmp)}>{title}</button>
  </li>
{/snippet}

<style>
.container {
  display: grid;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 160px 1fr;
  grid-template-areas: 
    'title title'
    'sidebar display'
}
/* TITLE */
h1 {
  grid-area: title;
}

/* LIST */
.cmp-list {
  display: flex;
  flex-direction: column;

  border-right: 1px solid var(--outline);
}
.cmp-option button {
  display: block;
  width: 100%;
  padding: 8px 16px;

  text-align: left;

  background-color: transparent;
}
.cmp-option.active {
  background-color: var(--surface-variant)
}

/* DISPLAY */
.display {
  padding: 8px 16px;
}
</style>