interface Props {
  eventImage:string;
}

export const EventImage = ({eventImage}:Props) => (
  <div>
    <img
      alt="eventImage"
      className="w-full md:h-[98vh]"
      src={eventImage}
    />
  </div>
);
