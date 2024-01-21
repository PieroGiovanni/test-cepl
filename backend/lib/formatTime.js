export const formatTime = (timeStamp) => {
  let date = new Date(timeStamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
