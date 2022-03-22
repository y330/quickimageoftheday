<script>
  import { lazyLoad } from "$lib/actions/lazyLoad";
  export let mmdd;
  export let alt = "Daily Image for rapid screener";
  let url = `https://rapidscreen.memotext.com/surveyImage/daily-image6.png?${mmdd}`;
</script>

<img use:lazyLoad={url} {alt} />
