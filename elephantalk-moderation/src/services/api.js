const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const GetReports = async ({ token, endpoint = "", query = "" }) => {
    const response = await fetch(`${BASE_URL}/toxicity-reports/${endpoint}?${query}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if(!response.ok){
        throw new Error("");
    }
    
    return await response.json();
};


