import Link from "next/link";
import {ReactSVG} from "react-svg";
import Image from "next/image";

type Category = {
    uuid: string;
    name: string;
    mainCategory: boolean;
    subcategories: Category[];
}

export const Category = ({category}: { category: Category }) => {


    return (
        <li key={category.uuid} className="d-flex">
            <span>{category.name}</span>
            <Link href={'/admin/categories/edit/' + category.uuid} className="edit">
                <Image src="/images/edit.svg" width="30" height="30" alt="" className="color-edit-svg"/>
            </Link>
        </li>
    );

};