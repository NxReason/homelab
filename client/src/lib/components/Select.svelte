<script lang="ts">
  type Props = {
    label?: string;
    options?: { value: string; text: string }[];
    selected?: string;
    onchange?: () => void;
  };

  let {
    label,
    options = [],
    selected = $bindable(),
    onchange,
  }: Props = $props();

  function handleChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    selected = input.value;
    if (onchange) onchange();
  }
</script>

<label class="container">
  {#if label}
    <p class="label-text">{label}</p>
  {/if}

  <select onchange={handleChange}>
    <button>
      <selectedcontent></selectedcontent>
    </button>

    {#each options as o}
      <option value={o.value} selected={o.value === selected}>
        <span class="option-text">{o.text}</span>
      </option>
    {/each}
  </select>
</label>

<style>
  .container {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    align-items: center;
  }

  select,
  ::picker(select) {
    appearance: base-select;
  }

  select {
    padding: 10px;

    color: var(--on-surface);
    font: inherit;

    background: transparent;
    border: 2px solid var(--primary);

    transition: 0.2s;
    cursor: pointer;
  }

  select:hover,
  select:focus {
    background: var(--background);
    outline: none;
  }

  ::picker(select) {
    background: transparent;
    border: none;
  }

  select::picker-icon {
    color: var(--primary);
    transition: 0.2s rotate;
  }
  select:open::picker-icon {
    rotate: 180deg;
  }

  option {
    padding: 10px;

    display: flex;
    justify-content: flex-start;
    gap: 20px;

    background: var(--background);
    color: var(--on-background);
    transition: 0.2s;
  }
  option:nth-of-type(even) {
    background-color: var(--surface);
  }
  option:not(:last-of-type) {
    border-bottom: 1px solid var(--on-background);
  }
  option:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  option:last-of-type {
    border-radius: 0 0 8px 8px;
  }
  option:checked {
    font-weight: bold;
  }
  option::checkmark {
    order: 1;
    margin-left: auto;
    content: '☑️';
  }
</style>
