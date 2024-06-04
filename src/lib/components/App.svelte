<script>
  import { authenticated } from "../../stores/ModalStore";
  import Login from "./Login/index.svelte";
  import Nav from "./Nav.svelte";
  import Product from "./Product/index.svelte";
</script>

{#if true}
  <Nav />
  <div class="p-5 md:p-0">
    <Product />
  </div>
{:else}
  <Login />
{/if}
