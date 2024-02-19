import { Crimson_Text, Karla, Rajdhani, Lora } from "next/font/google";


const rajdhani = Rajdhani({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"]
});

const karla = Karla({
  subsets: ["latin"]
});

const lora = Lora({
  weight: ["400", "500", '600', "700"],
  subsets: ["latin"]
});

const crimsonText = Crimson_Text({
  weight: ["400", '600', '700'],
  subsets: ["latin"]
});

export {crimsonText, rajdhani, karla, lora};