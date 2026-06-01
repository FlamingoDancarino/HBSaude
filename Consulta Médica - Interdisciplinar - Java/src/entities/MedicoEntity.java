package entities;

public class MedicoEntity extends PessoaEntity {

    private String especialidade;
    private String numeroRegistro;
    private String descricao;

    public MedicoEntity() {
        super();
        especialidade = new String();
        numeroRegistro = new String();
        descricao = new String();
    }

    public MedicoEntity(String cpf, String nome, String senha, String email, String telefone, String especialidade, String numeroRegistro, String descricao) {
        super(cpf, nome, senha, email, telefone);
        this.especialidade = especialidade;
        this.numeroRegistro = numeroRegistro;
        this.descricao = descricao;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getNumeroRegistro() {
        return numeroRegistro;
    }

    public void setNumeroRegistro(String numeroRegistro) {
        this.numeroRegistro = numeroRegistro;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

}

    
/*
    Esta classe representa um médico, herdando atributos e métodos da classe PessoaEntity e adicionando informações específicas de um profissional de saúde, como especialidade, número de registro e descrição.
    Ela possui métodos para acessar e modificar essas informações, permitindo a criação de objetos do tipo MedicoEntity com detalhes completos sobre o médico, facilitando a gestão de profissionais de saúde em um sistema de agendamento ou consulta médica.
    O construtor da classe permite inicializar um médico com todos os seus atributos, enquanto os métodos getters e setters permitem acessar e atualizar as informações do médico conforme necessário.
    A classe pode ser utilizada para criar e gerenciar médicos em um sistema de saúde, associando-os a consultas, agendas e pacientes, e exibindo suas informações de forma organizada.
*/