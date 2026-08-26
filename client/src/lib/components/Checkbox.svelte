<script lang="ts">
  type Props = {
    checked: boolean;
    text?: string;
  };
  let { checked = $bindable(), text = '' }: Props = $props();
</script>

<label class="container">
  <span class="fake-checkbox">
    <span class="fake-mark"></span>
  </span>
  <span>{text}</span>
  <input class="checkbox" type="checkbox" bind:checked />
</label>

<style>
  .container {
    position: relative;
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }
  .fake-checkbox {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--surface-variant);
    border: 1px solid var(--secondary);
  }
  .fake-mark {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--primary);
    transform: scale(0);
    transition: transform 0.3s ease;
  }
  .container:has(.checkbox:checked) .fake-mark {
    transform: scale(1);
  }
  .checkbox {
    position: absolute;
    width: 0;
    height: 0;
    top: -10000px;
    right: -10000px;
  }
</style>
