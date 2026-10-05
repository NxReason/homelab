<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';
  import MealForm from './MealForm.svelte';
  import type { IFood } from './IFood';
  import type { IMeal, MealGrams } from './IMeal';
  import { saveMeal } from './apiMeal';

  type Props = {
    food: IFood[];
    meals: IMeal[];
  };
  const { meals, food }: Props = $props();

  let newMeal = $state<IMeal>({ name: '', ingredients: [] });

  let isModalOpen = $state(false);

  async function createMeal(meal: IMeal) {
    const res = await saveMeal(meal);
    console.log(res);
  }
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

<h2>Meals</h2>
<button class="btn" onclick={() => (isModalOpen = true)}>New meal</button>
<ul>
  {#each meals as meal}
    <li>
      {meal.name}
      {#each mapIngredients(meal.ingredients) as ingredient}
        <p>{ingredient.name} / {ingredient.grams}</p>
      {/each}
    </li>
  {/each}
</ul>

{#if isModalOpen}
  <Modal
    title="New meal"
    onSave={() => createMeal(newMeal)}
    onClose={() => (isModalOpen = false)}
  >
    {#snippet content()}
      <MealForm bind:meal={newMeal} foodList={food} />
    {/snippet}
  </Modal>
{/if}
