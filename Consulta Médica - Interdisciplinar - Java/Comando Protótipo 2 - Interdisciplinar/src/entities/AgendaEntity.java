package entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;

public class AgendaEntity implements Iterable<AgendaEntity> {

    private static final DateTimeFormatter DATA_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter HORA_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    private LocalDate data;
    private LocalDateTime hora_inicio;
    private LocalDateTime hora_fim;
    private boolean disponivel;
    private MedicoEntity medico;
    private PacienteEntity paciente;
    private final ArrayList<AgendaEntity> atendimentos;

    private static int contadorId = 1; // Começa no 1 e pertence à classe
     int id; // Atributo de instância para armazenar o ID único

    public AgendaEntity() {
        data = LocalDate.now();
        hora_inicio = LocalDateTime.now();
        hora_fim = LocalDateTime.now().plusHours(1);
        disponivel = true;
        medico = new MedicoEntity();
        paciente = new PacienteEntity();
        atendimentos = new ArrayList<>();
        this.id = contadorId++; // Atribui o ID atual e incrementa o contador para o próximo
    }

    public AgendaEntity(LocalDate data, LocalDateTime hora_inicio, LocalDateTime hora_fim, boolean disponivel, MedicoEntity medico, PacienteEntity paciente) {
        this.data = data;
        this.hora_inicio = hora_inicio;
        this.hora_fim = hora_fim;
        this.disponivel = disponivel;
        this.medico = medico;
        this.paciente = paciente;
        this.atendimentos = new ArrayList<>();
        this.id = contadorId++; // Atribui ID único também neste construtor
    }

    public AgendaEntity buscaBinariaPorId(int idProcurado) {
    int inicio = 0;
    int fim = this.atendimentos.size() - 1;

    while (inicio <= fim) {
        int meio = (inicio + fim) / 2;
        AgendaEntity consultaMeio = this.atendimentos.get(meio);

        // Supondo que sua AgendaEntity tenha um método getId()
        if (consultaMeio.getId() == idProcurado) {
            return consultaMeio; // Achou
        }
        
        if (consultaMeio.getId() < idProcurado) {
            inicio = meio + 1; // Procura na metade direita
        } else {
            fim = meio - 1; // Procura na metade esquerda
        }
    }
    return null; // Não encontrou
}

    public LocalDate getData() {
        return data;
    }

    public String getDataFormatada() {
        return data.format(DATA_FORMATTER);
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalDateTime getHora_inicio() {
        return hora_inicio;
    }

    public void setHora_inicio(LocalDateTime hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public String getHoraInicioFormatada() {
        return hora_inicio.format(HORA_FORMATTER);
    }

    public LocalDateTime getHora_fim() {

        return hora_fim;

    }

    public String getHoraFimFormatada() {
        return hora_fim.format(HORA_FORMATTER);
    }

    public void setHora_fim(LocalDateTime hora_fim) {
        this.hora_fim = hora_fim;

    }

    public boolean isDisponivel() {
        return disponivel;

    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;

    }

    public MedicoEntity getMedico() {
        return medico;

    }

    public void setMedico(MedicoEntity medico) {
        this.medico = medico;
    }

    public PacienteEntity getPaciente() {
        return paciente;
    }

    public void setPaciente(PacienteEntity paciente) {
        this.paciente = paciente;
    }

    public void adicionarAtendimento(AgendaEntity atendimento) {
        this.atendimentos.add(atendimento);
    }

    public ArrayList<AgendaEntity> getAtendimentos() {
        return atendimentos;
    }

    @Override
    public Iterator<AgendaEntity> iterator() {
        return atendimentos.iterator();
    }

    public boolean temAtendimentos() {
        return !atendimentos.isEmpty();
    }

    public int getId() {
        return this.id;
    }

}


/*
    Esta classe representa uma agenda de atendimentos médicos, contendo informações sobre a data, horário, disponibilidade, médico e paciente associados.
    Ela possui métodos para formatar a data e horário, adicionar atendimentos à agenda, buscar atendimentos por ID usando busca binária, e iterar sobre os atendimentos cadastrados.
    O atributo "id" é um identificador único para cada atendimento, gerado automaticamente ao criar uma nova instância da classe. A busca binária é eficiente para encontrar um atendimento específico quando a lista de atendimentos está ordenada por ID.
    A classe também implementa a interface Iterable, permitindo que seja usada em loops for-each para iterar sobre os atendimentos registrados na agenda.
    Os métodos getMedico() e getPaciente() permitem acessar as informações do médico e paciente associados a cada atendimento, facilitando a exibição de detalhes como nome, especialidade e plano de saúde.

*/


