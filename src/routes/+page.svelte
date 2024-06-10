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
	<section id="chat">
		<h1>Komputerin Demo App</h1>
	
		<div>
			{@html message}
		</div>
	
		<form method="post">
			<input type="text" name="chat" placeholder="Type your message..." />
		</form>
	</section>

	<!-- <section id="result">

	</section> -->
</main>

<style lang="postcss">
	main {
		@apply bg-gray-200 h-screen grid grid-cols-3;
	}

	#chat {
		@apply flex flex-col items-center col-span-3;
	}

	#result {
		@apply bg-gray-300;
	}

	h1 {
		@apply font-sans text-4xl absolute top-10;
	}

	div {
		@apply mt-5 p-4 w-1/2 max-h-[60%] overflow-y-scroll rounded-xl bg-gray-100 bg-opacity-30 text-center;
	}

	section {
		@apply font-sans text-xl flex flex-col justify-center;
	}

	form {
		@apply absolute bottom-10;
	}

	input {
		@apply w-96 h-10 rounded-xl py-1 px-3;
	}
</style>
