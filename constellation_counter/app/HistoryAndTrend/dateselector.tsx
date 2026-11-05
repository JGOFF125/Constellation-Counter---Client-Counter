import { useState, useEffect } from "react";

export const SelectDate = () => {
    // 1. Initialize state for the date picker (defaulting to your initial date string)
    const [dateString, setDateString] = useState<string>("2026-04-19");
    const [count, setCount] = useState<{in: number, out: number}|null>(null);

    useEffect(() => {
        // Trigger loading state while fetching a new date's data

        const locid = 11;
        const hourday = 9;

        // The dateString variable from state is available here
        fetch(`https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-monthly-counts-per-hour/records?select=*&where=location_id%3D${locid}%20and%20sensing_date%3Ddate%27${dateString}%27%20and%20hourday=${hourday}&order_by=hourday&limit=20`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.results && data.results.length > 0) {
                    setCount({
                        in: data.results[0].direction_1,
                        out: data.results[0].direction_2,
                    });
                } else {
                    setCount({ in: 0, out: 0 }); // Handle days with no data
                }
            })
            .catch((err) => console.error("Fetch error:", err));
            
    }, [dateString]); // 2. Adding dateString here ensures useEffect refetches whenever the date changes

    return (
        <div>
            {/* 3. Bind the input value to state and update state when changed */}
            <input 
                type="date" 
                value={dateString} 
                onChange={(e) => setDateString(e.target.value)} 
            />
            {count ? (
                <div>
                    <div>in: {count.in}</div>
                    <div>out: {count.out}</div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};
