<script lang="ts">
	import { GITHUB_RELEASES, GITHUB_REPO, TERMINAL_TROVE_URL } from '$lib/constants';
</script>

<footer class="relative z-10 bg-[var(--bg-app)] py-6 font-mono text-xs text-[var(--text-main)]">
	<div class="flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
		<!-- Made with love message -->
		<p
			class="flex flex-wrap items-center justify-center gap-2 text-center sm:justify-start sm:text-left"
		>
			<span>Made with 💖 for developers who forget to take breaks</span>
			<span class="hidden h-3.5 w-px bg-[var(--border-ui)] sm:inline"></span>
			<a
				href={GITHUB_REPO}
				target="_blank"
				rel="noreferrer"
				class="font-bold text-[var(--color-primary)] hover:underline"
			>
				Check out on GitHub
			</a>
		</p>

		<!-- Meta links -->
		<div class="flex items-center gap-4 text-xs font-semibold text-[var(--text-dim)]">
			<a
				href={GITHUB_RELEASES}
				target="_blank"
				rel="noreferrer"
				class="hover:text-[var(--color-primary)]"
			>
				releases
			</a>
			<span>•</span>
			<a
				href={TERMINAL_TROVE_URL}
				target="_blank"
				rel="noreferrer"
				class="hover:text-[var(--color-primary)]"
			>
				terminal trove
			</a>
			<span>•</span>
			<span>mit license</span>
		</div>
	</div>
</footer>
