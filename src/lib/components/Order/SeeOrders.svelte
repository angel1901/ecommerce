<script>
  import { onMount } from "svelte";
  import { deleteOrder, showOrder } from "../../../api/orders";
  import {
    isOrderModalOpen,
    orderSelected,
    responseCreateProduct,
  } from "../../../stores/ModalStore";
  import OrderLineRow from "./OrderLineRow.svelte";

  let orders = [];

  const fetchData = () => {
    showOrder("orders", $orderSelected?.id).then(({ data }) => {
      orders = data.data[0].OrderLine;
    });
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteOrder("/orders/order-line", id);

      if (data.data.status == "error") {
        throw new Error("data.data.message");
      }

      responseCreateProduct.set(data?.message);
      isOrderModalOpen.set(false);
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
      <div class="items-baseline justify-between border-b border-gray-200">
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Orders
        </h1>
        <p class="text-sm leading-6 text-gray-900">{$orderSelected?.id}</p>
      </div>
      <section aria-labelledby="products-heading" class="pt-6">
        <div class="lg:grid-cols-1">
          {#each orders as order}
            <OrderLineRow item={order} {handleDelete} />
          {/each}
        </div>
      </section>
    </main>
  </div>
</div>
