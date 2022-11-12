<script lang="ts">
	export let message: string;
</script>

<div class="errormsg">
	<h2>{message}</h2>
	<p>Please contact a staff member and tell them about the issue</p>
</div>

<style>
	.errormsg {
		color: #888;
		padding: 1rem;
		border-radius: 0.5rem;
		border: solid 2px rgb(225, 29, 72);
		background: rgba(74, 18, 18, 0.5);
	}

	.errormsg h2 {
		color: #fff;
		margin-top: 0;
	}

	.errormsg > p:last-child {
		margin-bottom: 0;
	}
</style>
