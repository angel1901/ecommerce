<script>
  import { createForm } from "felte";
  import { post } from "../../../api/auth";
  import { authenticated, errorFetch } from "../../../stores/ModalStore";

  const onSubmit = (values) => {
    post("auth/signin", values)
      .then(({ data }) => {
        if (data.status == "success") {
          localStorage.setItem("isAutenticated", "1");
          authenticated.set(localStorage.getItem("isAutenticated") == "1");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          error = "Bad Request: Invalid credentials";
        } else {
          error = "An error occurred:";
        }
        errorFetch.set(error);
      });
  };

  const { form, data, errors, reset, setFields } = createForm({
    extend: [],
    onSubmit,
  });
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Sign in to your account
    </h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" use:form>
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {$errorFetch}
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Sign in</button
        >
      </div>
    </form>
  </div>
</div>
