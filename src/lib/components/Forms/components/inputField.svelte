<!-- Componente de entrada -->
<script>
  import { orderName } from "../../../../stores/ModalStore";

  export let label;
  export let placeholder;
  export let name;
  export let urlImageProduct;
  export let errors;

  const handleChange = (event) => {
    if (name == "url_image") {
      urlImageProduct.set(event.target.value);
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      errors = [];
      if (!urlRegex.test(event.target.value)) {
        errors = ["Must be an valid URL"];
      }
    }
    if (name == "order_name") {
      orderName.set(event.target.value);
    }
  };
</script>

<div class="sm:col-span-4">
  <label for={name} class="block text-sm font-medium leading-6 text-gray-900"
    >{label}
  </label>
  <div class="">
    <div
      class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
    >
      <input
        type="text"
        {name}
        id={name}
        autocomplete={name}
        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        {placeholder}
        on:input={handleChange}
      />
    </div>
    {#if errors && errors.length > 0}
      <p class="text-red-500 text-sm mt-1">{errors[0]}</p>
    {/if}
  </div>
</div>
