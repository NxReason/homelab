<script lang="ts">
  import type { IFood } from './IFood';
  import type { IMeal } from './IMeal';

  import { saveMeal, updateMeal, deleteMeal } from './apiMeal';

  import MealForm from './MealForm.svelte';
  import MealListItem from './MealListItem.svelte';
  import Modal from '$lib/components/Modal.svelte';

  type Props = {
    food: IFood[];
    meals: IMeal[];
  };

  const { meals, food }: Props = $props();
  // svelte-ignore state_referenced_locally
  let mealList = $state<IMeal[]>(meals);

  const mealDefaults: IMeal = { name: '', ingredients: [] };
  let formMeal = $state<IMeal>(mealDefaults);

  let isModalOpen = $state(false);
  let modalState: 'new' | 'edit' = $state('new');
  let modalData = $derived(
    modalState === 'new'
      ? {
          title: 'New meal',
          onSave: () => createMeal(formMeal),
        }
      : {
          title: formMeal?.name,
          onSave: () => confirmUpdate(formMeal),
        },
  );

  function openNewMealModal() {
    modalState = 'new';
    isModalOpen = true;
  }

  async function createMeal(meal: IMeal) {
    const res = await saveMeal(meal);
    mealList.push(res as IMeal);
    console.log(res);
  }

  async function confirmUpdate(meal: IMeal) {
    const res = (await updateMeal(meal)) as IMeal;
    formMeal = mealDefaults;
    let oldMeal = mealList.find(m => m.id === res.id);
    oldMeal = res;
    isModalOpen = false;
  }

  async function handleUpdate(meal: IMeal) {
    modalState = 'edit';
    formMeal = meal;
    isModalOpen = true;
  }

  async function handleDelete(id: number) {
    await deleteMeal(id);
    mealList = mealList.filter(meal => meal.id !== id);
  }
</script>

{#if isModalOpen}
  <Modal
    title={modalData.title}
    onSave={modalData.onSave}
    onClose={() => (isModalOpen = false)}
  >
    {#snippet content()}
      <MealForm bind:meal={formMeal} foodList={food} />
    {/snippet}
  </Modal>
{/if}

<button class="btn btn-new-meal" onclick={openNewMealModal}> New Meal </button>

<ul class="meal-list">
  {#each mealList as meal}
    <MealListItem {meal} {food} {handleUpdate} {handleDelete} />
  {/each}
</ul>

<style>
  .btn-new-meal {
    margin-bottom: 8px;
  }

  .meal-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 1200px) {
    .meal-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 800px) {
    .meal-list {
      grid-template-columns: 1fr;
    }
  }
</style>
