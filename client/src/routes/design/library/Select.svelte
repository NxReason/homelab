<label for="color-select">Select a color:</label>
<select id="color-select">
  <button>
    <selectedcontent></selectedcontent>
  </button>

  <option value="">Please select a color</option>
  <option value="red">
    <span class="option-icon red" aria-hidden="true"></span>
    <span class="option-label">Red</span>
  </option>
  <option value="green">
    <span class="option-icon green" aria-hidden="true"></span>
    <span class="option-label">Green</span>
  </option>
  <option value="blue">
    <span class="option-icon blue" aria-hidden="true"></span>
    <span class="option-label">Blue</span>
  </option>
</select>

<style>
  select,
  ::picker(select) {
    appearance: base-select;
  }

  select {
    width: 300px;
    padding: 10px;

    background: var(--surface);
    border: 2px solid var(--primary);

    transition: 0.2s;
    cursor: pointer;
  }

  select:hover,
  select:focus {
    background: var(--background);
  }

  ::picker(select) {
    background: transparent;
    border-radius: 8px;
    border: none;
  }

  select::picker-icon {
    color: var(--on-surface);
    transition: 0.2s rotate;
  }
  select:open::picker-icon {
    rotate: 180deg;
  }

  option {
    padding: 10px;

    display: flex;
    justify-content: flex-start;
    gap: 20px;

    background: var(--background);
    color: var(--on-background);
    transition: 0.2s;
  }
  option:not(:last-of-type) {
    border-bottom: 1px solid var(--on-background);
  }
  option:first-of-type {
    border-radius: 8px 8px 0 0;
  }
  option:last-of-type {
    border-radius: 0 0 8px 8px;
  }
  /* option:nth-of-type(odd) {
    background: var(--surface);
  } */

  /* selectedcontent .option-icon {
    display: inline-block;
  } */
  option:checked {
    font-weight: bold;
  }
  option::checkmark {
    order: 1;
    margin-left: auto;
    content: '☑️';
  }

  .option-icon {
    /* display: inline-block; */
    width: 16px;
    height: 16px;
  }
  .option-icon.red {
    background-color: red;
  }
  .option-icon.blue {
    background-color: blue;
  }
  .option-icon.green {
    background-color: green;
  }
</style>
