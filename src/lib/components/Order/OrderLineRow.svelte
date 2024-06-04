<script>
  export let item;
  export let handleDelete;

  let product = [];

  if (item) {
    product = item?.product;
  }
</script>

<ul role="list" class="divide-y divide-gray-100">
  <li class="flex justify-between gap-x-6 py-5">
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">
          {product?.name}
          {product?.description}
        </p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">
          Created at {item.created_at}
        </p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">
          Value: {item.value}
        </p>
      </div>
    </div>
    <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
      <div
        class="mt-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 items-center"
      >
        <button
          on:click={() => handleDelete(item?.id)}
          class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          >Delete</button
        >
      </div>
    </div>
  </li>
</ul>
