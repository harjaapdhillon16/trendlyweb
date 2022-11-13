import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useCallback, useEffect } from "react";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";

import { useRazorpay } from "../../utils/hooks/useRazorpay";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  ticketData?: any;
  ticketCount?: any;
  fetchEventDetails: () => Promise<void>;
}

const Ticket = ({ ticketData, incrementTicket, itemNo }: any) => (
  <div className="mb-4">
    <div className="flex bg-red-200 items-center rounded overflow-hidden border-red-300 border-2 justify-between">
      <div>
        <p className="px-2 text-lg mb-[-5px]">
          {ticketData.ticketName} : ₹{ticketData.ticketPrice}
        </p>
        <p className="text-sm px-2">
          Available Tickets : {ticketData.ticketQuantity}
        </p>
      </div>
      {ticketData.ticketQuantity === 0 ? (
        <p className="p-2 font-[600]">Sold Out !</p>
      ) : (
        <div className="flex items-center space-x-1 bg-white">
          <button
            onClick={() =>
              incrementTicket(ticketData.selectedTicket - 1, itemNo)
            }
            className="p-4 bg-red-300"
          >
            <AiOutlineMinus />
          </button>
          <p className="text-black px-2 text-xl w-10 text-center">
            {ticketData.selectedTicket}
          </p>
          <button
            onClick={() =>
              incrementTicket(ticketData.selectedTicket + 1, itemNo)
            }
            className="p-4 bg-red-300"
          >
            <AiOutlinePlus />
          </button>
        </div>
      )}
    </div>
    <p>{ticketData.ticketDescription}</p>
  </div>
);

export const BuyTicketModal = ({
  showModal,
  closeModal,
  ticketData,
  ticketCount,
  fetchEventDetails,
}: Props) => {
  const { id } = useParams<{ id: string }>();
  const [contactDetails, setContactDetails] = useState({
    phone: "",
    email: "",
    submitted: false,
    loading: false,
  });

  function validEmail(e: string) {
    var filter =
      // eslint-disable-next-line no-useless-escape
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) !== -1;
  }

  const submitContactDetails = useCallback(async () => {
  
    if (contactDetails.phone.length !== 10) {
      alert("Please provide a valid phone number");
      return;
    } else if (!validEmail(contactDetails.email)) {
      alert("Please provide a valid email");
      return;
    }
    setContactDetails((d) => ({ ...d, loading: true }));
    await fetchEventDetails();
    setContactDetails((d) => ({ ...d, loading: false, submitted: true }));
  }, [contactDetails, fetchEventDetails]);

  const { submitted: contactDetailsSubmitted } = contactDetails;

  const eventTickets = (ticketData ?? [])?.map((item: any) => ({
    ticketName: item.ticketName,
    ticketPrice: item.ticketPrice,
    ticketQuantity: ticketCount[item.ticketName],
    ticketDescription: item.ticketDescription,
    selectedTicket: 0,
  }));

  const [selectedTicket, setSelectedTicket] = useState<any>([]);

  useEffect(() => {
    if (selectedTicket.length === 0) setSelectedTicket(eventTickets);
  }, [eventTickets, selectedTicket]);

  const incrementTicket = (value: string, idx: any) => {
    if (
      selectedTicket[idx].ticketQuantity >= parseInt(value) &&
      parseInt(value) >= 0
    ) {
      let allTicket = [...selectedTicket];
      allTicket[idx] = { ...allTicket[idx], selectedTicket: parseInt(value) };
      setSelectedTicket(allTicket);
    }
  };

  const totalTicketPayments = selectedTicket.reduce((prev: any, item: any) => {
    return prev + item.ticketPrice * item.selectedTicket;
  }, 0);
  const serviceCharges =
    (totalTicketPayments * 15) / 100 < 10
      ? 10
      : (totalTicketPayments * 15) / 100;

  const { handlePayment } = useRazorpay({
    totalPayment: totalTicketPayments + serviceCharges,
    email: contactDetails.email,
    phone: contactDetails.phone,
    eventId: id,
    serviceCharges: `${serviceCharges}`,
    ticketData: selectedTicket,
    closeModal,
  });

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-lg bg-white min-h-[90vh] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Book Tickets
                    </Dialog.Title>
                    <button onClick={closeModal}>
                      <AiOutlineClose />
                    </button>
                  </div>
                  {!contactDetailsSubmitted && (
                    <div className="mt-2">
                      <div className="w-full">
                        <form>
                          <div className="mb-4">
                            <label
                              className="flex items-center text-gray-700 text-sm font-semibold mb-1 space-x-1"
                              htmlFor="phone"
                            >
                              <span>Phone</span>
                              <img
                                className="h-4 w-4"
                                alt="whatsapp"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
                              />
                            </label>
                            <input
                              value={contactDetails.phone}
                              onChange={(e) =>
                                setContactDetails((d) => ({
                                  ...d,
                                  phone: e.target.value,
                                }))
                              }
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="phone"
                              autoComplete="off"
                              type="number"
                              placeholder="Phone"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-semibold mb-1"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              value={contactDetails.email}
                              onChange={(e) =>
                                setContactDetails((d) => ({
                                  ...d,
                                  email: e.target.value,
                                }))
                              }
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              autoComplete="off"
                              type="text"
                              placeholder="Email"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-400 px-6 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-auto"
                              onClick={submitContactDetails}
                            >
                              {contactDetails.loading ? "Loading" : "Next"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  {contactDetailsSubmitted && (
                    <>
                      <div className="mt-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <button
                            onClick={() => {
                              setContactDetails((d) => ({
                                ...d,
                                submitted: false,
                              }));
                            }}
                            className="bg-blue-100 font-light text-gray-800 px-4 py-1 rounded-full mb-2"
                          >
                            <IoMdArrowBack />
                          </button>
                          <div>
                            <p>{contactDetails.phone}</p>
                            <p>{contactDetails.email}</p>
                          </div>
                        </div>
                        <div>
                          {selectedTicket.map((item: any, idx: any) => (
                            <Ticket
                              incrementTicket={incrementTicket}
                              ticketData={item}
                              itemNo={idx}
                              key={idx}
                            />
                          ))}
                        </div>
                      </div>
                      {totalTicketPayments !== 0 && (
                        <div className="text-right">
                          <p>
                            Total Ticket Payment :{" "}
                            <span className="font-bold">
                              {totalTicketPayments + serviceCharges}
                            </span>
                          </p>
                          <p className="text-sm">
                            Service Charges : {serviceCharges}
                          </p>
                          <button
                            onClick={handlePayment}
                            className="bg-red-400 px-6 py-2 text-sm rounded text-white mt-5"
                          >
                            Make Payment
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
