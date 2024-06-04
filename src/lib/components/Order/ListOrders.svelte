<script>
  import { onMount } from "svelte";
  import { addProductToOrder, getOrder } from "../../../api/orders";
  import {
    isModalOrderOpen,
    orderChecked,
    productToUpdate,
  } from "../../../stores/ModalStore";
  import OrderRow from "./OrderRow.svelte";

  let orders = [];

  const fetchData = () => {
    getOrder("orders").then(({ data }) => {
      orders = data.data;
    });
  };

  const handleAddProductToOrder = async ($orderChecked, $productToUpdate) => {
    try {
      let object = {
        orderId: $orderChecked?.id,
        productId: $productToUpdate?.id,
      };

      const data = await addProductToOrder("/orders/lines", object);

      if (data.data.status == "error") {
        throw new Error("data.data.message");
      }

      isModalOrderOpen.set(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onMount(async () => {
    await fetchData();
  });
</script>

<div class="bg-white">
  <div>
    <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-black bg-opacity-25"></div>
    </div>

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-baseline justify-between border-b border-gray-200">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Orders</h1>
      </div>

      <section aria-labelledby="products-heading" class="py-5">
        <div class="lg:grid-cols-1">
          <button
            class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            >Create order</button
          >
        </div>
      </section>

      <section aria-labelledby="products-heading" class="pt-6">
        <div class="lg:grid-cols-1">
          {#if data}
            {#each data as item}
              <OrderRow {item} />
            {/each}
          {:else}
            <p>Loading...</p>
          {/if}
        </div>
      </section>

      <section aria-labelledby="products-heading" class="py-5">
        <div class="lg:grid-cols-1">
          <button
            class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            on:click={() =>
              handleAddProductToOrder($orderChecked, $productToUpdate)}
            >Add Product to {$orderChecked.name}</button
          >
        </div>
      </section>
    </main>
  </div>
</div>
