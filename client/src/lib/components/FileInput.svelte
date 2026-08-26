<script lang="ts">
  type Props = {
    files: FileList | undefined;
    buttonText?: string;
    multiple?: boolean;
    showName?: boolean;
    showCount?: boolean;
    style?: string;
  };

  let {
    files = $bindable(),
    buttonText = 'Choose file',
    multiple = false,
    showName = true,
    showCount = false,
    style = '',
  }: Props = $props();

  let fileCount = $derived(files ? files.length : 0);
  let fileNames = $derived.by(() => {
    if (!files) return [];

    let out = [];
    for (let i = 0; i < files.length; i++) {
      out[i] = files[i].name;
    }
    return out;
  });
</script>

<div class="container" {style}>
  <label class="fake-input btn">
    <span>{buttonText}</span>
    <input type="file" bind:files {multiple} />
  </label>

  <div class="file-count">
    {#if showCount}
      {fileCount} files
    {/if}
  </div>

  <ul class="file-names">
    {#if showName}
      {#each fileNames as name}
        <li class="file-name">{name}</li>
      {/each}
    {/if}
  </ul>
</div>

<style>
  .container {
    display: inline-grid;
    grid-template-columns: min-content min-content;
    gap: 4px 8px;
    padding: 4px;
    align-items: center;
  }
  .fake-input {
    position: relative;
    text-wrap: nowrap;
    padding: 6px 10px;
  }
  .file-count {
    text-wrap: nowrap;
  }
  input[type='file'] {
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    top: -10000px;
    height: -10000px;
  }
</style>
