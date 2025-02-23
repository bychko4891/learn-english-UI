import Image from "next/image";
import OopsImage from "public/images/oops.webp"
import "./ops.css"
import {ShowErrorMessage} from "@/components/ShowErrorMessage";

export const NoContent = (props: {error?: string; }) => {
    return (
        <div className="d-flex flex-column align-items-center gap-4">
            <h1>Нажаль тут ще нічого нема</h1>
            <Image unoptimized src={OopsImage} alt="Oops, this page don't have content!" className="ops__img"/>
            <p>В цьому розділі ще нема нічого, але скоро ми сюди щось та добавимо 🙂</p>
            <p>Завітайте будь ласка трохи пізніше.</p>
            {props.error && <ShowErrorMessage error={props.error} />}
        </div>
    );
};