<script>
  import { onMount } from "svelte";
  import { deleteProduct, getProduct } from "../../../api/product";
  import ProductRow from "./OrderRow.svelte";
  import Dialog from "../Dialog.svelte";
  import {
    isModalOpen,
    isModalOrderOpen,
    isOrderModalOpen,
    responseCreateProduct,
  } from "../../../stores/ModalStore";
  import CreateProduct from "../Forms/CreateProduct.svelte";
  import ListOrders from "./ListOrders.svelte";
  import {
    addProductToOrder,
    deleteOrder,
    getOrder,
  } from "../../../api/orders";
  import OrderRow from "./OrderRow.svelte";
  import SeeOrders from "./SeeOrders.svelte";

  let data = null;
  let showModal = false;
  let showOrders = false;

  const fetchData = async () => {
    try {
      data = await getOrder("/orders");

      if (data.data.status == "error") {
        throw new Error("data.data.message");
      }
      data = data?.data?.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteOrder("/orders", id);

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
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Orders</h2>
    </div>
  </div>

  <div
    class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1
xl:gap-x-8"
  >
    {#if data}
      {#each data as item}
        <OrderRow {item} {handleDelete} />
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</div>

{#if $isOrderModalOpen}
  <Dialog body={SeeOrders} isOpen={isOrderModalOpen} />
{/if}
