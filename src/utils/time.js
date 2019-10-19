// source https://github.com/robertistok/utsocial/blob/master/client/src/utils/timestamp.js
import moment from "moment";

// detailed is a boolean
export const formatTime = ({ timestamp, detailed }) => {
  const today = moment();
  const toCompare = moment(timestamp);

  // year
  if (today.year() === toCompare.year()) {
    // week
    if (today.week() === toCompare.week()) {
      if (today.day() === toCompare.day()) {
        return toCompare.format("HH:mm");
      }
      if (detailed) {
        return toCompare.format("ddd [at] HH:mm");
      }
      return toCompare.format("ddd");
    } else if (
      today.week() - 1 === toCompare.week() &&
      today.day() - toCompare.day() !== 0
    ) {
      if (detailed) {
        return toCompare.format("ddd [at] HH:mm");
      }

      return toCompare.format("ddd");
    }
    if (detailed) {
      return toCompare.format("DD MMMM [at] HH:mm");
    }

    return toCompare.format("DD MMMM");
  }
  if (detailed) {
    return toCompare.format("DD/MM/YY [at] HH:mm");
  }

  return toCompare.format("DD/MM/YY");
};
