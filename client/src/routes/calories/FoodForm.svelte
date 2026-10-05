<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte';
  import NumericInput from '$lib/components/NumericInput.svelte';
  import type { IFood, IMicro } from './IFood';

  type Props = { food: IFood };

  let { food = $bindable<IFood>() }: Props = $props();

  type Mode = 'macro' | 'micro';
  let mode = $state<Mode>('micro');

  function addMicro() {
    food.micros.push({ name: '', amount: 0 });
  }
  function deleteMicro(micro: IMicro) {
    food.micros = food.micros.filter(m => m != micro);
  }
</script>

<form class="food-form">
  <TextInput bind:value={food.name} title="Name" />
  <NumericInput bind:value={food.calories} title="Calories / 100g" />
  <div class="separator">
    <p class="switch">
      <button
        class={{ active: mode === 'macro' }}
        onclick={() => (mode = 'macro')}>Macros</button
      >
      <i class={['icon', 'icon-switch', { reversed: mode === 'micro' }]}></i>
      <button
        class={{ active: mode === 'micro' }}
        onclick={() => (mode = 'micro')}>Micros</button
      >
    </p>
  </div>
  {#if mode === 'macro'}
    <NumericInput bind:value={food.protein} title="Protein / 100g" />
    <NumericInput bind:value={food.carbs} title="Carbs / 100g" />
    <NumericInput bind:value={food.fat} title="Fat / 100g" />
    <div class="separator">
      <p>Misc</p>
    </div>
    <NumericInput bind:value={food.saturatedFat} title="Saturated fat / 100g" />
    <NumericInput bind:value={food.fiber} title="Fiber / 100g" />
  {:else}
    <button class="btn btn-new-micro" onclick={addMicro}>New micro</button>

    {#each food.micros as micro}
      {@render microInput(micro)}
    {/each}
  {/if}
</form>

{#snippet microInput(micro: IMicro)}
  <div class="micro-input">
    <TextInput bind:value={micro.name} />
    <NumericInput bind:value={micro.amount} />
    <button
      class="btn-delete-micro"
      title="Delete micro"
      onclick={() => deleteMicro(micro)}
      ><i class="icon icon-delete"></i></button
    >
  </div>
{/snippet}

<style>
  .food-form {
    width: 400px;
  }
  .switch {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }
  .switch button {
    border-radius: 8px;
  }
  .switch .active {
    background-color: var(--primary);
  }
  .separator {
    place-items: center;
    margin: 20px 0;
    border-bottom: 2px solid var(--surface-variant);
    position: relative;
  }
  .separator p {
    position: absolute;
    padding: 0 16px;
    background-color: var(--surface);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .icon-switch {
    background-image: url('/icons/double_arrow.svg');
    width: 24px;
    height: 24px;
    margin-top: 4px;

    transition: transform 0.25s ease;
  }
  .icon-switch.reversed {
    transform: rotate(180deg);
  }

  .btn-new-micro {
    margin-bottom: 8px;
  }
  .micro-input {
    display: grid;
    grid-template-columns: 60% 1fr 1fr;
    gap: 2px;
  }
  .btn-delete-micro {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-variant);
    border-bottom: 2px solid var(--primary);
  }
</style>
