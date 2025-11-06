import axios from 'axios';

// --- CONFIGURACIÓN ---
// NOTA: Mueve tu API_KEY a un archivo .env.local para más seguridad
// Crea un archivo .env.local en la raíz y agrega: VITE_IBM_API_KEY="<your API key>"
const API_KEY = import.meta.env.VITE_IBM_API_KEY as string;

// URLs ahora apuntan al proxy local
const SCORING_URL = "/api-scoring/ml/v4/deployments/a460c30f-d67c-46d8-97ac-cf1dc15085e7/predictions?version=2021-05-01";
const IAM_URL = "/api-iam/identity/token"; // <-- Cambio principal aquí

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

/**
 * Obtiene un token de autenticación de IBM IAM.
 * Maneja el almacenamiento en caché del token.
 */
async function getToken(): Promise<string> {
  if (!API_KEY || API_KEY === "<your API key>") {
    throw new Error("Credenciales de API de IBM Cloud no definidas. Configura VITE_IBM_API_KEY en tu archivo .env.local.");
  }
  
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }

  // La URL aquí es local (/api-iam/...)
  const response = await axios.post(
    IAM_URL,
    `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${API_KEY}`,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    }
  );

  const { access_token, expires_in } = response.data;
  cachedToken = {
    accessToken: access_token,
    expiresAt: Date.now() + (expires_in - 60) * 1000, // Caduca 1 minuto antes
  };
  return access_token;
}

/**
 * Llama al modelo de scoring de IBM Cloud con los datos de entrada proporcionados.
 * * @param fields Los campos de entrada para el modelo.
 * @param values Los valores para puntuar.
 * @returns Los resultados de la predicción de la API.
 */
export async function getScoringPrediction(fields: string[], values: any[][]): Promise<any> {
  const token = await getToken();
  
  const payload = {
    input_data: [{
      fields: fields,
      values: values,
    }],
  };

  try {
    // La URL aquí también es local (/api-scoring/...)
    const response = await axios.post(SCORING_URL, payload, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    // Devuelve la respuesta de predicción completa
    return response.data;

  } catch (error) {
    console.error("Error al llamar a la API de scoring de IBM:", error.response ? error.response.data : error.message);
    throw new Error("No se pudo obtener la predicción del modelo de IBM.");
  }
}

/**
 * Ejemplo de cómo puedes llamar a la función de scoring.
 * Puedes modificar esto o crear nuevas funciones que usen getScoringPrediction.
 */
export async function getExamplePrediction() {
  // TODO: Reemplaza esto con tus campos y valores reales
  const fields = ["stock_actual", "demanda_proyectada_30d"];
  const values = [
    [16085, 5000],
    [9560, 4000]
  ];
  
  const predictionResult = await getScoringPrediction(fields, values);
  
  // Imprime y devuelve las predicciones
  console.log("Resultado de la predicción:", predictionResult.predictions);
  return predictionResult.predictions;
}