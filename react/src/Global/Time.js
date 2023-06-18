import React from "react";

export const Time = (data) => {
  // فانشكن تحويل من الوقت والتاديخ الى الوقت العالمي

  const lastSeenAt = data; // ISO 8601 timestamp string
  const lastSeenAtDate = new Date(Date.parse(lastSeenAt));
  const lastSeenAtTimestamp = Math.floor(lastSeenAtDate / 1000); // Unix timestamp in seconds
  // Output: Unix timestamp representing the same time as lastSeenAt

  return lastSeenAtTimestamp;
};

export const TimeDay = (data) => {
  const dateTimeString = data;
  const dateTime = new Date(dateTimeString);
  const formattedDateTime = dateTime
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    })
    .replace(",", "");

  //console.log(formattedDateTime); // "2023/06/17 00:14:36"

  return formattedDateTime;
};
