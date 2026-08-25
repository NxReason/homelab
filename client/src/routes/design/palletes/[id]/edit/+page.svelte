<script lang="ts">
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  let pallete = $state(data.pallete);
</script>

<p>Editing color pallete with id: {pallete.id} and name: {pallete.name}</p>
