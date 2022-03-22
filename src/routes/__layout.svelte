<script>
	import { onMount } from 'svelte'
	import { browser, dev } from '$app/env'

	// replaced dynamically
	const date = '__DATE__'

	let ReloadPrompt
	onMount(async () => {
		!dev && browser && (ReloadPrompt = (await import('$lib/components/ReloadPrompt.svelte')).default)
	})
</script>

<svelte:head>
	{#if (!dev && browser)}
		<link rel="manifest" href="/_app/manifest.webmanifest">
	{/if}
</svelte:head>

<main>
	<slot>
		<slot name="header">Image of the day for <b>{date}</b></slot>
	</slot>

</main>

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}

<style global>
	:global(:root) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		}
		:global(h1) {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 2rem auto;
		max-width: 14rem;
	}
	@media (min-width: 480px) {
		:global(h1) {
			max-width: none;
		}
	}
</style>
