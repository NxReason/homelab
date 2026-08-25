<script lang="ts">
  import type { PageProps } from './$types';
  import { deletePallete } from './api';
  import type { IPallete } from './IPallete';
  import PalleteItem from './PalleteItem.svelte';
  import Select from '$lib/components/Select.svelte';
  import TextInput from '$lib/components/TextInput.svelte';

  let { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  let palletes = $state<IPallete[]>([...data.palletes]);

  async function handleDelete(id: number) {
    await deletePallete(id);
    palletes = palletes.filter(p => p.id != id);
  }

  let settingsOpen = $state(false);
  // sorting
  type SortValue = 'NAME_ASC' | 'NAME_DESC' | 'CREATED_ASC' | 'CREATED_DESC';
  const sortOptions: { value: SortValue; text: string }[] = [
    { value: 'NAME_ASC', text: 'Name (asc)' },
    { value: 'NAME_DESC', text: 'Name (desc)' },
    { value: 'CREATED_ASC', text: 'Created date (asc)' },
    { value: 'CREATED_DESC', text: 'Created date (desc)' },
  ];
  let sortValue: SortValue = $state('CREATED_DESC');
  function sortPalletes() {
    palletes.sort((a, b) => {
      switch (sortValue) {
        case 'NAME_ASC':
          return a.name > b.name ? 1 : -1;
        case 'NAME_DESC':
          return a.name < b.name ? 1 : -1;
        case 'CREATED_ASC':
          return a.createdAt > b.createdAt ? 1 : -1;
        case 'CREATED_DESC':
          return a.createdAt < b.createdAt ? 1 : -1;
        default:
          return 0;
      }
    });
  }

  // filtering
  let nameFilter = $state('');
  let colorFilter = $state('');

  let visiblePalletes = $derived.by(() => {
    let copy = [...palletes];
    copy = copy.filter(p => p.name.includes(nameFilter));
    copy = copy.filter(p =>
      p.colors.some(
        c =>
          c.name.toLowerCase().includes(colorFilter.toLowerCase()) ||
          c.hex.includes(colorFilter),
      ),
    );
    return copy;
  });
</script>

<div class="container">
  <h1 class="page-title">{data.title}</h1>

  <section class="page-controls">
    <a href="/design/palletes/new" class="btn page-control">New</a>
    <button
      class="btn page-control"
      onclick={() => (settingsOpen = !settingsOpen)}
    >
      Settings
    </button>
  </section>

  <section class={['settings', settingsOpen && 'open']}>
    <Select
      label="Sort by"
      options={sortOptions}
      bind:selected={sortValue}
      onchange={sortPalletes}
    />

    <TextInput title="Filter by name" bind:value={nameFilter} />
    <TextInput title="Filter by color" bind:value={colorFilter} />
  </section>

  <ul class="palletes">
    {#each visiblePalletes as pallete}
      <PalleteItem {pallete} onDelete={handleDelete} />
    {/each}
  </ul>
</div>

<style>
  .container {
    display: grid;
    grid-template-rows: 0fr;
    gap: 16px;
  }
  .page-control {
    display: inline-block;
    padding: 8px 16px;
    transition: background-color 0.15s ease;
  }
  .page-control:hover {
    background-color: var(--primary);
    cursor: pointer;
  }

  .settings {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;

    interpolate-size: allow-keywords;
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
  }
  .settings.open {
    height: auto;
  }
</style>
