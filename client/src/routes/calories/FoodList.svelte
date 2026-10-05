<script lang="ts">
  import type { IFood } from './IFood';
  import Modal from '$lib/components/Modal.svelte';
  import FoodForm from './FoodForm.svelte';
  import FoodListItem from './FoodListItem.svelte';
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
    micros: [],
  };
  let newFoodItem = $state<IFood>(foodItemDefaults);
  async function createNewFood() {
    try {
      const res = await saveFood(editedFood);
      foodList.push({ ...(res as IFood) });
    } catch (e) {
      console.error(e);
    } finally {
      resetFood();
    }
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
  async function deleteFoodItem(food: IFood) {
    await deleteFood(food.id!);
    foodList = foodList.filter(fi => fi.id !== food.id);
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
  <li class="food-list-header">
    <span class="empty"></span>
    <span class="calories">Calories</span>
    <span class="macro">Protein <i class="icon icon-protein"></i></span>
    <span class="macro">Carbs <i class="icon icon-carbs"></i></span>
    <span class="macro">Fats <i class="icon icon-fats"></i></span>
  </li>
  {#each foodList as food}
    <FoodListItem
      {food}
      onUpdate={f => openModal(f)}
      onDelete={f => deleteFoodItem(f)}
    />
  {/each}
</ul>

<button onclick={() => openModal()} class="btn btn-create-food"
  >Create food</button
>

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
  .food-list-header {
    display: grid;
    grid-template-columns: 200px repeat(4, 80px) 1fr;
    align-items: center;
    padding: 0 12px;
  }
  .calories {
    background-color: var(--surface-variant);
    padding: 4px;
  }
  .macro {
    display: flex;
    gap: 2px;
    background-color: var(--primary);
    padding: 4px;
    border-right: 2px solid var(--surface);
  }
  .macro .icon {
    width: 20px;
    height: 20px;
  }
  .icon-protein {
    background-image: url('/icons/egg.svg');
  }
  .icon-carbs {
    background-image: url('/icons/wheat.svg');
  }
  .icon-fats {
    background-image: url('/icons/pizza.svg');
  }

  .btn-create-food {
    padding: 8px;
    margin-top: 16px;
  }
</style>
