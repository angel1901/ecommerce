<script>
  import { onMount } from "svelte";
  import { deleteProduct, getProduct } from "../../../api/product";
  import ProductRow from "./ProductRow.svelte";
  import Dialog from "../Dialog.svelte";
  import {
    authenticated,
    isModalOpen,
    isModalOrderOpen,
    responseCreateProduct,
  } from "../../../stores/ModalStore";
  import CreateProduct from "../Forms/CreateProduct.svelte";
  import ListOrders from "./ListOrders.svelte";
  import { addProductToOrder } from "../../../api/orders";
  import Order from "../Order/index.svelte";

  let data = null;
  let showModal = false;
  let showOrders = false;

  const fetchData = async () => {
    try {
      data = await getProduct("/products");

      if (data.data.status == "error") {
        throw new Error("data.data.message");
      }
      data = data?.data?.data;
    } catch (error) {
      console.log("asdas");
      authenticated.set(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteProduct("/products", id);

      if (data.data.status == "error") {
        throw new Error("data.data.message");
      }

      responseCreateProduct.set(data?.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onMount(async () => {
    await fetchData();
  });

  $: {
    if ($responseCreateProduct) {
      fetchData();
      setInterval(() => {
        responseCreateProduct.set(false);
      }, 5000);
    }
  }
</script>

<div class="bg-white">
  <div class="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 mt-4">
    <button
      type="submit"
      class="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      on:click={() => (showOrders = !showOrders)}
      >{!showOrders ? "View Orders" : "View Products"}</button
    >
    {#if showOrders}
      <Order />
    {:else}
      <div>
        <div
          class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 items-center"
        >
          {#if $responseCreateProduct}
            <h1 class="bg-gray-100 p-2 rounded">{$responseCreateProduct}</h1>
          {/if}
        </div>
        <div
          class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 items-center"
        >
          <div class="">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">
              Products
            </h2>
          </div>
          <div class="ml-auto">
            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              on:click={() => isModalOpen.set(true)}>Add Product</button
            >
          </div>
        </div>

        <div
          class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          {#if data}
            {#each data as item}
              <ProductRow {item} {handleDelete} />
            {/each}
          {:else}
            <p>Loading...</p>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

{#if $isModalOpen}
  <Dialog body={CreateProduct} isOpen={isModalOpen} />
{/if}

{#if $isModalOrderOpen}
  <Dialog body={ListOrders} isOpen={isModalOrderOpen} />
{/if}
