import moment from "moment";

export const formatDate = (timestamp) => {
  return new Date(timestamp);
};

export const formatDateForText = (date) => {
  return moment(date).format("ll");
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
};
