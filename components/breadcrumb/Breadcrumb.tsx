import Link from "next/link";
import Image from "next/image";

type BreadcrumbNavigation = {
    href: string,
    name: string
}
type Props = {
    breadcrumb: BreadcrumbNavigation;
}
export const Breadcrumb = ({breadcrumb}: Props) => {
    return (
        <nav aria-label="breadcrumb" className="bread-crumbs__bottom">
            <ol className="breadcrumb d-flex gap-2 p-0 m-0">
                <li className="breadcrumb-item">
                    <Link href="/">
                        <Image unoptimized className="colored-svg reset-styles ms-auto" src="/images/home.svg" alt="Головна"
                             width="20" height="20"/>
                    </Link>
                </li>
                <li>
                    <span>/</span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <Link href={breadcrumb.href}>
                        {breadcrumb.name}
                    </Link>
                </li>
            </ol>
        </nav>
    );
};