const formatTime = (timeString) => {
   console.log("timeString", timeString);
   let splitTimeString = timeString.split(":");
   return `${splitTimeString[0]}:${splitTimeString[1]}`;
};

export default formatTime;
