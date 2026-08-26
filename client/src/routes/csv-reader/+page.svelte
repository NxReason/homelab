<script lang="ts">
  import FileInput from '$lib/components/FileInput.svelte';
  import TextInput from '$lib/components/TextInput.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import CSVTable from './CSVTable.svelte';

  const defaultDelimeters = [',', ';', '\\t'];

  let files = $state<FileList>();
  let delimeter = $state(',');
  let delimeterError = $derived.by<string | null>(() => {
    if (defaultDelimeters.includes(delimeter)) return null;
    if (delimeter === '') return 'Specify delimeter (, ; \\t)';

    return 'Non-default delimeter';
  });
  let hasHeader = $state(true);
  let lines = $derived.by<Promise<null | string[]>>(async () => {
    // return [
    //   'foo,bar,baz,hellok,darkness,my,old,friend,i,come,to,talk,to,you,again,and,something,else,is,going,here,to,make,the,headers,really,long',
    // ];
    if (!files || !files.length) return null;

    return await parseCSV(files[0]);
  });

  let headers = $derived.by<Promise<null | string[]>>(async () => {
    const linesSync = await lines;
    if (!linesSync) return null;
    if (!hasHeader) return null;

    if (linesSync.length < 1) return null;
    return linesSync[0].split(delimeter);
  });

  let data = $derived.by<Promise<null | string[][]>>(async () => {
    // keep it before await for svelte reasons
    let firstLine = hasHeader ? 1 : 0;
    const linesSync = await lines;

    if (!linesSync) return null;

    let out: string[][] = [];
    for (let i = firstLine; i < linesSync.length; i++) {
      out.push(linesSync[i].split(delimeter));
    }

    return out;
  });

  async function parseCSV(
    file: File,
    linesCount: number = -1,
  ): Promise<string[]> {
    const text = await file.text();
    const lines = text.split('\n');

    if (linesCount < 0) {
      return lines;
    }

    return lines.slice(0, linesCount);
  }
</script>

<h1>CSV Reader</h1>

<div class="controls">
  <FileInput
    bind:files
    showName={false}
    multiple={true}
    buttonText="Download CSV"
  />
  <div class="delimeter-input">
    <TextInput title="Delimeter" bind:value={delimeter} />
    {#if delimeterError}
      <p>{delimeterError}</p>
    {/if}
  </div>

  <Checkbox bind:checked={hasHeader} text="Has headers?" />
</div>

{#await Promise.all([headers, data])}
  <p>Loading...</p>
{:then [headers, data]}
  <CSVTable {data} {headers} {hasHeader} />
{/await}

<style>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;
    margin-bottom: 16px;
  }
  .delimeter-input {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
  }
</style>
