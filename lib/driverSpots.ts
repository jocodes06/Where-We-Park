export async function getAllparkingSpots() {
    try {
        const response = await fetch("/api/drivers-spots", {
            method: "GET",
        });

        if (response.status === 401) {
            return { parkingSpots: [] };
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to fetch parking spots");
        }

        return {
            parkingSpots: Array.isArray(data.parkingSpots) ? data.parkingSpots: [],
        };
    } catch (error) {
        console.error("Error fetching parking spots:", error);
        throw error;
    }
}
