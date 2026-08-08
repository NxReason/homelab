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
  <a href="/design/palletes/{pallete.id}">
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

  <button onclick={() => onDelete(pallete.id!)}>Del</button>
</li>

<style>
  .pallete-item {
    height: 64px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: 200px 1fr 48px;
  }
  .pallete-colors {
    list-style: none;
    margin-left: 16px;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }
  .pallete-color {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
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
