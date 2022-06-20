export const getCuentas = (state) => {
  return state.cuenta;
};
export const getAcceso = (state) => {
  return state.acceso;
};
export const getGastos = (state) => {
  return state.gasto;
};
export const getViajes = (state) => {
  return state.viaje;
};

export const getEntryById =
  (state) =>
  (id = "") => {
    const entry = state.cuenta.find((entry) => entry.id === id);

    if (!entry) return;

    return { ...entry };
  };

export const getUsuario =
  (state) =>
  (id = "") => {
    const usuario = state.usuario.find((usuario) => usuario.id === id);

    if (!usuario) return;

    return { ...usuario };
  };
