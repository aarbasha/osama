import React from "react";

const Time = (data) => {
  // فانشكن تحويل من الوقت والتاديخ الى الوقت العالمي

  const lastSeenAt = data; // ISO 8601 timestamp string
  const lastSeenAtDate = new Date(Date.parse(lastSeenAt));
  const lastSeenAtTimestamp = Math.floor(lastSeenAtDate / 1000); // Unix timestamp in seconds
  // Output: Unix timestamp representing the same time as lastSeenAt

  return lastSeenAtTimestamp;
};

export default Time;
