export function validateEmail(value: string): boolean {
 return !!value.toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function filterOffice(offices: Array<any>, countryName: string): Array<any> {
  console.log('Filter office with country name: ' + countryName);
  return offices.filter(office => {
    if (countryName !== 'all') {
      return office.country === countryName
    } else {
      return true
    }
  });
}