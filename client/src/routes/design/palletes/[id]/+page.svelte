<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let pallete = $derived(data.pallete);

  let css = $derived.by(() => {
    const vars = pallete.colors.reduce((acc, col) => {
      return acc + `  --${col.name.toLowerCase()}: #${col.hex};\n`;
    }, ':root {\n');

    return vars + '}\n';
  });

  let copied = $state(false);
  async function copyCss() {
    await navigator.clipboard.writeText(css);

    copied = false;

    requestAnimationFrame(() => {
      copied = true;
    });
  }
  function animationFinished() {
    copied = false;
  }
</script>

<h1>{pallete.name}</h1>

<ul class="colors-list">
  {#each pallete.colors as color}
    <li class="color">
      <p class="color-name">{color.name}</p>
      <p class="color-display" style="background-color: #{color.hex}"></p>
    </li>
  {/each}
</ul>

<div class="css-clip">
  <pre><code>{css}</code></pre>

  <button onclick={copyCss} title="Copy css to clipboard" class="clip-css icon"
  ></button>
  <span
    class={['clip-msg', copied && 'copied-anim']}
    onanimationend={animationFinished}>Copied!</span
  >
</div>

<style>
  .color {
    display: flex;
  }
  .color-name {
    width: 160px;
    padding: 16px;
  }
  .color-display {
    width: 100%;
    height: 48px;
  }
  .css-clip {
    background-color: var(--background);
    padding: 16px;
    margin-top: 32px;

    position: relative;
  }
  .clip-css {
    position: absolute;
    right: 8px;
    top: 8px;
    background-image: url('/icons/clipboard.svg');
    background-size: 24px 24px;
    background-position: center;
    background-color: var(--background);
    border: 2px solid var(--primary);
    border-radius: 4px;
    transition: background-color 0.15s ease;
    z-index: 100;
  }
  .clip-css:hover {
    background-color: var(--primary);
  }
  .clip-msg {
    position: absolute;
    top: 10px;
    right: 8px;
    padding: 4px 8px;
    width: 0;
    overflow: hidden;

    background-color: var(--primary);
    border-radius: 4px;

    z-index: 50;
  }

  .copied-anim {
    animation: growInOut 1.5s linear 0s;
  }
  @keyframes growInOut {
    from {
      width: 0px;
      right: 8px;
    }
    15% {
      width: 72px;
      right: 48px;
    }
    85% {
      width: 72px;
      right: 48px;
    }
    to {
      width: 0px;
      right: 8px;
    }
  }
</style>
