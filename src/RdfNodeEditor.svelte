<script>

	import SvelteTooltip from 'svelte-tooltip';
	import {rdf_node_parsing_result, rdf_node_textual_representation} from './myrdf_io.js';


	// popover hack https://github.com/sveltejs/sapper/issues/774
	//import Popover from 'svelte-popover';
	import {onMount} from 'svelte';
	let Popover;
	onMount(async () => {
        Popover = (await import('svelte-popover')).default;
    });
	// </popover hack>



	export let node;
	export let ignore_empty = false


	let errors = null;


	function on_change(e)
	{
		const textbox_contents_string = e.target.value;
		if (textbox_contents_string === '' && ignore_empty)
			return;
		const r = rdf_node_parsing_result(textbox_contents_string);
		if ('errors' in r)
			errors = r.errors;
		else
		{
			errors = null;
			if (node !== r.value)
			{
				node = r.value;
				quadstore.update_quad(q);
			}
		}
	}

</script>

<input class="edit" value={rdf_node_textual_representation(node)} on:input={on_change}/>
{#if (errors != null)}
	<svelte:component this={Popover} overlayColor=#ffffff90>
				<span slot=target>
					<SvelteTooltip tip="parsing error" bottom>
						<img class="icon" src="icons/warning.svg" alt="warning"/>
					</SvelteTooltip>
				</span>
		<span slot=content>
                    {#each errors as error}
                        <dir>{error.errors}</dir>
                    {/each}
				</span>
	</svelte:component>
{/if}

<style>
	.icon {
		width: 1em;
		height: 1em;
	}
	input {
		width: 20%;
	}

</style>
