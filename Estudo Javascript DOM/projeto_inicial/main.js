"use strict"

import { carregaTarefa } from "./componentes/carregaTarefa.js";
import { handleNovoItem } from "./componentes/criaTarefa.js";

const novaTarefa = document.querySelector('[data-form-button]')

novaTarefa.addEventListener('click', handleNovoItem);

carregaTarefa();