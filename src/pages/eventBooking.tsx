import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { EventImage, EventDetails } from "../components/EventBooking";

export const EventBooking = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams<{ id: string }>();
  const [eventDetails, setEventDetails] = useState<any>({
    data: {},
    loading: true,
  });

  const fetchEventDetails = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3001/getEventInfoWithId/${id}`
    );
    const data = await response.json();
    // if (Object.keys(data).length > 0) {
    //   return {};
    // }
    console.log(data);
    setEventDetails({
      data: {
        eventImage: data.Event_image,
        eventName: data.Event_name,
        eventVenue: data.Event_Venue,
        eventDate: data.Event_date,
        paidEvent: data.Paid_Event,
        ticketData: data.Ticket_Data,
        ticketCount: data.Ticket_Count,
        eventDescription: data.Event_info,
        eventTiming: `${data.Event_from} to ${data.Event_to}`,
      },
      loading: false,
    });
  }, [id]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const { data } = eventDetails;

  return (
    <div className="bg-gradient-to-r from-red-50 min-h-[100vh] w-full">
      <EventImage eventImage={data.eventImage} />
      <EventDetails eventDetails={data} />
    </div>
  );
};
