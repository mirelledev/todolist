export const api = "http://localhost:5000/api";

export const requestConfig = (
  method: string,
  data: any,
  token: string | null
) => {
  let config: {
    method: string;
    headers: {
      "Content-Type"?: string;
      Authorization?: string;
    };
    body?: string;
  };

  // Verificar se o método é DELETE ou se não há dados
  if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    try {
      config = {
        method,
        body: JSON.stringify(data), // Converter data para JSON
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      console.error("Erro ao serializar dados para JSON:", error);
      throw new Error("Falha ao preparar a requisição");
    }
  }

  // Adicionar o token ao cabeçalho, se existir
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
