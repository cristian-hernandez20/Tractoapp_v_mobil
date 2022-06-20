export const setCuenta = (state, cuenta) => {
  state.cuenta = [...state.cuenta, ...cuenta];
};
export const setGastos = (state, gasto) => {
  if (state.gasto.length == 0) {
    state.gasto = [...state.gasto, ...gasto];
  }
};
export const setViajes = (state, viaje) => {
  if (state.viaje.length == 0) {
    state.viaje = [...state.viaje, ...viaje];
  }
};
export const valida = (state, [opcion]) => {
  state.cuenta.forEach((u) => { 
    if (
      (u.init == opcion.user && u.password == opcion.password) ||
      (u.correo == opcion.user && u.password == opcion.password)
    ) {
      let base64 = btoa(JSON.stringify(u));
      // let base62 = atob(base64);
      // console.log(JSON.parse(base62));

      sessionStorage.auth_code = base64;
      localStorage.auth_code = sessionStorage.auth_code;

      state.acceso = true;

      localStorage.init = u.init;
      localStorage.nombre = u.nombres;
      localStorage.correo = u.correo;
      localStorage.acceso = state.acceso;

      state.cuentaActual.push(u);
      state.isLoading = false;
      if (u.admi == true) {
        localStorage.admi = true;
      }
      location.reload();
    }
  });
};

export const reinicioAcceso = (state) => {
  state.acceso = false;

  localStorage.acceso = false;
  localStorage.init = "";
  localStorage.nombre = "";
  localStorage.correo = "";
  state.isLoading = false;
  state.cuentaActual.pop();
  localStorage.admi = false;
  state.puestosCarros = [];
  state.parqueos = [];
};
export const cargar = (state) => {
  state.isLoading = !state.isLoading;
};
export const login = (state, usuario) => {
  state.usuario = usuario;
};

export const updateCuenta = (state, cuenta) => {
  const idx = state.cuenta.map((e) => e.id).indexOf(cuenta.id);
  state.cuenta[idx] = cuenta;
};
export const updatePacientes = (state, pacientes) => {
  const idx = state.pacientes.map((e) => e.id).indexOf(pacientes.id);
  state.pacientes[idx] = pacientes;
};

export const agregarGasto = (state, gasto) => {
  state.gasto = [gasto, ...state.gasto];
};

export const deletegasto = (state, id) => {
  state.pacientes = state.pacientes.filter((entry) => entry.id !== id);
};
