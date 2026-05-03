<script lang="ts">
	import '../styles.css'
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	const isActive = (path: string) =>
		page.url.pathname === path

	const isActiveGroup = (path: string) =>
		page.url.pathname.startsWith(path)

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">

	<nav>
		<ul class="main-menu">
			<li>
				<a href="/" class:active={isActive('/')}>H</a>
			</li>
			<li class="has-submenu">
				<a href="/design" class:active={isActiveGroup('/design')}>D</a>
				<ul class="sub-menu">
					<li>
						<a href="/design/palletes" class:active={isActive("/design/palletes")}>Palletes</a>
					</li>
					<li>
						<a href="/design/library" class:active={isActive("/design/library")}>Library</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="/pomodoro" class:active={isActive('/pomodoro')}>P</a>
			</li>
		</ul>
	</nav>

	<main class="page">
		{@render children()}
	</main>

</div>

<style>
.container {
	display: grid;
	grid-template-columns: 100px 1fr 100px;
	gap: 16px;

	min-height: 100dvh;
	padding: 32px;
}
nav {
	align-self: start;

	display: flex;
	justify-content: center;
}
.main-menu {
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-self: center;
}
.main-menu > li {
	width: 40px;
	height: 40px;
}
.main-menu > li > a {
	display: grid;
	place-items: center;

	border: 2px solid var(--on-background);
	border-radius: 12px;

	width: 100%;
	height: 100%;

	transition: background-color .15s ease;
}
.main-menu a:hover:not(.active) {
	background-color: var(--surface-variant);
}

.has-submenu {
	position: relative;
}
.sub-menu {
	display: none;
	flex-direction: column;

	background-color: var(--surface);
	box-shadow: 2px 2px 2px var(--surface-variant);

	position: absolute;
	top: 0;
	left: 40px;
}
.has-submenu:hover .sub-menu {
	display: flex;
}
.sub-menu li {
	display: block;
}
.sub-menu li a {
	display: block;
	width: 100%;
	height: 100%;
	padding: 8px 16px;
}

.active {
	background-color: var(--primary);
}

.page {
	background-color: var(--surface);

	border-radius: 16px;
	box-shadow: 2px 2px 4px var(--outline);

	padding: 16px;
}
</style>