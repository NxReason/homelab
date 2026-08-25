<script lang="ts">
  import type { IPallete } from './IPallete';

  type Props = {
    pallete: IPallete;
    onDelete: (id: number) => void;
  };
  let { pallete, onDelete }: Props = $props();

  function isDarkBackground(hex: string) {
    const [r, g, b] = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(
      h => parseInt(h, 16),
    );
    return (r + g + b) / 3 < 180;
  }
</script>

<li class="pallete-item">
  <a href="/design/palletes/{pallete.id}" class="pallete-name">
    {pallete.name}
  </a>

  <ul class="pallete-colors">
    {#each pallete.colors as color}
      <li
        class={[
          'pallete-color',
          isDarkBackground(color.hex) ? 'on-dark' : 'on-light',
        ]}
        style="background-color: #{color.hex}"
      >
        <span>{color.hex}</span>
        <span>{color.name}</span>
      </li>
    {/each}
  </ul>

  <a
    href="/design/palletes/{pallete.id}/edit"
    aria-label="Edit pallete"
    class="pallete-control"
  >
    <i class="icon icon-edit"></i>
  </a>
  <button
    onclick={() => onDelete(pallete.id!)}
    aria-label="Remove pallete"
    class="pallete-control"
  >
    <i class="icon icon-delete"></i>
  </button>
</li>

<style>
  .pallete-item {
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: 200px 1fr 48px 48px;

    border-left: 2px solid var(--primary);

    transition: background-color 0.3s ease;
  }
  .pallete-item:nth-child(odd) {
    border-left-color: var(--secondary);
  }
  .pallete-item:has(.pallete-control:hover) {
    background-color: var(--surface-variant);
  }
  .pallete-name {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
  .pallete-name:hover {
    background-color: var(--surface-variant);
  }
  .pallete-colors {
    list-style: none;
    margin-left: 16px;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: 64px;
  }
  .pallete-color {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  .pallete-control {
    display: grid;
    place-items: center;

    background: transparent;
  }
  .pallete-control .icon {
    transition: transform 0.15s ease;
  }
  .pallete-control:hover .icon {
    transform: scale(1.3);
  }
  .on-dark {
    color: white;
    text-shadow: 1px 1px 3px var(--background);
  }
  .on-light {
    color: black;
    text-shadow: 1px 1px 3px var(--on-background);
  }
</style>
