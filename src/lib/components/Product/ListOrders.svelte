<script>
  import { onMount } from "svelte";
  import { addProductToOrder, getOrder } from "../../../api/orders";
  import {
    isModalOrderOpen,
    orderChecked,
    orderName,
    productToUpdate,
  } from "../../../stores/ModalStore";
  import InputField from "../Forms/components/inputField.svelte";

  let showOrder;
  let orders = [];

  let showFieldText = false;

  const fetchData = () => {
    getOrder("orders").then(({ data }) => {
      orders = data.data;
    });
  };

  const handleAddProductToOrder = async ($orderChecked, $productToUpdate) => {
    try {
      if ($orderName) {
        handleAddOrderAndOrderLines($orderChecked, $productToUpdate);
        return;
      }

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

  const handleAddOrderAndOrderLines = async (
    $orderChecked,
    $productToUpdate
  ) => {
    try {
      let object = {
        name: $orderName,
        orderId: $orderChecked?.id,
        productId: $productToUpdate?.id,
      };

      const data = await addProductToOrder("/orders/orders-lines", object);

      if (data.data.status == "error") {
        throw new Error("data.data.message");
      }

      isModalOrderOpen.set(false);
      orderName.set("");
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
            on:click={() => (showFieldText = true)}>Create order</button
          >

          {#if showFieldText}
            <InputField
              label={"Order Name"}
              placeholder={"Order Name"}
              name={"order_name"}
            />
          {/if}
        </div>
      </section>

      <section aria-labelledby="products-heading" class="pt-6">
        <div class="lg:grid-cols-1">
          <form class="lg:block">
            <div class="">
              <h3 class="flow-root">
                <span class="font-medium text-gray-900">Choose a order</span>
              </h3>
              <div class="pt-6" id="filter-section-2">
                <div class="space-y-4">
                  <div class="columns-3">
                    {#each orders as order}
                      <div class="d-flex">
                        <input
                          id="filter-size-0"
                          value={order?.id}
                          type="radio"
                          checked={order?.id == $orderChecked?.id}
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          on:click={() => orderChecked.set(order)}
                        />
                        <label
                          for="filter-size-0"
                          class="ml-3 text-sm text-gray-600">{order.name}</label
                        >
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section aria-labelledby="products-heading" class="py-5">
        <div class="lg:grid-cols-1">
          <button
            class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            on:click={() =>
              handleAddProductToOrder($orderChecked, $productToUpdate)}
            >Add Product to {$orderChecked.name ?? $orderName}</button
          >
        </div>
      </section>
    </main>
  </div>
</div>
