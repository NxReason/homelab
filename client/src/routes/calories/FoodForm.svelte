<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte';
  import NumericInput from '$lib/components/NumericInput.svelte';
  import type { IFood } from './IFood';

  type Props = { food: IFood };

  let { food = $bindable<IFood>() }: Props = $props();
</script>

<form class="food-form">
  <TextInput bind:value={food.name} title="Name" />
  <NumericInput bind:value={food.calories} title="Calories / 100g" />
  <div class="separator">
    <span>Macros</span>
  </div>
  <NumericInput bind:value={food.protein} title="Protein / 100g" />
  <NumericInput bind:value={food.carbs} title="Carbs / 100g" />
  <NumericInput bind:value={food.fat} title="Fat / 100g" />
  <div class="separator">
    <span>Misc</span>
  </div>
  <NumericInput bind:value={food.saturatedFat} title="Saturated fat / 100g" />
  <NumericInput bind:value={food.fiber} title="Fiber / 100g" />
</form>

<style>
  .food-form {
    width: 400px;
  }
  .separator {
    margin: 16px 0;
    border-bottom: 2px solid var(--surface-variant);
    position: relative;
  }
  .separator span {
    position: absolute;
    padding: 0 16px;
    background-color: var(--surface);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
