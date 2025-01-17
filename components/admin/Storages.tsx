import React, {useEffect, useState} from "react";
import {getStoragesAPI, StorageFolder} from "@/components/admin/getStoragesAPI";

export function Storages(props: {
    title: string;
    setStorageId: (id: number) => void;
    storageId: number | null;
}) {

    const [storages, setStorages] = useState<StorageFolder[]>([]);

    useEffect(() => {
        (async () => {
            const {ok} = await getStoragesAPI();
            if(ok) {
                setStorages(ok);
            }
        })()
    }, []);

    return(
        <div className="position-relative d-flex flex-column align-items-start w-100">
            <label>{props.title}*</label>
            <select className="cursor-pointer w-100"
                    value={props.storageId ?? ""}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                            props.setStorageId(value);
                        }
                    }}
            >
                <option></option>
                {storages && storages.length > 0 && storages.map((storage) => {
                    return (
                        <option key={storage.id} value={storage.id}>{storage.storageName}</option>
                    );
                })}
            </select>

        </div>
    );
}