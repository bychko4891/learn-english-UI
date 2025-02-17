import React, { useEffect, useState } from "react";
import {getCategoriesAPI} from "@/app/(protected)/admin/categories/getCategoriesAPI";
import {Category} from "@/app/DefaultResponsesInterfaces";
import {useClickOutside} from "@/app/utils/useClickOutside";


export function SearchCategory(props: {
  title: string;
  placeholder: string;
  categoryPage: string,
  categoryName: string,
  setCategoryName: (name: string) => void;
  setCategoryUUID: (uuid: string) => void; }) {

  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setShowSearchPanel(false);
  });

  useEffect(() => {
    if(props.categoryName && props.categoryName.length > 0) {
      (async () => {
        const { ok, err } = await getCategoriesAPI({
          searchQuery: props.categoryName,
          categoryPage: props.categoryPage,
        });
        if (err !== null) {
          return;
        }
        if(ok) setCategories(ok);
      })();
    } else {
      setCategories([]);
      props.setCategoryName("");
    }
  }, [props.categoryName]);


  return (
    <div className="position-relative d-flex flex-column w-100 align-items-start" ref={ref}>
      <label className="flex flex-col gap-3">{props.title}</label>
        {/*<span className="text-xl font-bold">Батьківська категорія</span>*/}
        <input className="w-100"
               placeholder={props.placeholder}
               onFocus={() => setShowSearchPanel(true)}
               value={props.categoryName}
               onChange={(e) => props.setCategoryName(e.target.value)}
        />

      <Categories
        showSearchPanel={showSearchPanel}
        categories={categories}
        selectCategory={(c) => {
          props.setCategoryUUID(c.uuid);
          props.setCategoryName(c.name);
          setShowSearchPanel(false);
        }}
      />
    </div>
  );
}

function Categories(props: {
  showSearchPanel: boolean;
  categories: Category[];
  selectCategory: (c: Category) => void;
}) {
  if (!props.showSearchPanel || props.categories.length === 0) {
    return null;
  }

  return (
      <div className="position-absolute d-flex flex-column z-1 bg-white w-100 top-100 overflow-scroll">
        {props.categories.map((c) => {
          return (
              <div
                  key={c.uuid}
                  className="cursor-pointer"
                  onClick={() => props.selectCategory(c)}
              >
                {c.name}
              </div>
          );
        })}
      </div>
  );
}
