<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-yup";
  import * as yup from "yup";
  import { addProduct, updateProduct } from "../../../api/product";
  import {
    isModalOpen,
    urlImageProduct,
    responseCreateProduct,
    productToUpdate,
  } from "../../../stores/ModalStore";

  import InputField from "./components/inputField.svelte";

  let initialValues = {};

  if ($productToUpdate?.id) {
    initialValues = {
      ...$productToUpdate,
    };
  }

  const onSubmit = (values) => {
    if (initialValues) {
      updateProduct("products", initialValues.id, values).then((data) => {
        if (data?.status == "success") {
          responseCreateProduct.set(data?.message);
          isModalOpen.set(false);
        }
      });
    } else {
      addProduct("products", values).then((data) => {
        if (data?.status == "success") {
          responseCreateProduct.set(data?.message);
          isModalOpen.set(false);
        }
      });
    }
  };

  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    url_image: yup.string().required(),
  });

  const warnSchema = yup.object({
    password: yup
      .string()
      .test("is-secure", "password is not secure", (value) =>
        value ? value.length > 8 : true
      ),
  });

  const { form, data, errors, reset, setFields } = createForm({
    extend: [
      validator({ schema }),
      validator({ schema: warnSchema, level: "warning" }),
    ],
    initialValues,
    onSubmit,
  });
</script>

<form use:form>
  <div
    class="flex w-full transform text-left text-base transition md:my-3 md:max-w-2xl md:px-4 lg:max-w-4xl"
  >
    <div
      class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8"
    >
      <div
        class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
      >
        <div
          class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
        >
          {#if $urlImageProduct}
            <img src={$urlImageProduct} class="object-cover object-center" />
          {:else}
            <div
              class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5 h-full"
            ></div>
          {/if}
        </div>
        <div class="sm:col-span-8 lg:col-span-7">
          <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">Add Product</h2>

          <section aria-labelledby="information-heading" class="">
            <InputField
              label={"Product Name"}
              placeholder={"Product Name"}
              name={"name"}
              errors={errors.name}
            />
            <InputField
              label={"Description Name"}
              placeholder={"Description"}
              name={"description"}
              errors={errors.description}
            />
            <InputField
              label={"Url Image"}
              placeholder={"Url Image"}
              name={"url_image"}
              errors={errors.url_image}
              {urlImageProduct}
            />
            <InputField
              label={"Value"}
              placeholder={"value"}
              name={"value"}
              errors={errors.value}
            />
          </section>
        </div>
      </div>
    </div>
  </div>

  <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    <button
      type="submit"
      class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
      >Save</button
    >
  </div>
</form>
