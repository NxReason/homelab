<script lang="ts">
  import type { IFood } from './IFood';
  import Modal from '$lib/components/Modal.svelte';
  import FoodForm from './FoodForm.svelte';
  import { saveFood, updateFood, deleteFood } from './api';

  type Props = {
    food: IFood[];
  };
  const { food }: Props = $props();
  // svelte-ignore state_referenced_locally
  let foodList = $state(food);

  // creating new food item data / handlers
  const foodItemDefaults: IFood = {
    name: '',
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    saturatedFat: 0,
    fiber: 0,
  };
  let newFoodItem = $state<IFood>(foodItemDefaults);
  async function createNewFood() {
    const res = await saveFood(editedFood);
    foodList.push({ ...(res as IFood) });
    resetFood();
  }
  function resetNewFood() {
    editedFood = foodItemDefaults;
  }

  // updating food handlers
  async function updateFoodItem(id: number, newData: IFood) {
    await updateFood(editedFood);
    foodList = foodList.map(fi => {
      if (fi.id !== id) return fi;

      return newData;
    });
  }

  function resetUpdatedFood(preUpdateCopy: IFood) {
    editedFood.name = preUpdateCopy.name;
    editedFood.calories = preUpdateCopy.calories;
  }

  // delete food
  async function deleteFoodItem(id: number) {
    await deleteFood(id);
    foodList = foodList.filter(fi => fi.id !== id);
  }

  // modal data
  let editedFood = $state<IFood>(newFoodItem);
  let saveFoodItem = $state<() => void>(createNewFood);
  let resetFood = $state<() => void>(resetNewFood);
  let isModalOpen = $state<boolean>(false);

  function openModal(foodItem: IFood | null = null) {
    editedFood = foodItem ?? newFoodItem;
    saveFoodItem = foodItem
      ? () => updateFoodItem(foodItem.id!, editedFood)
      : createNewFood;
    const preUpdateCopy = foodItem ? { ...foodItem } : foodItemDefaults;
    resetFood = foodItem ? () => resetUpdatedFood(preUpdateCopy) : resetNewFood;
    isModalOpen = true;
  }
</script>

<ul>
  {#each foodList as foodItem}
    <li class="food-item">
      <span class="food-item-name">{foodItem.name}</span>
      <span class="food-item-calories">{foodItem.calories}</span>

      <div class="controls">
        <button aria-label="Edit food item" onclick={() => openModal(foodItem)}>
          <i class="icon icon-edit"></i>
        </button>
        <button
          aria-label="Remove food item"
          onclick={() => deleteFoodItem(foodItem.id!)}
        >
          <i class="icon icon-delete"></i>
        </button>
      </div>
    </li>
  {/each}
</ul>

<button onclick={() => openModal()}>Create food</button>

{#if isModalOpen}
  <Modal
    title="New Food Item"
    onSave={saveFoodItem}
    onReset={resetFood}
    onClose={() => (isModalOpen = false)}
  >
    {#snippet content()}
      <FoodForm bind:food={editedFood} />
    {/snippet}
  </Modal>
{/if}

<style>
  .food-item {
    display: grid;
    grid-template-columns: 200px 48px 1fr;
    align-items: center;

    padding: 4px 12px;
  }
  .food-item:nth-child(odd) {
    background-color: var(--surface-variant);
  }
</style>
