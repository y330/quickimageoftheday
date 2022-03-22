<script context="module">
  import "@splidejs/splide/dist/css/splide.min.css";
</script>

<script lang="ts">
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { sumOfInts } from "$lib/utils/math";
  // replaced dynamicaly
  const date = "__DATE__";
  const month_day = "__MONTH_DAY__";

  const dateObj = new Date();
  let dateDict = {
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
  };
  let monthDay = `${dateDict.month}/${dateDict.day}`;
  // console.log(today)
  let imageLinks: string[] = [];
  const linkPrefix =
    "https://rapidscreen.memotext.com/surveyImage/daily-image6.png?";

  // Make sure its a valid date string
  const checkDayOverflowInMonth = (mmdd) => {
    let month = mmdd.substring(0, 2);
    let monthDigit = Number.parseInt(month);
    let day = mmdd.substring(2, 4);
    let dayDigit = Number.parseInt(day);
    // create array of the month digits in the whole year
    let daysPerMonthDict = {
      "01": 31,
      "02": 28,
      "03": 31,
      "04": 30,
      "05": 31,
      "06": 30,
      "07": 31,
      "08": 31,
      "09": 30,
      "10": 31,
      "11": 30,
      "12": 31,
    };
    for (const month in daysPerMonthDict) {
      if (Object.prototype.hasOwnProperty.call(daysPerMonthDict, month)) {
        const daysInMonth = daysPerMonthDict[month];
        if (dayDigit > daysInMonth) {
          monthDigit += 1;
          day = "01";
        } else if (dayDigit < 1) {
          monthDigit -= 1;
          day = daysInMonth[`${monthDigit}`.padStart(4, "0")];
        }
        mmdd = `${monthDigit}${day}`;
      }
    }
    return mmdd;
  };
  // Get the month-day digits of yesturday, today, and tommorow (make sure to change the hundreds digit to the next month if days in month is maxed out)
  const fillImageArray = (mmddUnformatted: string) => {
    for (let i = -1; i < 2; i++) {
      // Get the month-day digits of yesturday, today, and tommorow
      let mmddArr = mmddUnformatted.split("/");
      let day = mmddArr[1];
      let dayDigit = Number.parseInt(day);
      let month = mmddArr[0];
      let mmddNew = `${month}${sumOfInts(i, dayDigit)}`;
      // Make sure its a valid date string and correct it if its not
      mmddNew = checkDayOverflowInMonth(mmddNew);
      imageLinks.push(linkPrefix + mmddNew);
    }
  };

  //   create something to pass into the mmdd paramter of getYesterdayTodayTomorrowArray
  fillImageArray(monthDay);
</script>

<div><strong>/more</strong> route, built at: {date}</div>

<!-- <ImageCarousel links="{imageLinks}" /> -->
<Splide>
  {#each imageLinks as src}
    {@debug src}
    <SplideSlide>
      <img {src} alt="" />
    </SplideSlide>
  {/each}
</Splide>

<p>
  It is {date}
</p>
<br />
<a href="/">Go Home</a>
