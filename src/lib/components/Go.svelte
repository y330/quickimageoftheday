<script>
  import { goto } from "$app/navigation";
//   import Counter from "./Counter.svelte";

  // replaced dyanmicaly
  const date = "__DATE__";
  const monthDay = "__MONTH_DAY__";
  let newdate = "";
  let input;

  function go() {
    if (monthDay) {
      goto(`/endscreen/${monthDay}`);
    } else {
      input?.focus();
    }
  }
</script>

<div class="main">
  <input />

  <form on:submit|preventDefault={go}>
    <fieldset>
      <input
        type="text"
        name="hello"
        class="write"
        bind:this={input}
        bind:value={newdate}
        aria-label="What date (leave empty for todays date)?"
        placeholder=""
      />
      <label for="hello">What date (leave empty for todays date)?</label>
      <div class="after" />
    </fieldset>


    <button type="submit"> GO </button>
  </form>
</div>

<style>
  .main {
    font-size: 20px;
    font-family: system-ui, Helvetica, Arial, sans-serif;
  }

  form {
    width: 30vw;
    margin: 20px auto;
  }

  fieldset {
    position: relative;
    border: none;
  }

  label {
    position: absolute;
    top: 18px;
	width: fit-content;
	text-align: right;
    color: rgba(0, 0, 0, 0.3);
    transform-origin: left;
    transition: all 0.3s ease;
  }

  input:focus ~ label {
    color: red;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -10px;
    transform: scale(0.6, 0.6);
  }

  input {
    font-size: 20px;
    width: 100%;
    border: none;
    margin-top: 10px;
  }

  input:focus {
    outline: none;
  }

  .after {
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, red 50%, transparent 50%);
    background-color: rgba(0, 0, 0, 0.3);
    background-size: 200% 100%;
    background-position: 100% 0;
    transition: all 0.6s ease;
  }

  input:focus ~ .after {
    background-position: 0 0;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    padding-top: 1rem;
  }
  button:focus {
    border: 2px solid #ff3e00;
  }
  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>
