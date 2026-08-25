<script lang="ts">
  type Props = {
    path?: string;
  };

  const { path = '/' }: Props = $props();
</script>

<a href={path} class="link-back">
  <i class="icon icon-back"></i>
  <span>Return</span>
</a>

<style>
  .link-back {
    display: flex;
    align-items: center;
    justify-self: start;
    padding: 0 8px 4px 0;
    border-bottom: 2px solid var(--primary);
  }
</style>
