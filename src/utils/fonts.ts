import { Karla, Rajdhani } from "next/font/google";


const rajdhani = Rajdhani({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"]
});

const karla = Karla({
  subsets: ["latin"]
});

export {rajdhani, karla};