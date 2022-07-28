import { useEffect, useCallback, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import axios from "axios";

import { url } from "../utils/api/apiUrl";
import Logo from "../assets/icon.png";
import { LoadingJSX } from "../components/Common/PageLoading";

export const TicketQRPage = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<any>({
    data: {},
    loading: true,
    error: false,
  });

  const fetchTicketURL = useCallback(async () => {
    setState({ data: {}, loading: true, error: false });
    try {
      const { data } = await axios.post(`${url}/getUnregisteredTicket`, {
        ticketId: id,
      });
      if (data.error === "No Ticket Found") {
        return setState({
          data: {},
          loading: false,
          error: "No Ticket Found",
        });
      }
      setState({
        data: data,
        loading: false,
        error: false,
      });
    } catch {
      setState({
        data: {},
        loading: false,
        error: "An unknown error occurred",
      });
    }
  }, [id]);

  useEffect(() => {
    fetchTicketURL();
  }, [fetchTicketURL]);

  const {
    data: { event },
    loading,
    error,
  } = state;

  return (
    <div className="bg-gradient-to-r from-red-50 min-h-[100vh] w-full">
      <div className="bg-black flex items-center">
        <img src={Logo} className="w-20 h-20 p-3" alt="Logo" />
        <p className="text-white font-bold">App for events</p>
      </div>
      {loading && <LoadingJSX />}
      {error && <p className="p-4 text-xl">{error}</p>}
      {!loading && !error && (
        <>
          <div className="text-center pt-5">
            <p className="pb-3 text-xl font-medium">
              Your Event Ticket QR Code
            </p>
            <QRCode
              size={256}
              style={{
                width: 256,
                height: 256,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              value={""}
            />
            <p className="pt-2">{event.Event_name}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketQRPage;
