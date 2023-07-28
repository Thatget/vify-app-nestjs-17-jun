import {useEffect, useState} from "react";
import {useAuthenticatedFetch} from "../../web/frontend/hooks/useAuthenticatedFetch.js"

export default function productAPi() {
    const [data, setData] = useState()
    const fetch = useAuthenticatedFetch()
    useEffect(() => {
        fetch("/api/products")
            .then((data) => {
                setData(data)
                console.log("data from handleSelection", data)
            });
    })
    return data
}
