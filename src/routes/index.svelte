<script lang="ts">
  import Go from "$lib/components/Go.svelte";
</script>

<h1>QUICK IMAGE OF THE DAY</h1>

<Go /><br />

<a href="/about">About</a><br />
<a href="/overview">Overview</a><br />

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }
  /* links */
  a {
    color: #ff3e00;
    text-decoration: none;
  }
  a:hover {
    color: #ff3e0066;
    text-decoration: underline;
  }
  /* media queries */
  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
