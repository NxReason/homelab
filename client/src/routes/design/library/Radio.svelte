<div class="container">
  <label class="radio-label">
    <input type="radio" class="radio" name="example" checked>
    <span class="custom-radio"></span>
    <span>Option name</span>
  </label>

  <label class="radio-label">
    <input type="radio" class="radio" name="example">
    <span class="custom-radio"></span>
    <span>Option name</span>
  </label>

  <label class="radio-label">
    <input type="radio" class="radio" name="example" disabled>
    <span class="custom-radio"></span>
    <span>Option name</span>
  </label>
</div>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.radio-label {
  display: flex;
  gap: 8px;
  cursor: pointer;
}
.radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.custom-radio {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--on-surface);
  border-radius: 50%;
  position: relative;
}
.radio:checked + .custom-radio {
  border-color: var(--primary);
}
.radio:checked + .custom-radio::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--primary);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.radio:disabled + .custom-radio {
  border-color: var(--outline);
}
</style>