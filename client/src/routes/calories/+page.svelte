<script lang="ts">
  import type { PageProps } from './$types';
  import FoodList from './FoodList.svelte';
  import CalorieCalc from './CalorieCalc.svelte';

  const { data }: PageProps = $props();
  let tabSelected = $state<'food' | 'calc'>('calc');
</script>

<h1>Calorie calculator</h1>

<section class="tabs">
  <button
    class:active={tabSelected === 'calc'}
    class="tab"
    onclick={() => (tabSelected = 'calc')}>Calc</button
  >
  <button
    class:active={tabSelected === 'food'}
    class="tab"
    onclick={() => (tabSelected = 'food')}>Food</button
  >
</section>

<!-- TODO:
create meal
create day / week / month -->

{#if tabSelected === 'calc'}
  <CalorieCalc meals={data.meals} food={data.food} />
{:else if tabSelected === 'food'}
  <FoodList food={data.food} />
{/if}

<style>
  .tabs {
    border-bottom: 2px solid var(--primary);
    margin-bottom: 8px;
  }
  .active {
    background-color: var(--primary);
  }
</style>
