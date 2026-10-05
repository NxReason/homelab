<script lang="ts">
  type Props = {
    label?: string;
    options?: { value: string | number; text: string }[];
    selected?: string | number;
    onchange?: () => void;
  };

  let { options = [], selected = $bindable(), onchange }: Props = $props();

  function handleChange(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    selected = input.value;
    if (onchange) onchange();
  }
</script>

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

<style>
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
    border-radius: 0;

    transition: 0.2s;
    cursor: pointer;
  }

  select:hover,
  select:focus {
    background: var(--background);
    outline: none;
  }

  selectedcontent {
    display: flex;
    align-items: center;
  }

  ::picker(select) {
    background: transparent;
    border: none;
  }

  select::picker-icon {
    align-self: center;
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
  option:checked {
    font-weight: bold;
  }
  option::checkmark {
    order: 1;
    margin-left: auto;
    content: '☑️';
  }
</style>
