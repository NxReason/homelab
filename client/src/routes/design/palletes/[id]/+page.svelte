<script lang="ts">
  import type { IPallete } from '../IPallete';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<h1>{data.pallete.name}</h1>
