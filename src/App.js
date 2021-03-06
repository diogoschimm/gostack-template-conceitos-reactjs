import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "https://github.com/diogoschimm/gostack-template-conceitos-nodejs",
      techs: ["Javascript", "NodeJS"]
    });
    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const retorno = await api.delete(`repositories/${id}`);

    if (retorno.status === 204) { 
      const repos = repositories.filter(repo => repo.id !== id);
      setRepositories(repos);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
