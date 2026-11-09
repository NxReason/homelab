<script lang="ts">
  import type { IFood } from './IFood';
  import type { IMeal, MealGrams } from './IMeal';

  type Props = {
    food: IFood[];
    meal: IMeal;
    handleUpdate: (meal: IMeal) => void;
    handleDelete: (id: number) => void;
  };

  const { meal, food, handleUpdate, handleDelete }: Props = $props();
  let isOpen = $state<Boolean>(true);

  function mapIngredients(ingredients: MealGrams[]) {
    return ingredients
      .map(({ grams, foodId }) => {
        const name = food.find(f => f.id! === foodId)?.name;
        if (!name) return null;

        return { name, grams };
      })
      .filter(ing => ing !== null);
  }
</script>

<li class="meal-item">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <h3 class="meal-name" onclick={() => (isOpen = !isOpen)}>{meal.name}</h3>

  <div class={['content', isOpen || 'hidden']}>
    <ul class="ingredients">
      {#each mapIngredients(meal.ingredients) as ingredient}
        <li class="ing">
          <span class="ing-name">{ingredient.name}</span>
          <span class="ing-grams">{ingredient.grams}</span>
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
  }
  .content.hidden {
    display: none;
  }
  .ing {
    display: grid;
    grid-template-columns: 70% 1fr;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--primary);
  }
  .ing-name {
    padding-right: 4px;
    border-right: 1px solid var(--primary);
  }
  .ing-grams {
    padding-left: 4px;
    text-align: right;
  }
</style>
