
import entities.AgendaEntity;
import entities.Consulta;
import entities.Especialidades;
import entities.MedicoEntity;
import entities.PacienteEntity;
import entities.Pagamento;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class App {

    public static void main(String[] args) throws Exception {
        // Inicializa especialidades
        Especialidades.inicializarEspecialidades();

        // manda aqui um formatar data para a do brasil
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        // Inicializa consultas com datas
        Consulta.inicializarConsultas(
                LocalDate.parse("25/12/2024", formatter),
                LocalDate.parse("26/12/2024", formatter),
                LocalDate.parse("27/12/2024", formatter)
        );

        MedicoEntity medico1 = new MedicoEntity("12345678900", "João Silva", "senha123", "joao.silva@email.com", "(11) 98765-4321", "Cardiologia", "CRM-12345", "Médico especializado em cardiologia");
        // esse comando medicoentity chama o construtor da classe medicoentity, que por sua vez chama o construtor da classe pessoaentity, passando os parametros cpf, nome, senha, email e telefone. O construtor da classe medicoentity também inicializa os atributos especialidade, numeroRegistro e descricao. 
        PacienteEntity paciente1 = new PacienteEntity("98765432100", "Maria Souza", "senha456", "maria.souza@email.com", "(11) 98765-4321", "Feminino");

        // Cria a agenda
        AgendaEntity agenda = new AgendaEntity();


        AgendaEntity atendimento1 = new AgendaEntity();

        atendimento1.setData(LocalDate.parse("25/12/2024", formatter));

        atendimento1.setHora_inicio(LocalDateTime.parse("25/12/2024 14:00:00", dateTimeFormatter));
        atendimento1.setHora_fim(LocalDateTime.parse("25/12/2024 15:00:00", dateTimeFormatter));
        atendimento1.setDisponivel(true);
        atendimento1.setMedico(medico1);
        atendimento1.setPaciente(paciente1);

        // Adiciona o atendimento à agenda
            

        agenda.adicionarAtendimento(atendimento1);

        System.out.println("Informações do Médico:");
        System.out.println("Nome: " + medico1.getNome());
        System.out.println("Especialidade: " + medico1.getEspecialidade());
        System.out.println("Número de Registro: " + medico1.getNumeroRegistro());
        System.out.println("Descrição: " + medico1.getDescricao());
        System.out.println("Status: " + medico1.mostrarStatus());
        System.out.println("\nInformações do Paciente:");
        System.out.println("Nome: " + paciente1.getNome());
        System.out.println("Sexo: " + paciente1.getSexo());
        System.out.println("Status: " + paciente1.mostrarStatus());
        System.out.println("\nInformações do Atendimento:");
        System.out.println("Data: " + atendimento1.getDataFormatada());
        System.out.println("Hora de Início: " + atendimento1.getHoraInicioFormatada());
        System.out.println("Hora de Fim: " + atendimento1.getHoraFimFormatada());
        System.out.println("Disponível: " + atendimento1.isDisponivel());
        System.out.println("Médico: " + atendimento1.getMedico().getNome());
        System.out.println("Paciente: " + atendimento1.getPaciente().getNome());

        Pagamento pagamento1 = new Pagamento(200.0, LocalDateTime.now(), true, "Cartão de Crédito", atendimento1);
        System.out.println("\nInformações do Pagamento:");
        System.out.println("Valor: " + pagamento1.getValor());
        System.out.println("Data do Pagamento: " + pagamento1.getDataPagamentoFormatada());
        System.out.println("Status: " + (pagamento1.isStatus() ? "Pago" : "Pendente"));
        System.out.println("Forma de Pagamento: " + pagamento1.getFormaPagamento());

        // Exibe informações da agenda
        System.out.println("\nInformações da Agenda:");
        System.out.println("Total de atendimentos: " + agenda.getAtendimentos().size());
        if (agenda.temAtendimentos()) {
            System.out.println("Atendimentos cadastrados:");
            for (int i = 0; i < agenda.getAtendimentos().size(); i++) {
                AgendaEntity atendimento = agenda.getAtendimentos().get(i);
                System.out.println("  [" + (i + 1) + "] " + atendimento.getMedico().getNome() + " - "
                        + atendimento.getPaciente().getNome() + " (" + atendimento.getDataFormatada() + ")");
            }
        }

        // Exibe lista de especialidades
        System.out.println("\n\n========== ESPECIALIDADES DISPONIVEIS ==========");
        System.out.println("Total de especialidades: " + Especialidades.totalEspecialidades());
        for (int i = 0; i < Especialidades.obterTodas().size(); i++) {
            Especialidades esp = Especialidades.obterTodas().get(i);
            System.out.println("  [" + esp.getId() + "] " + esp.getDescricao());
        }

        // Exibe lista de consultas
        System.out.println("\n\n========== CONSULTAS REGISTRADAS  ==========");
        System.out.println("Total de consultas: " + agenda.getAtendimentos().size());

        for (int i = 0; i < agenda.getAtendimentos().size(); i++) {
            AgendaEntity con = agenda.getAtendimentos().get(i);

            String statusPagamento = pagamento1.isStatus() ? "Pago" : "NULL";
            String formaPagamento = pagamento1.isStatus() ? pagamento1.getFormaPagamento() : "NULL";

            System.out.println("Código: " + (i + 1)
                    + " | Paciente: " + con.getPaciente().getNome()
                    + " | Médico: " + con.getMedico().getNome()
                    + " | Especialidade: " + con.getMedico().getEspecialidade()
                    + " | Data/Hora: " + con.getHora_inicio().format(dateTimeFormatter)
                    + " | Valor: R$ " + pagamento1.getValor()
                    + " | Status Pag.: " + statusPagamento
                    + " | Forma Pag.: " + formaPagamento);
        }
    }

       
/*
    Esta classe é a classe principal do programa, onde são criados objetos de diferentes entidades (MedicoEntity, PacienteEntity, AgendaEntity, Pagamento) e são exibidas informações sobre eles.
    O método main() é o ponto de entrada do programa, onde são inicializadas as especialidades, consultas e agendas, e são exibidos detalhes sobre médicos, pacientes, atendimentos e pagamentos.
    A classe utiliza formatação de data e hora para exibir as informações de forma legível, e demonstra a interação entre as diferentes entidades do sistema de saúde.  

*/
}
