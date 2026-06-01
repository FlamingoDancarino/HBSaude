package entities;

public class PacienteEntity extends PessoaEntity {

    private String sexo;

    public PacienteEntity() {
        super();
        sexo = new String();
    }

    public PacienteEntity(String cpf, String nome, String senha, String email, String telefone, String sexo) {
        super(cpf, nome, senha, email, telefone);
        this.sexo = sexo;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    @Override
    public String mostrarStatus() // Sobrescreve o método mostrarStatus da classe PessoaEntity
    {
        return "Paciente: " + getNome()
                + " - Sexo: " + sexo
                + " - Status: ";
    }

}

/*
    Esta classe representa um paciente, herdando atributos e métodos da classe PessoaEntity e adicionando um atributo específico para o sexo do paciente.
    Ela possui métodos para acessar e modificar o sexo do paciente, permitindo a criação de objetos do tipo PacienteEntity com detalhes completos sobre o paciente, facilitando a gestão de pacientes em um sistema de agendamento ou consulta médica.
    O construtor da classe permite inicializar um paciente com todos os seus atributos, enquanto os métodos getters e setters permitem acessar e atualizar as informações do paciente conforme necessário.
    A classe pode ser utilizada para criar e gerenciar pacientes em um sistema de saúde, associando-os a consultas, agendas e médicos, e exibindo suas informações de forma organizada.
*/
