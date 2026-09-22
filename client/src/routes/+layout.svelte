<script lang="ts">
  import '../styles.css';
  import favicon from '$lib/assets/favicon.svg';
  import type { MenuItem } from './MenuItem';

  let { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
  <nav>
    <ul class="main-menu">
      {#each data.pages as page}
        <li class={{ 'has-submenu': page.hasSubs() }}>
          <a
            href={page.path}
            class="main-link"
            class:active={page.isActive}
            title={page.name}
          >
            <i class={['icon', `icon-${page.getIconName()}`]}></i>
          </a>
          {@render submenu(page.subItems)}
        </li>
      {/each}
    </ul>
  </nav>

  <main class="page">
    {@render children()}
  </main>
</div>

{#snippet submenu(subpages: MenuItem[])}
  {#if subpages.length !== 0}
    <ul class="sub-menu">
      {#each subpages as sp}
        <li class="sub-item">
          <a href={sp.path} class="sub-link" class:active={sp.isActive}>
            <i class={['icon', `icon-${sp.getIconName()}`]}></i>
            {sp.name}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
{/snippet}

<style>
  .container {
    display: grid;
    grid-template-columns: 100px 1fr 100px;
    gap: 16px;

    min-height: 100dvh;
    padding: 32px;
  }
  nav {
    align-self: start;

    display: flex;
    justify-content: center;
  }
  .main-menu {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  .main-menu > li {
    width: 42px;
    height: 42px;
  }
  .main-link {
    display: grid;
    place-items: center;

    border: 1px solid var(--primary);
    border-bottom: none;

    width: 100%;
    height: 100%;

    transition: background-color 0.15s ease;
  }
  .main-menu > li:last-of-type > .main-link {
    border-bottom: 1px solid var(--primary);
  }
  .main-link:hover:not(.active) {
    background-color: var(--surface-variant);
  }

  .has-submenu {
    position: relative;
  }
  .sub-menu {
    display: none;
    flex-direction: column;
    padding-left: 8px;

    background-color: transparent;
    box-shadow: 2px 2px 2px var(--surface-variant);

    position: absolute;
    z-index: 1000;
    top: 0;
    left: 40px;
  }
  .has-submenu:hover .sub-menu {
    display: flex;
  }
  .sub-link {
    display: flex;
    padding: 8px;
    gap: 4px;
    align-items: center;

    background-color: var(--surface);
  }
  .sub-link:hover:not(.active) {
    background-color: var(--surface-variant);
  }
  .sub-link .icon {
    width: 24px;
    height: 24px;
  }

  .active {
    background-color: var(--primary);
  }

  .page {
    background-color: var(--surface);

    border-radius: 16px;
    box-shadow: 2px 2px 4px var(--outline);

    padding: 16px;
  }

  /* icons */
  .icon-home {
    background-image: url('/icons/home.svg');
  }
  .icon-design {
    background-image: url('/icons/design_services.svg');
  }
  .icon-palletes {
    background-image: url('/icons/color_fill.svg');
  }
  .icon-library {
    background-image: url('/icons/slide_library.svg');
  }
  .icon-pomodoro {
    background-image: url('/icons/timer_10.svg');
  }
  .icon-csv-reader {
    background-image: url('/icons/csv.svg');
  }
  .icon-calorie-calculator {
    background-image: url('/icons/food_bank.svg');
  }
</style>
