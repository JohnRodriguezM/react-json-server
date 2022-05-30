export const handleError = res => {
  if(!res.ok){
    throw {
      err: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  }
}