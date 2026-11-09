<script lang="ts">
  import type { IFood, IMicro } from './IFood';
  import type { IMeal, MealGrams } from './IMeal';
  import { NutrientValues } from './NutrientValues';

  type Props = {
    food: IFood[];
    meal: IMeal;
    handleUpdate: (meal: IMeal) => void;
    handleDelete: (id: number) => void;
  };

  const { meal, food, handleUpdate, handleDelete }: Props = $props();
  let ingredients = $derived(mapIngredients(meal.ingredients));
  let totalValue = $derived.by(() => {
    const total = new NutrientValues();
    ingredients.forEach(ing => {
      total.add(ing.values);
    });
    return total;
  });
  let isOpen = $state<Boolean>(true);

  function mapIngredients(ingredients: MealGrams[]) {
    return ingredients
      .map(({ grams, foodId }) => {
        const ingredient = food.find(f => f.id! === foodId);
        if (!ingredient) return null;

        const values = new NutrientValues();
        values.init(ingredient, grams);

        return { ...ingredient, grams, values };
      })
      .filter(ing => ing !== null);
  }
</script>

<li class="meal-item">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <h3 class="meal-name" onclick={() => (isOpen = !isOpen)}>{meal.name}</h3>

  <div class={['content', isOpen || 'hidden']}>
    <r4 class="content-header">Ingredients</r4>
    <ul class="ingredients">
      {#each ingredients as ingredient}
        <li class="ing">
          <span class="ing-name">{ingredient.name}</span>
          <span class="ing-grams">{ingredient.grams}</span>
        </li>
      {/each}
    </ul>

    <r4 class="content-header">Calcs</r4>
    <ul class="calcs">
      <li class="calc">
        <span class="calc-name">Calories</span>
        <span class="calc-value">{Math.round(totalValue.calories)}</span>
      </li>

      <span class="separator"></span>

      <li class="calc">
        <span class="calc-name">Protein</span>
        <span class="calc-value">{totalValue.protein.toFixed(2)}</span>
      </li>

      <li class="calc">
        <span class="calc-name">Carbs</span>
        <span class="calc-value">{totalValue.carbs.toFixed(2)}</span>
      </li>

      <li class="calc">
        <span class="calc-name">Fat</span>
        <span class="calc-value">{totalValue.fat.toFixed(2)}</span>
      </li>

      <span class="separator"></span>

      <li class="calc">
        <span class="calc-name">Saturated Fat</span>
        <span class="calc-value">{totalValue.saturatedFat.toFixed(2)}</span>
      </li>

      <li class="calc">
        <span class="calc-name">Fiber</span>
        <span class="calc-value">{totalValue.fiber.toFixed(2)}</span>
      </li>

      {#each totalValue.micros as micro}
        <li class="calc">
          <span class="calc-name">{micro.name}</span>
          <span class="calc-value">{micro.amount.toFixed(2)}</span>
        </li>
      {/each}
    </ul>
  </div>

  <div class="controls">
    <button aria-label="Edit food item" onclick={() => handleUpdate(meal)}>
      <i class="icon icon-edit"></i>
    </button>
    <button
      aria-label="Remove food item"
      onclick={() => handleDelete(meal.id!)}
    >
      <i class="icon icon-delete"></i>
    </button>
  </div>
</li>

<style>
  .meal-item {
    align-self: start;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 4px var(--primary);
  }
  .meal-name {
    background-color: var(--surface-variant);
    padding: 8px;
  }

  .content {
    padding: 8px;
    display: flex;
    flex-direction: column;
  }
  .content.hidden {
    display: none;
  }

  .content-header {
    align-self: start;
    padding: 4px;
    margin: 12px 0 4px;
    background-color: var(--primary);
    border-radius: 4px;
  }

  .ing,
  .calc {
    display: grid;
    grid-template-columns: 70% 1fr;
    padding: 8px 0;
    border-bottom: 1px solid var(--primary);
  }
  .ing-name,
  .calc-name {
    padding-right: 4px;
  }
  .ing-grams,
  .calc-value {
    padding-left: 4px;
    text-align: right;
  }
  .separator {
    display: block;
    justify-self: center;
    margin: 16px 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary);
  }
</style>
