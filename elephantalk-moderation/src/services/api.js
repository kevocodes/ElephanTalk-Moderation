const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetReports = async ({ token, endpoint = "", query = "" }) => {
    const response = await fetch(`${API_URL}/toxicity-reports/${endpoint}?${query}`, {
        method: "",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if(response.ok){
        throw new Error("");
    }
    
    return await response.json();
};


