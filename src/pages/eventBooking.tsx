import React from "react";
import { useParams } from "react-router-dom";

import { EventImage, EventDetails } from "../components/EventBooking";

export const EventBooking = () => {
  const { id } = useParams<{ id: string }>();

  const eventDetails = {
    eventName: "All Names",
    eventDate: "12th June 2020",
    eventTiming: "5:00pm to 8:00pm",
    eventLocation: "Chandigarh",
    eventDescription: (
      <>
        Five years ago Michael and I built the first version of React Router
        (!). When we released version 4 two years ago we said we wouldn't change
        anything about the API unless React itself fundamentally changed. Two
        years later and we haven't 😘. But now, with the introduction of hooks,
        React has fundamentally changed how we can compose state and behavior,
        and we want to take advantage of it. Taking these new tools (and things
        we've learned from starting fresh in @reach/router) we've created a
        smaller, smarter, and simpler routing utility. We think you'll love it.,
      </>
    ),
  };

  return (
    <div className="bg-gradient-to-r from-red-50 min-h-[100vh] w-full">
      <EventImage />
      <EventDetails eventDetails={eventDetails} />
    </div>
  );
};
