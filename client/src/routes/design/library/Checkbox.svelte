<script lang="ts"></script>


<div class="container">
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox">
    <span class="custom-checkbox"></span>
    <span>Option name</span>
  </label>

  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" checked>
    <span class="custom-checkbox"></span>
    <span>Option name</span>
  </label>

  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" disabled>
    <span class="custom-checkbox"></span>
    <span class="checkbox-text">Option name</span>
  </label>
</div>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.checkbox-label {
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}
.checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.custom-checkbox {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--on-surface);
  border-radius: 4px;
  position: relative;
}

.checkbox:checked + .custom-checkbox {
  background: var(--primary);
  border-color: var(--primary);
}
.checkbox:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox:disabled + .custom-checkbox {
  border-color: var(--outline);
}
</style>