<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let { form } = $props();
	let message = $state('<h2>Hi, how can I help?</h2>');

	onMount(async () => {
		if (form != null) {
			message = marked.parse(form.msg);
		}
	});
</script>

<main>
	<h1>Komputerin Demo App</h1>

	<div>
		<section>{@html message}</section>
	</div>

	<form method="post">
		<input type="text" name="chat" placeholder="Type your message..." />
	</form>
</main>

<style lang="postcss">
	main {
		@apply bg-gray-200 h-screen flex flex-col items-center place-content-center;
	}

	h1 {
		@apply font-sans text-4xl;
	}

	div {
		@apply mt-5 p-4 w-1/2 max-h-[50%] overflow-y-auto rounded-xl bg-gray-100;
	}

	section {
		@apply font-sans text-xl;
	}

	input {
		@apply w-96 rounded-xl p-1 px-2 mt-5;
	}
</style>
