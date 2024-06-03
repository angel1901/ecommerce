<script>
  import { isModalOpen, productToUpdate } from "../../../stores/ModalStore";

  export let item;
  export let handleDelete;

  const handleUpdate = () => {
    isModalOpen.set(true);
    productToUpdate.set(item);
  };
</script>

<div class="group relative">
  <div
    class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow"
  >
    <img
      src={item.url_image}
      alt={item.url_image}
      class="h-full w-full object-cover object-center lg:h-full lg:w-full"
    />
  </div>
  <div class="mt-4 flex justify-between">
    <div>
      <h3 class="text-sm text-gray-700">
        {item.name}
      </h3>
      <p class="mt-1 text-sm text-gray-500">{item.description}</p>
    </div>
    <p class="text-sm font-medium text-gray-900">${item.value}</p>
  </div>

  <div class="mt-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 items-center">
    <button
      on:click={() => handleDelete(item?.id)}
      class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
      >Delete</button
    >
    <button
      class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
      on:click={handleUpdate}>Update</button
    >
    <button
      class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
      >Add to Order</button
    >
  </div>
</div>
