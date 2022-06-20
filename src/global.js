import IMask from "imask";

// export let ip_servicio = 'http://34.234.185.158//'

export function format_num(val = 0, scale = 0) {
  let mask = IMask.createMask({
    mask: Number,
    scale,
    min: -9999999999999,
    thousandsSeparator: ",",
    radix: ".",
  });

  let val_num = typeof val == "string" ? val.trim() : val;
  let num = parseFloat(val_num || 0).toString();
  mask.resolve(num);
  return `${mask.value}`;
}

export function format_fecha(fecha = "") {
  return fecha && parseInt(fecha) != 0
    ? `${fecha.substring(0, 4)}/${fecha.substring(4, 6)}/${fecha.substring(
        6,
        8
      )}`
    : "";
}

export const format_op = (value) => {
  return parseFloat(value) || 0;
};

export function image_base64(url) {
  return new Promise((res) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        res(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}

const auth = sessionStorage.auth_code;
export let currentUser = auth ? JSON.parse(atob(auth)) : null;
