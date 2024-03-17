import {env} from "@/env.mjs"
import {SetAllTokens} from "@/app/(protected)/jwtSessionService/SetAllTokens";
import {SuccessValidate} from "@/components/validateEmail/SuccessValidate";
import {BadValidate} from "@/components/validateEmail/BadValidate";

type Props = {
    params: {
        uuid: string;
    }
}

export default async function ValidateEmail({params: {uuid}}: Props) {

    const response = await fetch(env.APP_URL + "/api/validate-email/" + uuid, {
        method: 'GET'
    });

    if (response.ok) {
        const {tokens} = await response.json();
        return (
            <>
                <SetAllTokens tokens={tokens}/>
                <SuccessValidate/>
            </>

        );
    }

    if (response.status === 400) {
        const {badResponse} = await response.json();

        return (
            <>
                <BadValidate message={badResponse}/>
            </>
        );
    }
}