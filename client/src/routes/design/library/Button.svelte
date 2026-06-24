<script lang="ts"></script>

{#snippet btnGroup(title: string, groupClass: string = '')}
  <div class={`btn-group ${groupClass}`}>
    <h2 class="btn-group-title">{title}</h2>
    <button class="btn elevated">Elevated</button>
    <button class="btn with-icon"><i class="icon icon-heart"></i>With icon</button>
    <button class="btn filled">Filled</button>
    <button class="btn outlined">Outlined</button>
  </div>
{/snippet}

{@render btnGroup('Regular')}
{@render btnGroup('Disabled', 'disabled')}
{@render btnGroup('Hover', 'hover')}
{@render btnGroup('Focus', 'focus')}

<style>
.btn-group {
  display: flex;
  gap: 16px;
  padding: 16px;
  padding-top: 24px;
  margin-bottom: 24px;

  border: 1px solid var(--outline);

  position: relative;
}
.btn-group-title {
  position: absolute;
  top: -18px;

  background-color: var(--surface);
}

.btn {
  padding: 8px 16px;

  background-color: var(--primary);

  border-radius: 8px;
}
.elevated {
  box-shadow: 1px 1px 2px var(--on-surface),
    -1px 1px 2px var(--on-surface);
}

.with-icon {
  display: inline-flex;
  gap: 4px;
}
.icon-heart {
  width: 20px;
  height: 20px;
  background-image: url('/icons/heart.svg');
}

.outlined {
  background-color: transparent;
  border: 1px solid var(--primary);
}

.disabled .btn {
  background-color: var(--surface-variant);
  color: var(--on-disabled);
}
.disabled .elevated {
  box-shadow: none;
}
.disabled .outlined {
  border-color: var(--outline);
}

.hover .btn {
  background-color: var(--secondary);
  color: var(--on-secondary);
}
.hover .elevated {
  box-shadow: none;
}
.hover .outlined {
  border: none;
}

.focus .btn {
  outline: 2px solid var(--on-surface);
  outline-offset: 3px;
}
.focus .outlined {
  border: none;
}
</style>