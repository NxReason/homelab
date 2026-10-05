<script lang="ts">
  type Props = { title?: string };
  const { title }: Props = $props();
</script>

<div class="separator">
  {#if title}
    <p>{title}</p>
  {/if}
</div>

<style>
  .separator {
    place-items: center;
    margin: 20px 0;
    border-bottom: 2px solid var(--surface-variant);
    position: relative;
  }
  .separator p {
    position: absolute;
    padding: 0 16px;
    background-color: var(--surface);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
