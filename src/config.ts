export const SITE = {
  website: "https://theinsanelysimplestuff.github.io/",
  author: "Malaika Noor",
  profile: "", // portfolio link
  desc: "Writings about AI, maths, programming, and my curiosity about the world.",
  title: "TheInsanelySimpleStuff",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    url: "",
    text: "",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Karachi", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
