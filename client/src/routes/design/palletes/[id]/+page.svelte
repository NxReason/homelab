<script lang="ts">
  import type { PageProps } from './$types';
  import Return from '$lib/components/Return.svelte';
  import { deletePallete } from '../api';
  import { goto } from '$app/navigation';

  let { data }: PageProps = $props();
  let pallete = $derived(data.pallete);

  let css = $derived.by(() => {
    const vars = pallete.colors.reduce((acc, col) => {
      return acc + `  --${col.name.toLowerCase()}: #${col.hex};\n`;
    }, ':root {\n');

    return vars + '}\n';
  });

  async function handleDelete() {
    await deletePallete(pallete.id!);
    goto('/design/palletes');
  }

  let copied = $state(false);
  async function copyCss() {
    await navigator.clipboard.writeText(css);

    copied = false;

    requestAnimationFrame(() => {
      copied = true;
    });
  }
  function animationFinished() {
    copied = false;
  }
</script>

<Return path="/design/palletes" />

<h1 class="pallete-name">
  <span class="pallete-name-value">{pallete.name}</span>
  <a
    href="/design/palletes/{pallete.id}/edit"
    aria-label="Edit pallete"
    class="pallete-control"
  >
    <i class="icon icon-edit"></i>
  </a>
  <button
    aria-label="Delete pallete"
    class="pallete-control del-btn"
    onclick={handleDelete}
  >
    <i class="icon icon-delete"></i>
  </button>
</h1>

<ul class="colors-list">
  {#each pallete.colors as color}
    <li class="color">
      {#if color.name}
        <p class="color-name">{color.name}</p>
      {/if}
      <p class="color-display" style="background-color: #{color.hex}"></p>
    </li>
  {/each}
</ul>

<div class="css-clip">
  <pre><code>{css}</code></pre>

  <button
    onclick={copyCss}
    title="Copy css to clipboard"
    class="css-clip-btn icon"
  ></button>
  <span
    class={['clip-msg', copied && 'copied-anim']}
    onanimationend={animationFinished}>Copied!</span
  >
</div>

<style>
  .pallete-name {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0 24px;
  }
  .pallete-name-value {
    margin-top: -8px;
    margin-right: 8px;
  }
  .pallete-control {
    display: grid;
    place-items: center;
    padding: 0;
    width: 32px;
    height: 32px;
    transition: background-color 0.15s ease;
  }
  .pallete-control:hover {
    background-color: var(--primary);
  }
  .pallete-name .icon {
    width: 24px;
    height: 24px;
  }
  .del-btn {
    background: transparent;
  }

  .colors-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 100px;
  }
  .color {
    display: flex;
    position: relative;
  }
  .color-name {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 4px 8px;

    background-color: var(--surface-variant);
  }
  .color-display {
    width: 100%;
  }
  .css-clip {
    background-color: var(--background);
    padding: 16px;
    margin-top: 32px;

    position: relative;
  }
  .css-clip-btn {
    position: absolute;
    right: 8px;
    top: 8px;
    background-image: url('/icons/clipboard.svg');
    background-size: 24px 24px;
    background-position: center;
    background-color: var(--background);
    border: 2px solid var(--primary);
    border-radius: 4px;
    transition: background-color 0.15s ease;
    z-index: 100;
  }
  .css-clip:hover {
    background-color: var(--primary);
  }

  /* Popup "copied" animation */
  .clip-msg {
    position: absolute;
    top: 10px;
    right: 8px;
    padding: 4px 8px;
    width: 0;
    overflow: hidden;

    background-color: var(--primary);
    border-radius: 4px;

    z-index: 50;
  }

  .copied-anim {
    animation: growInOut 1.5s linear 0s;
  }
  @keyframes growInOut {
    from {
      width: 0px;
      right: 8px;
    }
    15% {
      width: 72px;
      right: 48px;
    }
    85% {
      width: 72px;
      right: 48px;
    }
    to {
      width: 0px;
      right: 8px;
    }
  }
</style>
