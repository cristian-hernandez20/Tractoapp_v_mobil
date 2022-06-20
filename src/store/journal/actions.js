import journalApi from "../../api/journalApi";
export const cargarUser = async ({ commit }) => {
  const { data } = await journalApi.get("/Cuentas.json");

  if (!data) {
    commit("setCuenta", []);
    return;
  }

  const cuenta = [];

  for (let id of Object.keys(data)) {
    cuenta.push({
      id,
      ...data[id],
    });
  }

  commit("setCuenta", cuenta);
};
export const loadGastos = async ({ commit }) => {
  try {
    commit("cargar", true);

    const { data } = await journalApi.get("/Gastos.json");
    if (!data) {
      commit("setGastos", []);
      return data;
    }
    const gasto = [];
    for (let id of Object.keys(data)) {
      gasto.push({
        id,
        ...data[id],
      });
    }
    commit("setGastos", gasto);
  } catch (error) {
    console.error(error);
  }

  commit("cargar", false);
};
export const loadViajes = async ({ commit }) => {
  try {
    commit("cargar", true);

    const { data } = await journalApi.get("/Viajes.json");
    console.log(data);
    if (!data) {
      commit("setGastos", []);
      return data;
    }
    const gasto = [];
    for (let id of Object.keys(data)) {
      gasto.push({
        id,
        ...data[id],
      });
    }
    commit("setViajes", gasto);
  } catch (error) {
    console.error(error);
  }

  commit("cargar", false);
};

export const updateCuenta = async ({ commit }, cuenta) => {
  const {
    admi,
    apellidos,
    confirmarcontraseña,
    correo,
    init,
    nombres,
    password,
  } = cuenta;
  console.log("cuenta", cuenta);
  const dataToSave = {
    admi,
    apellidos,
    confirmarcontraseña,
    correo,
    nombres,
    init,
    password,
  };

  const resp = await journalApi.put(`/Cuentas/${cuenta.id}.json`, dataToSave);

  commit("updateCuenta", { ...cuenta });
};
export const creategasto = async ({ commit }, gasto) => {
  const dataToSave = gasto;
  const { data } = await journalApi.post(`Gastos.json`, dataToSave);
  dataToSave.id = data.name;
  commit("addgasto", dataToSave);
  return data.name;
};
export const createviaje = async ({ commit }, viaje) => {
  const dataToSave = viaje;
  const { data } = await journalApi.post(`Viajes.json`, dataToSave);
  dataToSave.id = data.name;
  commit("addviaje", dataToSave);
  return data.name;
};
export const createcuenta = async ({ commit }, cuenta) => {
  const dataToSave = cuenta;
  const { data } = await journalApi.post(`Cuentas.json`, dataToSave);
  dataToSave.id = data.name;
  // commit("addcuenta", dataToSave);
  return data.name;
};
export const updategasto = async ({ commit }, gasto) => {
  const resp = await journalApi.put(`/Gastos/${gasto.id}.json`, gasto);
};
export const updateviaje = async ({ commit }, viaje) => {
  const resp = await journalApi.put(`/Viajes/${viaje.id}.json`, viaje);
};
export const deletegasto = async ({ commit }, id) => {
  await journalApi.delete(`/Gastos/${id}.json`);
  commit("deletegasto", id);

  return id;
};

export const createGats = async ({ commit }, gastos) => {
  const dato = gastos;

  const { data } = await journalApi.post(`Gastos.json`, dato);

  dato.id = data.name;

  commit("agregarGasto", dato);

  return data.name;
};
