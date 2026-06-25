<script lang="ts"></script>

{#snippet example(type: string)}
  <div class={`example ${type.toLowerCase()}`}>
    <div class="wrapper">
      <input type="text" class="input" placeholder=" ">
      <span class="title">Text field</span>
      <p class="sub">Supporting text</p>
    </div>

    <div class="wrapper">
      <input type="text" class="input" value={type} placeholder=" ">
      <span class="title">Text field</span>
      <p class="sub">Supporting text</p>
    </div>
  </div>
{/snippet}

<div class="container">
  {@render example('Filled')}
  {@render example('Outlined')}
</div>

<style>
.example {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.filled {
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
    font-size: .8rem;
    color: var(--on-disabled);
  }

  .input:focus {
    border-bottom-color: var(--secondary);
  }

  .sub {
    font-size: .8rem;
    padding: 4px 12px 0;
  }
}

.outlined {
  .wrapper {
    position: relative;
  }

  .input {
    padding: 16px 12px;
    background-color: transparent;
    border: 2px solid var(--primary);
    border-radius: 8px;
    outline: none;
  }

  .title {
    position: absolute;
    left: 12px;
    top: 18px;
    pointer-events: none;
    transition: 0.2s ease;
  }

  .input:focus + .title,
  .input:not(:placeholder-shown) + .title {
    top: -8px;
    font-size: .8rem;
    color: var(--on-disabled);
    background-color: var(--surface);
  }

  .input:focus {
    border-color: var(--secondary);
  }

  .sub {
    font-size: .8rem;
    padding: 4px 12px 0;
  }
}
</style>