<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte';

  type Props = {
    hex?: string;
  };
  let { hex = $bindable('000000') }: Props = $props();

  function handleInput(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    hex = input.value.slice(1);
  }
</script>

<div class="container">
  <TextInput bind:value={hex} />
  <label class="color-preview" style="background-color: #{hex}">
    <input
      id="hello"
      type="color"
      class="color-picker"
      value="#{hex}"
      oninput={handleInput}
    />
  </label>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .color-preview {
    position: relative;
  }
  .color-picker {
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    visibility: hidden;
  }
</style>
