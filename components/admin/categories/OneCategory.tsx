import Link from "next/link";
import Image from "next/image";
import {Category} from "@/app/DefaultResponsesInterfaces"


export const OneCategory = ({category}: { category: Category }) => {


    return (
        <>
            <span>{category.name}</span>
            <Link href={'/admin/categories/category/' + category.uuid} className="edit">
                <Image unoptimized src="/images/edit.svg" width="30" height="30" alt="" className="color-edit-svg"/>
            </Link>
        </>
    );

};