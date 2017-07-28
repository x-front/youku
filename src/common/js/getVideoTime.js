export function getVideoAllTime(obj) {
  let hour = parseInt(obj.duration / 3600)
  let min = parseInt(obj.duration / 60)
  let sec = parseInt(obj.duration % 60)
  if (hour < 10) {
    hour = `0${hour}`
  }
  if (min < 10) {
    min = `0${min}`
  }
  if (sec < 10) {
    sec = `0${sec}`
  }
  return `${hour}:${min}:${sec}`
}

export function getVideoCurrentTime(obj) {
  let hour = parseInt(obj.currentTime / 3600)
  let min = parseInt(obj.currentTime / 60)
  let sec = parseInt(obj.currentTime % 60)
  if (hour < 10) {
    hour = `0${hour}`
  }
  if (min < 10) {
    min = `0${min}`
  }
  if (sec < 10) {
    sec = `0${sec}`
  }
  return `${hour}:${min}:${sec}`
}
