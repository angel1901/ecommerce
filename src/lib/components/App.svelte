<script>
  import { onMount } from "svelte";
  import { authenticated } from "../../stores/ModalStore";
  import Login from "./Login/index.svelte";
  import Nav from "./Nav.svelte";
  import Product from "./Product/index.svelte";

  let isAutenticated = false;
  onMount(async () => {
    isAutenticated = localStorage.getItem("isAutenticated") == "1";
    authenticated.set(isAutenticated);
  });
</script>

{#if $authenticated}
  <Nav />
  <div class="p-5 md:p-0">
    <Product />
  </div>
{:else}
  <Login />
{/if}
