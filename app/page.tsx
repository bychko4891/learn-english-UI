import Image from "next/image";
import styles from "./page.module.css";
import {SideBar} from "@/components/constantLayout/sidebar/SideBar";

export default function Home() {
  const a:number = 5;
  return (
      <>
        {/*<h1>{a}</h1>*/}
        <h1>HOME</h1>
      </>
  );
}
