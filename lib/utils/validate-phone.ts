function validatePhone(phone: any) {
  if (typeof phone === "string" && phone.length > 5) {
    return phone;
  }
  return null;
}

export default validatePhone;
