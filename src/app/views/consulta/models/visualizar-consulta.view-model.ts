import { ListarMedicoVM } from "../../medico/models/listar-medico.view-model";
import { ListarPacienteVM } from "../../paciente/models/listar-paciente.view-model";

export type VisualizarConsultaVM = {
  id: string;
  titulo: string;
  pacienteAtributo: ListarPacienteVM;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  medico: ListarMedicoVM;
  
}