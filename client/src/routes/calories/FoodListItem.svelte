<script lang="ts">
  import type { IFood } from './IFood';

  type Props = {
    food: IFood;
    onDelete: (food: IFood) => void;
    onUpdate: (food: IFood) => void;
  };
  const { food, onUpdate, onDelete }: Props = $props();

  let isOpen = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li class="food-item" onclick={() => (isOpen = !isOpen)} aria-label="button">
  <span class="food-item-name">{food.name}</span>
  <span class="food-item-calories">{food.calories}</span>

  <span>{food.protein}</span>
  <span>{food.carbs}</span>
  <span>{food.fat}</span>
  <span>{food.micros.length} micros</span>

  <div class="controls">
    <button aria-label="Edit food item" onclick={() => onUpdate(food)}>
      <i class="icon icon-edit"></i>
    </button>
    <button aria-label="Remove food item" onclick={() => onDelete(food)}>
      <i class="icon icon-delete"></i>
    </button>
  </div>

  {#if isOpen && food.micros.length > 0}
    <ul class="micros">
      {#each food.micros as micro}
        <li class="micro">
          {micro.name} - {micro.amount} mg
        </li>
      {/each}
    </ul>
  {/if}
</li>

<style>
  .food-item {
    display: grid;
    grid-template-columns: 200px repeat(5, 80px) 1fr;
    align-items: center;
    padding: 4px 12px;

    cursor: pointer;
  }
  .food-item:hover {
    border-left: 4px solid var(--primary);
    padding-left: 8px;
  }
  .food-item:nth-child(odd) {
    background-color: var(--surface-variant);
  }
  .controls {
    justify-self: end;
  }

  .micros {
    padding-bottom: 8px;
    padding-left: 16px;
    list-style: disc;
  }
  .micro {
    margin-top: 8px;
  }
</style>
