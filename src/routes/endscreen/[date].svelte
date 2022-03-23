<script lang="ts">
  import { page } from "$app/stores";
  import DailyImage from "$lib/components/DailyImage.svelte";
  //get page.params.date
  $: mmdd = $page.params.date;
</script>

<div
  class="main-content"
  style="
		padding: 60px;
		vertical-align: middle;
		position: relative;
	"
>
    <div ng-if="block.properties.image">
      <img
        height-percentage="47"
        min-height="200"
        max-width="800"
        alt="TanenbaumCHAT"
        src="https://prosurvey.memotext.com/api/shared/files/k0FkqN6PWdpttreQq4De.png"
        style="width: 80vw;"
      />
    </div>

      <span
        style="
		text-align: center;
		user-select: none;
		font-family: Montserrat;
		color: rgb(18, 76, 143);
		font-size: 24px;
		line-height: 32px;
		font-weight: 400;
		position: relative;
		display: inline-block;
		margin-top: 24px;
	"
        ><h3>You are permitted to enter the school premises.</h3>
        <br />
        <DailyImage {mmdd} />
        <br />Please take a screenshot of this result page and show the picture
        to the staff member at the door prior to entry.<br />A confirmation
        email with the same image will also be sent to your email for reference.</span
      >
</div>
