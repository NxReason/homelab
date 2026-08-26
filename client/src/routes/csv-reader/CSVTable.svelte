<script lang="ts">
  type Props = {
    hasHeader?: boolean;
    headers?: string[] | null;
    data: string[][] | null;
  };

  let {
    hasHeader: hasHeaders = true,
    headers = null,
    data = null,
  }: Props = $props();
</script>

<div class="container">
  <table class="csv-data">
    {#if hasHeaders}
      <thead class="table-header">
        {@render headerRow(headers)}
      </thead>
    {/if}
    <tbody>
      {#each data as row}
        <tr class="row">
          {@render dataRow(row)}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{#snippet headerRow(headers: string[] | null)}
  {#each headers as h}
    <th class="th">{h}</th>
  {/each}
{/snippet}

{#snippet dataRow(values: string[] | null)}
  {#each values as v}
    <td class="td">{v}</td>
  {/each}
{/snippet}

<style>
  .container {
    display: block;
    width: 0;
    min-width: 100%;
    max-height: 600px;
    overflow-x: auto;
    overflow-y: auto;
    scrollbar-color: var(--primary) transparent;
  }
  .csv-data {
    width: 100%;
  }
  .table-header {
    background-color: var(--primary);
  }
  .row {
    background-color: var(--background);
  }
  .row:nth-child(odd) {
    background-color: var(--surface-variant);
  }
  .th,
  .td {
    padding: 4px 8px;
  }
</style>
