<div class="row header">
	dbg:
	<ul>
		<li>clock:<PageReloadClock/></li>
		<li>show:</li>
		<li><label><input type="checkbox" bind:checked={$settings.used_quads}/>used_quads</label></li>
		<li><label><input type="checkbox" bind:checked={$settings.type}/>type</label></li>
	</ul>
</div>

<script>
	import {settings} from './user';

	import PageReloadClock from './PageReloadClock.svelte';
</script>

<style>

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        float: left;
        margin-left: 0.4em;

    }


</style>


