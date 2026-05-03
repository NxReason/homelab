<script lang="ts">
	import '../styles.css'
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="container">

	<nav>
		<ul>
			<li>
				<a href="/design">D</a>
			</li>
			<li>
				<a href="/pomodoro">P</a>
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

	padding: 32px;
}
nav {
	display: flex;
	justify-content: center;
}
nav ul {
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-self: center;
}
nav ul li {
	width: 40px;
	height: 40px;
}
nav ul a {
	display: grid;
	place-items: center;

	border: 2px solid var(--on-background);
	border-radius: 12px;

	width: 100%;
	height: 100%;

	transition: background-color .15s ease;
}
nav ul a:hover {
	background-color: var(--surface-variant);
}
</style>