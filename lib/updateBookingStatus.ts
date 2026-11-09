
async function updateBookingStatus(id: string, status: string) {

  try {
    const response = await fetch("/api/request-booking", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

  } catch (error) {
    console.error("Could not update booking:", error);
    throw error;
  }
}

export {updateBookingStatus}