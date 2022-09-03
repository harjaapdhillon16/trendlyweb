import { useState } from "react";
import { BuyTicketModal } from "./buyTicketModal";

interface Props {
  eventDetails: {
    eventName: string;
    eventDate: string;
    eventTiming: string;
    eventLocation: string;
    eventDescription: any;
    paidEvent: boolean;
    ticketData: any;
    ticketCount: any;
    eventExpired: boolean;
  };
}

export const EventDetails = ({
  eventDetails: {
    eventName,
    eventDate,
    eventTiming,
    eventLocation,
    eventDescription,
    paidEvent,
    ticketData,
    ticketCount,
    eventExpired,
  },
}: Props) => {
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const openModal = () => setBookingModalOpen(true);
  return (
    <div className="p-2 font-['Poppins']">
      <h1 className="text-2xl mb-1">{eventName}</h1>
      <div className="mb-2">
        <p className="text-base">{eventDate}</p>
        <p className="text-base">{eventTiming}</p>
        <p className="text-base">{eventLocation}</p>
      </div>
      {paidEvent && eventExpired && (
        <button
          onClick={openModal}
          className="w-full bg-[#ff4545] text-white h-[50px] rounded-sm text-lg"
        >
          Buy Tickets
        </button>
      )}
      {eventExpired && <p className="text-gray-400">This is an expired event</p>}
      <p className="mb-4 mt-2 text-base">{eventDescription}</p>
      <BuyTicketModal
        ticketData={ticketData}
        ticketCount={ticketCount}
        showModal={isBookingModalOpen}
        closeModal={() => setBookingModalOpen(false)}
      />
    </div>
  );
};
