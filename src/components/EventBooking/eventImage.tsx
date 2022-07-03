interface Props {
  eventImage:string;
}

export const EventImage = ({eventImage}:Props) => (
  <div>
    <img
      alt="eventImage"
      className="w-full"
      src={eventImage}
    />
  </div>
);
