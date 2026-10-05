<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte';
  import Select from '$lib/components/Select.svelte';
  import NumericInput from '$lib/components/NumericInput.svelte';
  import FormSeparator from '$lib/components/FormSeparator.svelte';
  import type { IMeal, MealGrams } from './IMeal';
  import type { IFood } from './IFood';

  type Props = {
    meal: IMeal;
    foodList: IFood[];
  };
  let { meal = $bindable<IMeal>(), foodList }: Props = $props();
  let selectOptions = $derived(
    foodList.map(food => ({ value: food.id!, text: food.name })),
  );

  function addIngredient() {
    meal.ingredients.push({ foodId: foodList[0].id!, grams: 0 });
  }
  function deleteIngredient(ingredient: MealGrams) {
    meal.ingredients = meal.ingredients.filter(ing => ing !== ingredient);
  }
</script>

<form>
  <TextInput title="Meal name" bind:value={meal.name} />
  <FormSeparator title="Ingredients" />
  <button class="btn" onclick={addIngredient}>Add ingredient</button>
  <ul class="ingredient-list">
    {#each meal.ingredients as ingredient}
      <li class="ingredient">
        <Select options={selectOptions} bind:selected={ingredient.foodId} />
        <NumericInput title="grams" bind:value={ingredient.grams} />
        <button
          class="btn-delete-ing"
          title="Delete ingredient"
          onclick={() => deleteIngredient(ingredient)}
        >
          <i class="icon icon-delete"></i>
        </button>
      </li>
    {/each}
  </ul>
</form>

<style>
  form {
    display: grid;
    width: 400px;
  }
  .ingredient-list {
    margin-top: 8px;
  }
  .ingredient {
    display: grid;
    grid-template-columns: 60% 1fr 1fr;
    gap: 2px;
  }
  .btn-delete-ing {
    background-color: var(--surface-variant);
    border-bottom: 2px solid var(--primary);
  }
</style>
