<div class="app-bar">
  <i class="icon icon-menu"></i>
  <input type="text" class="input-search" placeholder="Search product">
</div>

<style>
.app-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}
.icon-menu {
  background-image: url('/icons/menu.svg');
}

.input-search {
  display: inline-block;
  width: 400px;
  padding: 16px;

  text-align: center;

  background-color: var(--background);
  border: none;
  border-radius: 24px;
}

</style>