<script lang="ts">
  type Props = {
    value?: string | null;
    title?: string;
    sub?: string;
  };

  let {
    value = $bindable<string | null>(),
    title = '',
    sub = '',
  }: Props = $props();

  let style = $derived(
    title ? `padding: 28px 12px 12px` : `padding: 20px 12px`,
  );
</script>

<div class="wrapper">
  <input
    type="text"
    class="input"
    bind:value
    placeholder=""
    {style}
    onfocus={e => (e.target as HTMLInputElement).select()}
  />
  <span class="title">{title}</span>
  {#if sub}
    <p class="sub">{sub}</p>
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
  }

  .input {
    padding: 28px 12px 12px;
    background-color: var(--surface-variant);
    border-bottom: 2px solid var(--primary);
    outline: none;
  }

  .title {
    position: absolute;
    left: 12px;
    top: 20px;
    pointer-events: none;
    transition: 0.2s ease;
  }

  .input:focus + .title,
  .input:not(:placeholder-shown) + .title {
    top: 8px;
    font-size: 0.8rem;
    color: var(--on-disabled);
  }

  .input:focus {
    border-bottom-color: var(--secondary);
  }

  /* .sub {
    font-size: 0.8rem;
    padding: 4px 12px 0;
  } */
</style>
