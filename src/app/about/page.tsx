import Link from "next/link";
import {lora, karla, rajdhani, crimsonText} from "@/utils/fonts";
import { createPageMetadata } from "@/utils/metadataHelper";

export const metadata = createPageMetadata(
    "About - Sherif's blog",
    "A blog about startups, management, and engineering.",
    "https://sherifnada.com/about",
);

export default function Page(){
    return (
        <div className={`[&>p]:text-xl [&>p]:pb-6 ${crimsonText.className}`}>
            <p className="text-xl">
                Hi folks! In case the massive page header didn&apos;t give it away, I&apos;m Sherif Nada. 
            </p>
            <p>
                I write about engineering management, startups, software engineering, and anything else between those that I find interesting. 
            </p>
            <p>
                I&apos;m currently leading the engineering team at <Link href="https://sirdab.co">Sirdab</Link>, a tech-enabled warehousing &amp; supply chain 
                logistics company in MENA.
            </p>
            <p>
                Before that, I was founding engineer-turned-engineering-manager at <Link href="https://airbyte.com">Airbyte</Link> where 
                I built products and teams responsible for developer tooling, data integrations, and AI data workflows. 
            </p>
            <p>
                Prior to that, I was a tech lead at <Link href="https://liveramp.com">LiveRamp</Link> where I built and maintained petabyte-scale
                data platforms and pipelines. 
            </p>
            <p>
                I went to school at Middlebury College where I studied Mathematics and Computer Science and founded Photon, the world&apos;s simplest photo printing service. 
            </p>
            <p>
                The easiest way to get in touch with me is through <Link href="https://twitter.com/sheriffnothing">Twitter</Link>, but here are other ways to get in touch:
            </p>
            <ul className="text-xl">
                <li><Link href="mailto:snadalive@gmail.com">Email</Link></li>
                <li><Link href="https://linkedin.com/in/shrif">Linkedin</Link></li>
                <li><Link target="_blank" href="https://github.com/sherifnada">Github</Link></li>
            </ul>
        </div>
    )
}

