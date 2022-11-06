import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { url } from "../utils/api/apiUrl";
import Logo from "../assets/icon.png";
import { EventImage, EventDetails } from "../components/EventBooking";
import { LoadingJSX } from "../components/Common/PageLoading";

const EventBooking = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams<{ id: string }>();
  const [eventDetails, setEventDetails] = useState<any>({
    data: {},
    loading: true,
  });

  const fetchEventDetails = useCallback(async () => {
    const response = await fetch(`${url}/getEventInfoWithId/${id}`);
    const data = await response.json();
    // if (Object.keys(data).length > 0) {
    //   return {};
    // }
    setEventDetails({
      data: {
        eventExpired: new Date(data.Date).getTime() <= Date.now(),
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

  console.log(eventDetails.data);

  useEffect(() => {
    fetchEventDetails();
    const interval = setInterval(() => {
      fetchEventDetails();
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchEventDetails]);

  const { data, loading } = eventDetails;
  console.log(data);
  return (
    <div className="bg-gradient-to-r from-red-50 min-h-[100vh] w-full">
      <div className="bg-black flex items-center">
        <img src={Logo} className="w-20 h-20 p-3" alt="Logo" />
        <p className="text-white font-bold">App for events</p>
      </div>
      {loading ? (
        <LoadingJSX />
      ) : (
        <>
          {data?.eventName ? (
            <div className="md:flex w-full">
              <div className="md:w-[60vw]">
                <EventImage eventImage={data.eventImage} />
              </div>
              <div className="md:w-[40vw]">
                <EventDetails fetchEventDetails={fetchEventDetails} eventDetails={data} />
              </div>
            </div>
          ) : (
            <p className="m-2">This event doesn't exist</p>
          )}
        </>
      )}
    </div>
  );
};

export default EventBooking;
