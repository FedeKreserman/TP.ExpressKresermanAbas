class ValidacionesHelper {


  getIntegerOrDefault = (value, defaultValue) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  };


  getStringOrDefault = (value, defaultValue) => {
    if (value === undefined || value === null) {
      return defaultValue;
    }
    return String(value);
  };


  getDateOrDefault = (value, defaultValue) => {
    if (value === undefined || value === null) {
      return defaultValue;
    }


    const fecha = new Date(value);


    // Verifico si es válida
    if (isNaN(fecha.getTime())) {
      return defaultValue;
    }


    return fecha;
  };


  getBooleanOrDefault = (value, defaultValue) => {
    if (value === true || value === false) {
      return value;
    }


    if (typeof value === "string") {
      const val = value.toLowerCase();


      if (val === "true") return true;
      if (val === "false") return false;
    }


    return defaultValue;
  };


  isEmail = (value) => {
    if (typeof value !== "string") return false;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };


}


// Export singleton
export default new ValidacionesHelper();

